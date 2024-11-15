<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241115102255 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE projects (id SERIAL NOT NULL, projects_images_id INT DEFAULT NULL, projects_links_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, description TEXT NOT NULL, start_date TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, end_date TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, category VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, is_public BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5C93B3A4DF3C2DA ON projects (projects_images_id)');
        $this->addSql('CREATE INDEX IDX_5C93B3A4AA43BB64 ON projects (projects_links_id)');
        $this->addSql('CREATE TABLE projects_tools (projects_id INT NOT NULL, tools_id INT NOT NULL, PRIMARY KEY(projects_id, tools_id))');
        $this->addSql('CREATE INDEX IDX_7F7B8A491EDE0F55 ON projects_tools (projects_id)');
        $this->addSql('CREATE INDEX IDX_7F7B8A49752C489C ON projects_tools (tools_id)');
        $this->addSql('CREATE TABLE projects_images (id SERIAL NOT NULL, img_src TEXT NOT NULL, img_alt VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE projects_links (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, url TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE projects ADD CONSTRAINT FK_5C93B3A4DF3C2DA FOREIGN KEY (projects_images_id) REFERENCES projects_images (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE projects ADD CONSTRAINT FK_5C93B3A4AA43BB64 FOREIGN KEY (projects_links_id) REFERENCES projects_links (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE projects_tools ADD CONSTRAINT FK_7F7B8A491EDE0F55 FOREIGN KEY (projects_id) REFERENCES projects (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE projects_tools ADD CONSTRAINT FK_7F7B8A49752C489C FOREIGN KEY (tools_id) REFERENCES tools (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE portfolios ADD projects_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE portfolios ADD CONSTRAINT FK_B81B226F1EDE0F55 FOREIGN KEY (projects_id) REFERENCES projects (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_B81B226F1EDE0F55 ON portfolios (projects_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE portfolios DROP CONSTRAINT FK_B81B226F1EDE0F55');
        $this->addSql('ALTER TABLE projects DROP CONSTRAINT FK_5C93B3A4DF3C2DA');
        $this->addSql('ALTER TABLE projects DROP CONSTRAINT FK_5C93B3A4AA43BB64');
        $this->addSql('ALTER TABLE projects_tools DROP CONSTRAINT FK_7F7B8A491EDE0F55');
        $this->addSql('ALTER TABLE projects_tools DROP CONSTRAINT FK_7F7B8A49752C489C');
        $this->addSql('DROP TABLE projects');
        $this->addSql('DROP TABLE projects_tools');
        $this->addSql('DROP TABLE projects_images');
        $this->addSql('DROP TABLE projects_links');
        $this->addSql('DROP INDEX IDX_B81B226F1EDE0F55');
        $this->addSql('ALTER TABLE portfolios DROP projects_id');
    }
}
