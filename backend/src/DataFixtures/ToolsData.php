<?php

namespace App\DataFixtures;

use App\Entity\Tools;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ToolsData extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $data = [
            ["name" => "typescript", "picto" => "typescript.png"],
            ["name" => "javascript", "picto" => "javascript.png"],
            ["name" => "html", "picto" => "html.png"],
            ["name" => "css", "picto" => "css.png"],
            ["name" => "php", "picto" => "php.png"],
            ["name" => "react", "picto" => "reactjs.png"]
        ];

        foreach ($data as $item) {
            $tools = new Tools();
            $tools->setName($item['name']);
            $tools->setPicto($item['picto']);
            $manager->persist($tools);
        }

        $manager->flush();
    }
}
