<?php

namespace App\Entity;

use App\Repository\FormationRepository;
use Doctrine\Common\Collections\Collection;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Doctrine\DBAL\Types\Types;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: FormationRepository::class)]
class Formation
{
    #[ORM\Id]
    #[ORM\Column(type: "uuid", unique: true)]
    #[ORM\GeneratedValue(strategy: "CUSTOM")]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[Groups(['getFormation', 'getPromotion'])]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['getFormation', 'getPromotion', 'getPortfolio'])]
    private ?string $name = null;

    #[ORM\Column(length: 50)]
    #[Groups(['getFormation', 'getPromotion', 'getPortfolio'])]
    private ?string $type = null;

    #[ORM\Column(type: Types::INTEGER)]
    #[Groups(['getFormation', 'getPromotion'])]
    private ?int $duration = null;


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

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): static
    {
        $this->duration = $duration;

        return $this;
    }

}
