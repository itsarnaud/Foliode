<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250319085142 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE templates');
        $this->addSql('ALTER TABLE users DROP is_student');
        $this->addSql('ALTER TABLE users DROP is_teacher');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE TABLE templates (id UUID NOT NULL, name VARCHAR(255) NOT NULL, preview VARCHAR(255) NOT NULL, colors JSON DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN templates.id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE users ADD is_student BOOLEAN NOT NULL');
        $this->addSql('ALTER TABLE users ADD is_teacher BOOLEAN NOT NULL');
    }
}
