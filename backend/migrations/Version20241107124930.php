<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241107124930 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE users ADD email_verification_code VARCHAR(6) DEFAULT NULL');
        $this->addSql('ALTER TABLE users ADD is_email_verified BOOLEAN DEFAULT NULL');
        $this->addSql('UPDATE users SET is_email_verified = TRUE');
        $this->addSql('ALTER TABLE users ALTER COLUMN is_email_verified SET NOT NULL');

    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE users DROP email_verification_code');
        $this->addSql('ALTER TABLE users DROP is_email_verified');
    }
}
