<?php

namespace App\Entity;

use App\Repository\PortfolioViewsRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PortfolioViewsRepository::class)]
class PortfolioViews
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[ORM\ManyToOne(inversedBy: 'portfolioViews')]
    private ?Portfolios $portfolio = null;

    public function __construct()
    {
        $this->date = new \DateTime();
    }

    #[ORM\PrePersist]
    public function setCreatedAtValue()
    {
        if ($this->date === null) {
            $this->date = new \DateTime();
        }
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): static
    {
        $this->date = $date;

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
}
