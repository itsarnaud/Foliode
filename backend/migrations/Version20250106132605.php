<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250106132605 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE promotion ADD creator_id UUID DEFAULT NULL');
        $this->addSql('COMMENT ON COLUMN promotion.creator_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE promotion ADD CONSTRAINT FK_C11D7DD161220EA6 FOREIGN KEY (creator_id) REFERENCES users (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_C11D7DD161220EA6 ON promotion (creator_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE promotion DROP CONSTRAINT FK_C11D7DD161220EA6');
        $this->addSql('DROP INDEX IDX_C11D7DD161220EA6');
        $this->addSql('ALTER TABLE promotion DROP creator_id');
    }
}
