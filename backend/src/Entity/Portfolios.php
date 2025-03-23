<?php

namespace App\Entity;

use App\Repository\PortfoliosRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: PortfoliosRepository::class)]
class Portfolios
{
    #[ORM\Id]
    #[ORM\Column(type: "uuid", unique: true)]
    #[ORM\GeneratedValue(strategy: "CUSTOM")]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\Length(max: 255, maxMessage: "title cannot exceed 255 characters")]
    #[Groups('getPortfolio')]
    private ?string $title = null;

    #[ORM\Column(length: 255, nullable: true, unique: true)]
    #[Assert\Regex(
        pattern: '/^[a-z0-9_-]+$/',
        message: 'Username should only contain lowercase letters, numbers, underscores, and hyphens.'
    )]
    #[Groups(['getPortfolio', 'getUsers'])]
    private ?string $url = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Length(max: 255, maxMessage: "subtitle cannot exceed 255 characters")]
    #[Groups('getPortfolio')]
    private ?string $subtitle = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups('getPortfolio')]
    private ?string $bio = null;

    #[ORM\Column(type: Types::JSON, nullable: true)]
    #[Groups('getPortfolio')]
    private ?array $config = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups('getPortfolio')]
    private ?string $template = null;

    #[ORM\OneToOne(targetEntity: Users::class, inversedBy: 'portfolio', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups('getPortfolio')]
    private ?Users $users = null;


    /**
     * @var Collection<int, Projects>
     */
    #[ORM\OneToMany(targetEntity: Projects::class, mappedBy: 'portfolio', cascade: ["persist"])]
    #[Groups('getPortfolio')]
    private Collection $projects;

    /**
     * @var Collection<int, Tools>
     */
    #[ORM\ManyToMany(targetEntity: Tools::class, mappedBy: 'portfolios', cascade: ["persist"])]
    #[Groups('getPortfolio')]
    private Collection $tools;

    /**
     * @var Collection<int, PortfolioViews>
     */
    #[ORM\OneToMany(targetEntity: PortfolioViews::class, mappedBy: 'portfolio')]
    private Collection $portfolioViews;

    public function __construct()
    {

        $this->projects = new ArrayCollection();
        $this->tools = new ArrayCollection();
        $this->portfolioViews = new ArrayCollection();
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

    public function setUrl(string $url): static
    {
        $this->url = $url;
        return $this;
    }

    public function getUrl(): string
    {
        return $this->url;
    }

    public function getSubtitle(): ?string
    {
        return $this->subtitle;
    }

    public function setSubtitle(?string $subtitle): static
    {
        $this->subtitle = $subtitle;

        return $this;
    }

    public function getBio(): ?string
    {
        return $this->bio;
    }

    public function setBio(?string $bio): static
    {
        $this->bio = $bio;

        return $this;
    }

    public function getConfig(): ?array
    {
        return $this->config;
    }

    public function setConfig(?array $config): self
    {
        $this->config = $config;
        return $this;
    }

    public function getTemplate(): ?string
    {
        return $this->template;
    }

    public function setTemplate(string $template): static
    {
        $this->template = $template;
        return $this;
    }



    public function getUsers(): ?Users
    {
        return $this->users;
    }

    public function setUsers(Users $users): static
    {
        $this->users = $users;

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
            $project->setPortfolio($this);
        }

        return $this;
    }

    public function removeProject(Projects $project): static
    {
        if ($this->projects->removeElement($project)) {
            // set the owning side to null (unless already changed)
            if ($project->getPortfolio() === $this) {
                $project->setPortfolio(null);
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
            $tool->addPortfolio($this);
        }

        return $this;
    }

    public function removeTool(Tools $tool): static
    {
        if ($this->tools->removeElement($tool)) {
            $tool->removePortfolio($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, PortfolioViews>
     */
    public function getPortfolioViews(): Collection
    {
        return $this->portfolioViews;
    }

    public function addPortfolioView(PortfolioViews $portfolioView): static
    {
        if (!$this->portfolioViews->contains($portfolioView)) {
            $this->portfolioViews->add($portfolioView);
            $portfolioView->setPortfolio($this);
        }

        return $this;
    }

    public function removePortfolioView(PortfolioViews $portfolioView): static
    {
        if ($this->portfolioViews->removeElement($portfolioView)) {
            // set the owning side to null (unless already changed)
            if ($portfolioView->getPortfolio() === $this) {
                $portfolioView->setPortfolio(null);
            }
        }

        return $this;
    }
}
