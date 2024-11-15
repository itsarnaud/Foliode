<?php

namespace App\Entity;

use App\Repository\ProjectsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProjectsRepository::class)]
class Projects
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $start_date = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $end_date = null;

    #[ORM\Column(length: 255)]
    private ?string $category = null;

    #[ORM\Column(length: 255)]
    private ?string $status = null;

    #[ORM\Column]
    private ?bool $is_public = null;

    /**
     * @var Collection<int, Portfolios>
     */
    #[ORM\OneToMany(targetEntity: Portfolios::class, mappedBy: 'projects')]
    private Collection $Portfolio;

    /**
     * @var Collection<int, Tools>
     */
    #[ORM\ManyToMany(targetEntity: Tools::class, inversedBy: 'projects')]
    private Collection $Tool;

    #[ORM\ManyToOne(inversedBy: 'project')]
    private ?ProjectsImages $projectsImages = null;

    #[ORM\ManyToOne(inversedBy: 'project')]
    private ?ProjectsLinks $projectsLinks = null;

    public function __construct()
    {
        $this->Portfolio = new ArrayCollection();
        $this->Tool = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->start_date;
    }

    public function setStartDate(?\DateTimeInterface $start_date): static
    {
        $this->start_date = $start_date;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->end_date;
    }

    public function setEndDate(?\DateTimeInterface $end_date): static
    {
        $this->end_date = $end_date;

        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(string $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function isPublic(): ?bool
    {
        return $this->is_public;
    }

    public function setPublic(bool $is_public): static
    {
        $this->is_public = $is_public;

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
            $portfolio->setProjects($this);
        }

        return $this;
    }

    public function removePortfolio(Portfolios $portfolio): static
    {
        if ($this->Portfolio->removeElement($portfolio)) {
            // set the owning side to null (unless already changed)
            if ($portfolio->getProjects() === $this) {
                $portfolio->setProjects(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Tools>
     */
    public function getTool(): Collection
    {
        return $this->Tool;
    }

    public function addTool(Tools $tool): static
    {
        if (!$this->Tool->contains($tool)) {
            $this->Tool->add($tool);
        }

        return $this;
    }

    public function removeTool(Tools $tool): static
    {
        $this->Tool->removeElement($tool);

        return $this;
    }

    public function getProjectsImages(): ?ProjectsImages
    {
        return $this->projectsImages;
    }

    public function setProjectsImages(?ProjectsImages $projectsImages): static
    {
        $this->projectsImages = $projectsImages;

        return $this;
    }

    public function getProjectsLinks(): ?ProjectsLinks
    {
        return $this->projectsLinks;
    }

    public function setProjectsLinks(?ProjectsLinks $projectsLinks): static
    {
        $this->projectsLinks = $projectsLinks;

        return $this;
    }
}
