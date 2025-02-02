<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250130094018 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE portfolios ADD url VARCHAR(255) DEFAULT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B81B226FF47645AE ON portfolios (url)');
        $this->addSql('DROP INDEX uniq_1483a5e9f85e0677');
        $this->addSql('ALTER TABLE users DROP username');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP INDEX UNIQ_B81B226FF47645AE');
        $this->addSql('ALTER TABLE portfolios DROP url');
        $this->addSql('ALTER TABLE users ADD username VARCHAR(255) DEFAULT NULL');
        $this->addSql('CREATE UNIQUE INDEX uniq_1483a5e9f85e0677 ON users (username)');
    }
}
