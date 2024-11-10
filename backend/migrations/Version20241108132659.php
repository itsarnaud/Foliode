<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241108132659 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Modifications to user table: remove github_token and add github_id';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs

        $this->addSql('ALTER TABLE users ADD COLUMN github_id VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // Reverse the changes made in up()
        $this->addSql('ALTER TABLE users DROP COLUMN github_id');
    }
}
