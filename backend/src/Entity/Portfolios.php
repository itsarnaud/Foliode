<?php

namespace App\Entity;

use App\Repository\PortfoliosRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PortfoliosRepository::class)]
class Portfolios
{
    #[ORM\Id]
    #[ORM\Column(type: "uuid", unique: true)]
    #[ORM\GeneratedValue(strategy: "CUSTOM")]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups('getUsers', 'getPortfolio')]
    private ?string $title = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups('getUsers', 'getPortfolio')]
    private ?string $subtitle = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups('getUsers', 'getPortfolio')]
    private ?string $bio = null;

    #[ORM\OneToOne(inversedBy: 'portfolio', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups('getPortfolio') ]
    private ?Users $users = null;

    /**
     * @var Collection<int, Tools>
     */
    #[ORM\ManyToMany(targetEntity: Tools::class, mappedBy: 'Portfolio')]
    #[Groups('getUsers','getPortfolio') ]
    private Collection $tools;

    #[ORM\ManyToOne(inversedBy: 'Portfolio')]
    private ?Projects $projects = null;

    public function __construct()
    {
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

    public function getProjects(): ?Projects
    {
        return $this->projects;
    }

    public function setProjects(?Projects $projects): static
    {
        $this->projects = $projects;

        return $this;
    }
}
