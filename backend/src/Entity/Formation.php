<?php

namespace App\Entity;

use App\Repository\FormationRepository;
use Doctrine\Common\Collections\Collection;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Doctrine\DBAL\Types\Types;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FormationRepository::class)]
class Formation
{
    #[ORM\Id]
    #[ORM\Column(type: "uuid", unique: true)]
    #[ORM\GeneratedValue(strategy: "CUSTOM")]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 50)]
    private ?string $type = null;

    #[ORM\Column(type: Types::INTEGER)]
    private ?int $duration = null;

    #[ORM\OneToMany(mappedBy: 'formation', targetEntity: Promotion::class)]
    private Collection $promotions;

    #[ORM\OneToMany(mappedBy: 'formation', targetEntity: Semestre::class)]
    private Collection $semestre;

    public function __construct()
    {
        $this->promotions = new ArrayCollection();
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

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getDuration(): ?\DateTimeInterface
    {
        return $this->duration;
    }

    public function setDuration(\DateTimeInterface $duration): static
    {
        $this->duration = $duration;

        return $this;
    }

    /**
     * @return Collection<int, Promotion>
     */
    public function getPromotions(): Collection
    {
        return $this->promotions;
    }

    public function addPromotion(Promotion $promotion): self
    {
        if (!$this->promotions->contains($promotion)) {
            $this->promotions->add($promotion);
            $promotion->setFormation($this);
        }

        return $this;
    }

    public function removePromotion(Promotion $promotion): self
    {
        if ($this->promotions->removeElement($promotion)) {
            if ($promotion->getFormation() === $this) {
                $promotion->setFormation(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Semestre>
     */
    public function getSemestre(): Collection
    {
        return $this->semestre;
    }

    public function addSemestre(Semestre $semestre): self
    {
        if (!$this->semestre->contains($semestre)) {
            $this->semestre->add($semestre);
            $semestre->setFormation($this);
        }

        return $this;
    }

    public function removeSemestre(Semestre $semestre): self
    {
        if ($this->semestre->removeElement($semestre)) {
            if ($semestre->getFormation() === $this) {
                $semestre->setFormation(null);
            }
        }

        return $this;
    }
}
