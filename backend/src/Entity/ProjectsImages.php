<?php

namespace App\Entity;

use App\Repository\ProjectsImagesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProjectsImagesRepository::class)]
class ProjectsImages
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $img_src = null;

    #[ORM\Column(length: 255)]
    private ?string $img_alt = null;

    /**
     * @var Collection<int, Projects>
     */
    #[ORM\OneToMany(targetEntity: Projects::class, mappedBy: 'projectsImages')]
    private Collection $project;

    public function __construct()
    {
        $this->project = new ArrayCollection();
    }

    public function getId(): ?int
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
            $project->setProjectsImages($this);
        }

        return $this;
    }

    public function removeProject(Projects $project): static
    {
        if ($this->project->removeElement($project)) {
            // set the owning side to null (unless already changed)
            if ($project->getProjectsImages() === $this) {
                $project->setProjectsImages(null);
            }
        }

        return $this;
    }
}
