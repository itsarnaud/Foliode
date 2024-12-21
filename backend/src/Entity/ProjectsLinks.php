<?php

namespace App\Entity;

use App\Repository\ProjectsLinksRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProjectsLinksRepository::class)]
class ProjectsLinks
{
    #[ORM\Id]
    #[ORM\Column(type: "uuid", unique: true)]
    #[ORM\GeneratedValue(strategy: "CUSTOM")]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[Groups(['getPortfolio', 'getProject']) ]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['getPortfolio', 'getProject']) ]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['getPortfolio', 'getProject']) ]
    private ?string $url = null;

    #[ORM\ManyToOne(inversedBy: 'projectsLinks')]
    private ?Projects $project = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): static
    {
        $this->url = $url;

        return $this;
    }

    public function getProject(): ?Projects
    {
        return $this->project;
    }

    public function setProject(?Projects $project): static
    {
        $this->project = $project;

        return $this;
    }
}
