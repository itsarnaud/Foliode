<?php

namespace App\Entity;

use App\Repository\ProjectsImagesRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProjectsImagesRepository::class)]
class ProjectsImages
{
    #[ORM\Id]
    #[ORM\Column(type: "uuid", unique: true)]
    #[ORM\GeneratedValue(strategy: "CUSTOM")]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    private ?string $id = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups('getUsers','getPortfolio') ]
    private ?string $img_src = null;

    #[ORM\Column(length: 255)]
    #[Groups('getUsers','getPortfolio') ]
    private ?string $img_alt = null;

    #[ORM\ManyToOne(inversedBy: 'projectsImages')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Projects $project = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getImgSrc(): ?string
    {
        return $this->img_src;
    }

    public function setImgSrc(string $img_src): static
    {
        $this->img_src = $img_src;

        return $this;
    }

    public function getImgAlt(): ?string
    {
        return $this->img_alt;
    }

    public function setImgAlt(string $img_alt): static
    {
        $this->img_alt = $img_alt;

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
