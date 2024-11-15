<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241115123226 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE projects (id UUID NOT NULL, portfolio_id UUID NOT NULL, title VARCHAR(255) NOT NULL, description TEXT NOT NULL, start_date TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, end_date TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, category VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5C93B3A4B96B5643 ON projects (portfolio_id)');
        $this->addSql('COMMENT ON COLUMN projects.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN projects.portfolio_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE projects_images (id UUID NOT NULL, project_id UUID NOT NULL, img_src TEXT NOT NULL, img_alt VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_21EB2295166D1F9C ON projects_images (project_id)');
        $this->addSql('COMMENT ON COLUMN projects_images.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN projects_images.project_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE projects_links (id UUID NOT NULL, project_id UUID NOT NULL, name VARCHAR(255) NOT NULL, url TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_4403F526166D1F9C ON projects_links (project_id)');
        $this->addSql('COMMENT ON COLUMN projects_links.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN projects_links.project_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE projects ADD CONSTRAINT FK_5C93B3A4B96B5643 FOREIGN KEY (portfolio_id) REFERENCES portfolios (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE projects_images ADD CONSTRAINT FK_21EB2295166D1F9C FOREIGN KEY (project_id) REFERENCES projects (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE projects_links ADD CONSTRAINT FK_4403F526166D1F9C FOREIGN KEY (project_id) REFERENCES projects (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE projects DROP CONSTRAINT FK_5C93B3A4B96B5643');
        $this->addSql('ALTER TABLE projects_images DROP CONSTRAINT FK_21EB2295166D1F9C');
        $this->addSql('ALTER TABLE projects_links DROP CONSTRAINT FK_4403F526166D1F9C');
        $this->addSql('DROP TABLE projects');
        $this->addSql('DROP TABLE projects_images');
        $this->addSql('DROP TABLE projects_links');
    }
}
