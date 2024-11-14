<?php

namespace App\Entity;

use App\Repository\ToolsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ToolsRepository::class)]
class Tools
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $picto = null;

    /**
     * @var Collection<int, Portfolios>
     */
    #[ORM\ManyToMany(targetEntity: Portfolios::class, inversedBy: 'tools')]
    private Collection $Portfolio;

    public function __construct()
    {
        $this->Portfolio = new ArrayCollection();
    }

    public function getId(): ?int
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

    public function getPicto(): ?string
    {
        return $this->picto;
    }

    public function setPicto(string $picto): static
    {
        $this->picto = $picto;

        return $this;
    }

    /**
     * @return Collection<int, Portfolios>
     */
    public function getPortfolio(): Collection
    {
        return $this->Portfolio;
    }

    public function addPortfolio(Portfolios $portfolio): static
    {
        if (!$this->Portfolio->contains($portfolio)) {
            $this->Portfolio->add($portfolio);
        }

        return $this;
    }

    public function removePortfolio(Portfolios $portfolio): static
    {
        $this->Portfolio->removeElement($portfolio);

        return $this;
    }
}
