<?php

namespace App\Entity;

use App\Repository\ProjectsLinksRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProjectsLinksRepository::class)]
class ProjectsLinks
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $url = null;

    /**
     * @var Collection<int, Projects>
     */
    #[ORM\OneToMany(targetEntity: Projects::class, mappedBy: 'projectsLinks')]
    private Collection $project;

    public function __construct()
    {
        $this->project = new ArrayCollection();
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

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): static
    {
        $this->url = $url;

        return $this;
    }

    /**
     * @return Collection<int, Projects>
     */
    public function getProject(): Collection
    {
        return $this->project;
    }

    public function addProject(Projects $project): static
    {
        if (!$this->project->contains($project)) {
            $this->project->add($project);
            $project->setProjectsLinks($this);
        }

        return $this;
    }

    public function removeProject(Projects $project): static
    {
        if ($this->project->removeElement($project)) {
            // set the owning side to null (unless already changed)
            if ($project->getProjectsLinks() === $this) {
                $project->setProjectsLinks(null);
            }
        }

        return $this;
    }
}
