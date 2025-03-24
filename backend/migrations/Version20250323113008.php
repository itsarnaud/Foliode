<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250323113008 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE formation (id UUID NOT NULL, name VARCHAR(255) NOT NULL, type VARCHAR(50) NOT NULL, duration INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN formation.id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE portfolio_views (id SERIAL NOT NULL, portfolio_id UUID DEFAULT NULL, date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_4CA8B6C2B96B5643 ON portfolio_views (portfolio_id)');
        $this->addSql('COMMENT ON COLUMN portfolio_views.portfolio_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE portfolios (id UUID NOT NULL, users_id UUID NOT NULL, title VARCHAR(255) NOT NULL, url VARCHAR(255) DEFAULT NULL, subtitle VARCHAR(255) DEFAULT NULL, bio TEXT DEFAULT NULL, config JSON DEFAULT NULL, template VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B81B226FF47645AE ON portfolios (url)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B81B226F67B3B43D ON portfolios (users_id)');
        $this->addSql('COMMENT ON COLUMN portfolios.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN portfolios.users_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE projects (id UUID NOT NULL, portfolio_id UUID NOT NULL, title VARCHAR(255) NOT NULL, description TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5C93B3A4B96B5643 ON projects (portfolio_id)');
        $this->addSql('COMMENT ON COLUMN projects.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN projects.portfolio_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE projects_images (id UUID NOT NULL, project_id UUID DEFAULT NULL, img_src TEXT NOT NULL, img_alt VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_21EB2295166D1F9C ON projects_images (project_id)');
        $this->addSql('COMMENT ON COLUMN projects_images.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN projects_images.project_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE projects_links (id UUID NOT NULL, project_id UUID DEFAULT NULL, name VARCHAR(255) NOT NULL, url TEXT NOT NULL, PRIMARY KEY(id))');
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
        $this->addSql('CREATE TABLE users (id UUID NOT NULL, lastname VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, email VARCHAR(180) NOT NULL, password TEXT DEFAULT NULL, github_login VARCHAR(255) DEFAULT NULL, github_id VARCHAR(255) DEFAULT NULL, dribbble_login VARCHAR(255) DEFAULT NULL, dribbble_id VARCHAR(255) DEFAULT NULL, avatar_url TEXT DEFAULT NULL, roles JSON NOT NULL, email_verification_code VARCHAR(6) DEFAULT NULL, is_email_verified BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1483A5E9E7927C74 ON users (email)');
        $this->addSql('COMMENT ON COLUMN users.id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE messenger_messages (id BIGSERIAL NOT NULL, body TEXT NOT NULL, headers TEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, available_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, delivered_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_75EA56E0FB7336F0 ON messenger_messages (queue_name)');
        $this->addSql('CREATE INDEX IDX_75EA56E0E3BD61CE ON messenger_messages (available_at)');
        $this->addSql('CREATE INDEX IDX_75EA56E016BA31DB ON messenger_messages (delivered_at)');
        $this->addSql('COMMENT ON COLUMN messenger_messages.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN messenger_messages.available_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN messenger_messages.delivered_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE OR REPLACE FUNCTION notify_messenger_messages() RETURNS TRIGGER AS $$
            BEGIN
                PERFORM pg_notify(\'messenger_messages\', NEW.queue_name::text);
                RETURN NEW;
            END;
        $$ LANGUAGE plpgsql;');
        $this->addSql('DROP TRIGGER IF EXISTS notify_trigger ON messenger_messages;');
        $this->addSql('CREATE TRIGGER notify_trigger AFTER INSERT OR UPDATE ON messenger_messages FOR EACH ROW EXECUTE PROCEDURE notify_messenger_messages();');
        $this->addSql('ALTER TABLE portfolio_views ADD CONSTRAINT FK_4CA8B6C2B96B5643 FOREIGN KEY (portfolio_id) REFERENCES portfolios (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE portfolios ADD CONSTRAINT FK_B81B226F67B3B43D FOREIGN KEY (users_id) REFERENCES users (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE projects ADD CONSTRAINT FK_5C93B3A4B96B5643 FOREIGN KEY (portfolio_id) REFERENCES portfolios (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE projects_images ADD CONSTRAINT FK_21EB2295166D1F9C FOREIGN KEY (project_id) REFERENCES projects (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE projects_links ADD CONSTRAINT FK_4403F526166D1F9C FOREIGN KEY (project_id) REFERENCES projects (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE tools_projects ADD CONSTRAINT FK_82D76185752C489C FOREIGN KEY (tools_id) REFERENCES tools (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE tools_projects ADD CONSTRAINT FK_82D761851EDE0F55 FOREIGN KEY (projects_id) REFERENCES projects (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE tools_portfolios ADD CONSTRAINT FK_5C595A30752C489C FOREIGN KEY (tools_id) REFERENCES tools (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE tools_portfolios ADD CONSTRAINT FK_5C595A3081DC659 FOREIGN KEY (portfolios_id) REFERENCES portfolios (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE portfolio_views DROP CONSTRAINT FK_4CA8B6C2B96B5643');
        $this->addSql('ALTER TABLE portfolios DROP CONSTRAINT FK_B81B226F67B3B43D');
        $this->addSql('ALTER TABLE projects DROP CONSTRAINT FK_5C93B3A4B96B5643');
        $this->addSql('ALTER TABLE projects_images DROP CONSTRAINT FK_21EB2295166D1F9C');
        $this->addSql('ALTER TABLE projects_links DROP CONSTRAINT FK_4403F526166D1F9C');
        $this->addSql('ALTER TABLE tools_projects DROP CONSTRAINT FK_82D76185752C489C');
        $this->addSql('ALTER TABLE tools_projects DROP CONSTRAINT FK_82D761851EDE0F55');
        $this->addSql('ALTER TABLE tools_portfolios DROP CONSTRAINT FK_5C595A30752C489C');
        $this->addSql('ALTER TABLE tools_portfolios DROP CONSTRAINT FK_5C595A3081DC659');
        $this->addSql('DROP TABLE formation');
        $this->addSql('DROP TABLE portfolio_views');
        $this->addSql('DROP TABLE portfolios');
        $this->addSql('DROP TABLE projects');
        $this->addSql('DROP TABLE projects_images');
        $this->addSql('DROP TABLE projects_links');
        $this->addSql('DROP TABLE tools');
        $this->addSql('DROP TABLE tools_projects');
        $this->addSql('DROP TABLE tools_portfolios');
        $this->addSql('DROP TABLE users');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
