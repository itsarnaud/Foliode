<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241113080958 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE portfolios (id UUID NOT NULL, users_id UUID DEFAULT NULL, title VARCHAR(255) NOT NULL, subtitle TEXT DEFAULT NULL, bio TEXT DEFAULT NULL, profil_image_url TEXT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_B81B226F67B3B43D ON portfolios (users_id)');
        $this->addSql('COMMENT ON COLUMN portfolios.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN portfolios.users_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE tools (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, picto TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE tools_portfolios (tools_id INT NOT NULL, portfolios_id UUID NOT NULL, PRIMARY KEY(tools_id, portfolios_id))');
        $this->addSql('CREATE INDEX IDX_5C595A30752C489C ON tools_portfolios (tools_id)');
        $this->addSql('CREATE INDEX IDX_5C595A3081DC659 ON tools_portfolios (portfolios_id)');
        $this->addSql('COMMENT ON COLUMN tools_portfolios.portfolios_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE users (id UUID NOT NULL, full_name VARCHAR(255) NOT NULL, email VARCHAR(180) NOT NULL, password TEXT DEFAULT NULL, github_login VARCHAR(255) DEFAULT NULL, github_id VARCHAR(255) DEFAULT NULL, avatar_url TEXT DEFAULT NULL, roles JSON NOT NULL, is_student BOOLEAN NOT NULL, is_teacher BOOLEAN NOT NULL, email_verification_code VARCHAR(6) DEFAULT NULL, is_email_verified BOOLEAN NOT NULL, PRIMARY KEY(id))');
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
        $this->addSql('ALTER TABLE portfolios ADD CONSTRAINT FK_B81B226F67B3B43D FOREIGN KEY (users_id) REFERENCES users (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE tools_portfolios ADD CONSTRAINT FK_5C595A30752C489C FOREIGN KEY (tools_id) REFERENCES tools (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE tools_portfolios ADD CONSTRAINT FK_5C595A3081DC659 FOREIGN KEY (portfolios_id) REFERENCES portfolios (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE portfolios DROP CONSTRAINT FK_B81B226F67B3B43D');
        $this->addSql('ALTER TABLE tools_portfolios DROP CONSTRAINT FK_5C595A30752C489C');
        $this->addSql('ALTER TABLE tools_portfolios DROP CONSTRAINT FK_5C595A3081DC659');
        $this->addSql('DROP TABLE portfolios');
        $this->addSql('DROP TABLE tools');
        $this->addSql('DROP TABLE tools_portfolios');
        $this->addSql('DROP TABLE users');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
