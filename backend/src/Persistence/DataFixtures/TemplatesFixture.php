<?php

namespace App\Persistence\DataFixtures;

use App\Persistence\Entity\Templates;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class TemplatesFixture extends Fixture
{
    private $templates = [
        [
            'name' => 'Prestige',
            'preview' => 'preview1.jpg',
            'colors' => [
                'primary' => "#0E0E0E",
                'secondary' => "#DAC6A7",
                'warning' => "#0E0E0E",
                'success' => "#DAC6A7",
                'info' => "#343230",
                'light' => "#181716",
            ]
        ],
        [
            "name" => "Banto",
            "preview" => "banto.png",
            "colors" => [
                "primary" => "#669BBC",
                "secondary" => "#FDF0D5",
                "warning" => "#ffc107",
                "success" => "#28a745",
                "info" => "#17a2b8",
                "light" => "#003049",
            ]

        ],
        [
            "name" => "Emerald",
            "preview" => "emerald.png",
            "colors" => [
                "primary" => "#334B35",
                "secondary" => "#FFFFFF",
                "warning" => "#F6EEE1",
                "success" => "#FAAF15",
                "info" => "#231C0A",
                "light" => "#334B35",
            ]
        ]
    ];

    public function load(ObjectManager $manager) : void
    {
        foreach ($this->templates as $template) {
            $newTemplate = new Templates();
            $newTemplate->setName($template['name']);
            $newTemplate->setPreview($template['preview']);
            $newTemplate->setColors($template['colors']);
            $manager->persist($newTemplate);
        }

        $manager->flush();
    }
}