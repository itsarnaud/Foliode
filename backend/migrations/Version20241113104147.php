<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241113104147 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE portfolios (id UUID NOT NULL, users_id UUID NOT NULL, title VARCHAR(255) NOT NULL, subtitle VARCHAR(255) DEFAULT NULL, bio TEXT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B81B226F67B3B43D ON portfolios (users_id)');
        $this->addSql('COMMENT ON COLUMN portfolios.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN portfolios.users_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE portfolios ADD CONSTRAINT FK_B81B226F67B3B43D FOREIGN KEY (users_id) REFERENCES users (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE users DROP behance_login');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE portfolios DROP CONSTRAINT FK_B81B226F67B3B43D');
        $this->addSql('DROP TABLE portfolios');
        $this->addSql('ALTER TABLE users ADD behance_login VARCHAR(255) DEFAULT NULL');
    }
}
