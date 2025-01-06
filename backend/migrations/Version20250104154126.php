<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250104154126 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE ac (id UUID NOT NULL, formation_id UUID DEFAULT NULL, name VARCHAR(255) NOT NULL, code VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_E98478FB5200282E ON ac (formation_id)');
        $this->addSql('COMMENT ON COLUMN ac.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN ac.formation_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE ressources (id UUID NOT NULL, name VARCHAR(255) NOT NULL, subject TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN ressources.id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE ressources_ac (ressources_id UUID NOT NULL, ac_id UUID NOT NULL, PRIMARY KEY(ressources_id, ac_id))');
        $this->addSql('CREATE INDEX IDX_6A8B078D3C361826 ON ressources_ac (ressources_id)');
        $this->addSql('CREATE INDEX IDX_6A8B078DD2E3ED2F ON ressources_ac (ac_id)');
        $this->addSql('COMMENT ON COLUMN ressources_ac.ressources_id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN ressources_ac.ac_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE ac ADD CONSTRAINT FK_E98478FB5200282E FOREIGN KEY (formation_id) REFERENCES formation (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE ressources_ac ADD CONSTRAINT FK_6A8B078D3C361826 FOREIGN KEY (ressources_id) REFERENCES ressources (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE ressources_ac ADD CONSTRAINT FK_6A8B078DD2E3ED2F FOREIGN KEY (ac_id) REFERENCES ac (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE ac DROP CONSTRAINT FK_E98478FB5200282E');
        $this->addSql('ALTER TABLE ressources_ac DROP CONSTRAINT FK_6A8B078D3C361826');
        $this->addSql('ALTER TABLE ressources_ac DROP CONSTRAINT FK_6A8B078DD2E3ED2F');
        $this->addSql('DROP TABLE ac');
        $this->addSql('DROP TABLE ressources');
        $this->addSql('DROP TABLE ressources_ac');
    }
}
