<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241219152439 extends AbstractMigration
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
        $this->addSql('CREATE TABLE promotion (id UUID NOT NULL, formation_id UUID DEFAULT NULL, institution VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_C11D7DD15200282E ON promotion (formation_id)');
        $this->addSql('COMMENT ON COLUMN promotion.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN promotion.formation_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE promotion ADD CONSTRAINT FK_C11D7DD15200282E FOREIGN KEY (formation_id) REFERENCES formation (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE portfolios ADD config JSON DEFAULT NULL');
        $this->addSql('ALTER TABLE portfolios ADD site JSON DEFAULT NULL');
        $this->addSql('ALTER TABLE projects DROP category');
        $this->addSql('ALTER TABLE projects DROP status');
        $this->addSql('ALTER TABLE users ADD promotion_id UUID DEFAULT NULL');
        $this->addSql('ALTER TABLE users ADD firstname VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE users RENAME COLUMN full_name TO name');
        $this->addSql('COMMENT ON COLUMN users.promotion_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE users ADD CONSTRAINT FK_1483A5E9139DF194 FOREIGN KEY (promotion_id) REFERENCES promotion (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_1483A5E9139DF194 ON users (promotion_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE users DROP CONSTRAINT FK_1483A5E9139DF194');
        $this->addSql('ALTER TABLE promotion DROP CONSTRAINT FK_C11D7DD15200282E');
        $this->addSql('DROP TABLE formation');
        $this->addSql('DROP TABLE promotion');
        $this->addSql('ALTER TABLE portfolios DROP config');
        $this->addSql('ALTER TABLE portfolios DROP site');
        $this->addSql('ALTER TABLE projects ADD category VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE projects ADD status VARCHAR(255) NOT NULL');
        $this->addSql('DROP INDEX IDX_1483A5E9139DF194');
        $this->addSql('ALTER TABLE users ADD full_name VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE users DROP promotion_id');
        $this->addSql('ALTER TABLE users DROP name');
        $this->addSql('ALTER TABLE users DROP firstname');
    }
}
