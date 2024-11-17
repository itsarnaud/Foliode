<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241117132803 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE users ADD dribbble_login VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE users ADD dribbble_id VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE users DROP dribbble_login');
        $this->addSql('ALTER TABLE users DROP dribbble_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE users ADD dribbble_login VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE users ADD dribbble_id VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE users DROP dribbble_login');
        $this->addSql('ALTER TABLE users DROP dribbble_id');
    }
}
