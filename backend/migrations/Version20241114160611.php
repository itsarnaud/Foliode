<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241114160611 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE tools (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, picto TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE tools_portfolios (tools_id INT NOT NULL, portfolios_id UUID NOT NULL, PRIMARY KEY(tools_id, portfolios_id))');
        $this->addSql('CREATE INDEX IDX_5C595A30752C489C ON tools_portfolios (tools_id)');
        $this->addSql('CREATE INDEX IDX_5C595A3081DC659 ON tools_portfolios (portfolios_id)');
        $this->addSql('COMMENT ON COLUMN tools_portfolios.portfolios_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE tools_portfolios ADD CONSTRAINT FK_5C595A30752C489C FOREIGN KEY (tools_id) REFERENCES tools (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE tools_portfolios ADD CONSTRAINT FK_5C595A3081DC659 FOREIGN KEY (portfolios_id) REFERENCES portfolios (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE tools_portfolios DROP CONSTRAINT FK_5C595A30752C489C');
        $this->addSql('ALTER TABLE tools_portfolios DROP CONSTRAINT FK_5C595A3081DC659');
        $this->addSql('DROP TABLE tools');
        $this->addSql('DROP TABLE tools_portfolios');
    }
}
