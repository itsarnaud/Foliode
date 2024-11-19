<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241118112403 extends AbstractMigration
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
        $this->addSql('CREATE TABLE tools (id UUID NOT NULL, name VARCHAR(255) NOT NULL, picto TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN tools.id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE tools_projects (tools_id UUID NOT NULL, projects_id UUID NOT NULL, PRIMARY KEY(tools_id, projects_id))');
        $this->addSql('CREATE INDEX IDX_82D76185752C489C ON tools_projects (tools_id)');
        $this->addSql('CREATE INDEX IDX_82D761851EDE0F55 ON tools_projects (projects_id)');
        $this->addSql('COMMENT ON COLUMN tools_projects.tools_id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN tools_projects.projects_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE tools_portfolios (tools_id UUID NOT NULL, portfolios_id UUID NOT NULL, PRIMARY KEY(tools_id, portfolios_id))');
        $this->addSql('CREATE INDEX IDX_5C595A30752C489C ON tools_portfolios (tools_id)');
        $this->addSql('CREATE INDEX IDX_5C595A3081DC659 ON tools_portfolios (portfolios_id)');
        $this->addSql('COMMENT ON COLUMN tools_portfolios.tools_id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN tools_portfolios.portfolios_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE projects ADD CONSTRAINT FK_5C93B3A4B96B5643 FOREIGN KEY (portfolio_id) REFERENCES portfolios (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE projects_images ADD CONSTRAINT FK_21EB2295166D1F9C FOREIGN KEY (project_id) REFERENCES projects (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE projects_links ADD CONSTRAINT FK_4403F526166D1F9C FOREIGN KEY (project_id) REFERENCES projects (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE tools_projects ADD CONSTRAINT FK_82D76185752C489C FOREIGN KEY (tools_id) REFERENCES tools (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE tools_projects ADD CONSTRAINT FK_82D761851EDE0F55 FOREIGN KEY (projects_id) REFERENCES projects (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE tools_portfolios ADD CONSTRAINT FK_5C595A30752C489C FOREIGN KEY (tools_id) REFERENCES tools (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE tools_portfolios ADD CONSTRAINT FK_5C595A3081DC659 FOREIGN KEY (portfolios_id) REFERENCES portfolios (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE users ADD dribbble_login VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE users ADD dribbble_id VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE users DROP dribble_login');
        $this->addSql('ALTER TABLE users DROP dribble_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE projects DROP CONSTRAINT FK_5C93B3A4B96B5643');
        $this->addSql('ALTER TABLE projects_images DROP CONSTRAINT FK_21EB2295166D1F9C');
        $this->addSql('ALTER TABLE projects_links DROP CONSTRAINT FK_4403F526166D1F9C');
        $this->addSql('ALTER TABLE tools_projects DROP CONSTRAINT FK_82D76185752C489C');
        $this->addSql('ALTER TABLE tools_projects DROP CONSTRAINT FK_82D761851EDE0F55');
        $this->addSql('ALTER TABLE tools_portfolios DROP CONSTRAINT FK_5C595A30752C489C');
        $this->addSql('ALTER TABLE tools_portfolios DROP CONSTRAINT FK_5C595A3081DC659');
        $this->addSql('DROP TABLE projects');
        $this->addSql('DROP TABLE projects_images');
        $this->addSql('DROP TABLE projects_links');
        $this->addSql('DROP TABLE tools');
        $this->addSql('DROP TABLE tools_projects');
        $this->addSql('DROP TABLE tools_portfolios');
        $this->addSql('ALTER TABLE users ADD dribble_login VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE users ADD dribble_id VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE users DROP dribbble_login');
        $this->addSql('ALTER TABLE users DROP dribbble_id');
    }
}
