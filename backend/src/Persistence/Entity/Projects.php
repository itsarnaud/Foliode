<?php

namespace App\Persistence\Entity;

use App\persistence\Repository\ProjectsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;


#[ORM\Entity(repositoryClass: ProjectsRepository::class)]
class Projects
{
    #[ORM\Id]
    #[ORM\Column(type: "uuid", unique: true)]
    #[ORM\GeneratedValue(strategy: "CUSTOM")]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[Groups(['getPortfolio', 'getProject']) ]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "The name is required.")]
    #[Assert\Length(max: 255, maxMessage: "title cannot exceed 255 characters")]
    #[Groups(['getPortfolio', 'getProject']) ]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['getPortfolio', 'getProject']) ]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'projects')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Portfolios $portfolio = null;

    /**
     * @var Collection<int, ProjectsImages>
     */
    #[ORM\OneToMany(targetEntity: ProjectsImages::class, mappedBy: 'project', cascade: ["persist", "remove"])]
    #[Groups(['getPortfolio', 'getProject']) ]
    private Collection $projectsImages;

    /**
     * @var Collection<int, ProjectsLinks>
     */
    #[ORM\OneToMany(targetEntity: ProjectsLinks::class, mappedBy: 'project', cascade: ["persist", "remove"])]
    #[Groups(['getPortfolio', 'getProject']) ]
    private Collection $projectsLinks;

    /**
     * @var Collection<int, Tools>
     */
    #[ORM\ManyToMany(targetEntity: Tools::class, mappedBy: 'projects', cascade: ["persist"])]
    #[Groups(['getPortfolio', 'getProject']) ]
    private Collection $tools;


    public function __construct()
    {
        $this->projectsImages = new ArrayCollection();
        $this->projectsLinks = new ArrayCollection();
        $this->tools = new ArrayCollection();
    }

    public function getId(): ?string
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

    public function getPortfolio(): ?Portfolios
    {
        return $this->portfolio;
    }

    public function setPortfolio(?Portfolios $portfolio): static
    {
        $this->portfolio = $portfolio;

        return $this;
    }

    /**
     * @return Collection<int, ProjectsImages>
     */
    public function getProjectsImages(): Collection
    {
        return $this->projectsImages;
    }

    public function addProjectsImage(ProjectsImages $projectsImage): static
    {
        if (!$this->projectsImages->contains($projectsImage)) {
            $this->projectsImages->add($projectsImage);
            $projectsImage->setProject($this);
        }

        return $this;
    }

    public function removeProjectsImage(ProjectsImages $projectsImage): static
    {
        if ($this->projectsImages->removeElement($projectsImage)) {
            // set the owning side to null (unless already changed)
            if ($projectsImage->getProject() === $this) {
                $projectsImage->setProject(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ProjectsLinks>
     */
    public function getProjectsLinks(): Collection
    {
        return $this->projectsLinks;
    }

    public function addProjectsLink(ProjectsLinks $projectsLink): static
    {
        if (!$this->projectsLinks->contains($projectsLink)) {
            $this->projectsLinks->add($projectsLink);
            $projectsLink->setProject($this);
        }

        return $this;
    }

    public function removeProjectsLink(ProjectsLinks $projectsLink): static
    {
        if ($this->projectsLinks->removeElement($projectsLink)) {
            // set the owning side to null (unless already changed)
            if ($projectsLink->getProject() === $this) {
                $projectsLink->setProject(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Tools>
     */
    public function getTools(): Collection
    {
        return $this->tools;
    }

    public function addTool(Tools $tool): static
    {
        if (!$this->tools->contains($tool)) {
            $this->tools->add($tool);
            $tool->addProject($this);
        }

        return $this;
    }

    public function removeTool(Tools $tool): static
    {
        if ($this->tools->removeElement($tool)) {
            $tool->removeProject($this);
        }

        return $this;
    }




}
