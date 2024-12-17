<?php

namespace App\DataFixtures;

use App\Entity\Formation;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class FormationFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $formations = [
            // Commerce & Gestion
            ['type' => 'BUT', 'name' => 'Technique de Commercialisation', 'duration' => 3],
            ['type' => 'BUT', 'name' => 'Gestion administrative et commerciale des organisations', 'duration' => 3],

            // Communication-Administration-Droit
            ['type' => 'BUT', 'name' => 'Gestion des entreprises et des administrations', 'duration' => 3],
            ['type' => 'BUT', 'name' => 'Information Communication', 'duration' => 3],
            ['type' => 'BUT', 'name' => 'Carrière Judiciaire', 'duration' => 3],
            ['type' => 'BUT', 'name' => 'Carrières sociales', 'duration' => 3],
            ['type' => 'BUT', 'name' => 'Secrétariat', 'duration' => 3],

            // Informatique-Télécommunication
            ['type' => 'BUT', 'name' => 'Informatique', 'duration' => 3],
            ['type' => 'BUT', 'name' => 'Métier du Multimédia et de l’Internet', 'duration' => 3],
            ['type' => 'BUT', 'name' => 'Génie Électrique et Informatique Industrielle', 'duration' => 3],
            ['type' => 'BUT', 'name' => 'Statistique et Informatique Décisionnelle', 'duration' => 3],
            ['type' => 'BUT', 'name' => 'Réseaux et Télécommunications', 'duration' => 3],

            // Industriels
            ['type' => 'BUT', 'name' => 'Industriels', 'duration' => 3],
            ['type' => 'BUT', 'name' => 'Génie Mécanique et Productique', 'duration' => 3],
            ['type' => 'BUT', 'name' => 'Génie Civil Construction Durable', 'duration' => 3],
            ['type' => 'BUT', 'name' => 'Génie Industriel et Maintenance', 'duration' => 3],
            ['type' => 'BUT', 'name' => 'Génie Électrique et Informatique Industrielle', 'duration' => 3],

            // Sciences-Biologie-Chimie
            ['type' => 'BUT', 'name' => 'Biologie-Chimie', 'duration' => 3],
            ['type' => 'BUT', 'name' => 'Chimie', 'duration' => 3],
            ['type' => 'BUT', 'name' => 'Génie Biologique', 'duration' => 3],
            ['type' => 'BUT', 'name' => 'Génie Chimique Génie des Procédés', 'duration' => 3],
            ['type' => 'BUT', 'name' => 'Mesure Physiques', 'duration' => 3],

            // Environnement
            ['type' => 'BUT', 'name' => 'Environnement', 'duration' => 3],
            ['type' => 'BUT', 'name' => 'Hygiène, Sécurité, Environnement', 'duration' => 3],
            ['type' => 'BUT', 'name' => 'Métiers de la Transition et de l’Efficacité Énergétique', 'duration' => 3],
            ['type' => 'BUT', 'name' => 'Packaging, Emballage et Conditionnement', 'duration' => 3],

            // Transport-Logistique
            ['type' => 'BUT', 'name' => 'Transport-logistique', 'duration' => 3],
            ['type' => 'BUT', 'name' => 'Qualité, Logistique, Industrielle et Organisation', 'duration' => 3],
            ['type' => 'BUT', 'name' => 'Management logistique et des transports', 'duration' => 3],
        ];

        foreach ($formations as $data) {
            $formation = new Formation();
            $formation->setType($data['type']);
            $formation->setName($data['name']);
            $formation->setDuration($data['duration']);

            $manager->persist($formation);
        }

        $manager->flush();
    }
}