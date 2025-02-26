<?php

namespace App\Persistence\Entity;

use App\persistence\Repository\ToolsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ToolsRepository::class)]
class Tools
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
    private ?string $picto = null;

    /**
     * @var Collection<int, Projects>
     */
    #[ORM\ManyToMany(targetEntity: Projects::class, inversedBy: 'tools')]
    private Collection $projects;

    /**
     * @var Collection<int, Portfolios>
     */
    #[ORM\ManyToMany(targetEntity: Portfolios::class, inversedBy: 'tools')]
    private Collection $portfolios;

    public function __construct()
    {
        $this->projects = new ArrayCollection();
        $this->portfolios = new ArrayCollection();
    }

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
     * @return Collection<int, Projects>
     */
    public function getProjects(): Collection
    {
        return $this->projects;
    }

    public function addProject(Projects $project): static
    {
        if (!$this->projects->contains($project)) {
            $this->projects->add($project);
        }

        return $this;
    }

    public function removeProject(Projects $project): static
    {
        $this->projects->removeElement($project);

        return $this;
    }

    /**
     * @return Collection<int, Portfolios>
     */
    public function getPortfolios(): Collection
    {
        return $this->portfolios;
    }

    public function addPortfolio(Portfolios $portfolio): static
    {
        if (!$this->portfolios->contains($portfolio)) {
            $this->portfolios->add($portfolio);
        }

        return $this;
    }

    public function removePortfolio(Portfolios $portfolio): static
    {
        $this->portfolios->removeElement($portfolio);

        return $this;
    }
}
