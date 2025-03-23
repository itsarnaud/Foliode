<?php

namespace App\Entity;

use App\Repository\FormationRepository;
use Doctrine\Common\Collections\Collection;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Doctrine\DBAL\Types\Types;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: FormationRepository::class)]
class Formation
{
    #[ORM\Id]
    #[ORM\Column(type: "uuid", unique: true)]
    #[ORM\GeneratedValue(strategy: "CUSTOM")]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[Groups(['getFormation', 'getPromotion'])]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['getFormation', 'getPromotion', 'getPortfolio'])]
    private ?string $name = null;

    #[ORM\Column(length: 50)]
    #[Groups(['getFormation', 'getPromotion', 'getPortfolio'])]
    private ?string $type = null;

    #[ORM\Column(type: Types::INTEGER)]
    #[Groups(['getFormation', 'getPromotion'])]
    private ?int $duration = null;


    /**
     * @var Collection<int, Ac>
     */
    #[ORM\OneToMany(targetEntity: Ac::class, mappedBy: 'formation', cascade: ["persist", "remove"])]
    #[Groups(['getFormation', 'getPromotion'])]
    private Collection $acs;

    public function __construct()
    {
        $this->promotions = new ArrayCollection();
        $this->acs = new ArrayCollection();
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

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): static
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
     * @return Collection<int, Ac>
     */
    public function getAcs(): Collection
    {
        return $this->acs;
    }

    public function addAc(Ac $ac): static
    {
        if (!$this->acs->contains($ac)) {
            $this->acs->add($ac);
            $ac->setFormation($this);
        }

        return $this;
    }

    public function removeAc(Ac $ac): static
    {
        if ($this->acs->removeElement($ac)) {
            // set the owning side to null (unless already changed)
            if ($ac->getFormation() === $this) {
                $ac->setFormation(null);
            }
        }

        return $this;
    }
}
