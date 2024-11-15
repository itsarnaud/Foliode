<?php

namespace App\Entity;

use App\Repository\ToolsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ToolsRepository::class)]
class Tools
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('getUsers','getPortfolio') ]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups('getUsers','getPortfolio') ]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups('getUsers','getPortfolio') ]
    private ?string $picto = null;

    /**
     * @var Collection<int, Portfolios>
     */
    #[ORM\ManyToMany(targetEntity: Portfolios::class, inversedBy: 'tools')]
    private Collection $Portfolio;

    /**
     * @var Collection<int, Projects>
     */
    #[ORM\ManyToMany(targetEntity: Projects::class, mappedBy: 'Tool')]
    private Collection $projects;

    public function __construct()
    {
        $this->Portfolio = new ArrayCollection();
        $this->projects = new ArrayCollection();
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
            $project->addTool($this);
        }

        return $this;
    }

    public function removeProject(Projects $project): static
    {
        if ($this->projects->removeElement($project)) {
            $project->removeTool($this);
        }

        return $this;
    }
}
