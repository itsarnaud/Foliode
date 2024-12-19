<?php

namespace App\Entity;

use App\Repository\PromotionRepository;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use App\Entity\Users;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PromotionRepository::class)]
class Promotion
{
    #[ORM\Id]
    #[ORM\Column(type: "uuid", unique: true)]
    #[ORM\GeneratedValue(strategy: "CUSTOM")]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    private ?string $institution = null;

    #[ORM\OneToMany(mappedBy: 'promotion', targetEntity: Users::class)]
    private Collection $users;

    #[ORM\ManyToOne(targetEntity: Formation::class, inversedBy: 'promotions')]
    private ?Formation $formation = null;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getInstitution(): ?string
    {
        return $this->institution;
    }

    public function setInstitution(string $institution): static
    {
        $this->institution = $institution;
        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(Users $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->setPromotion($this);
        }
        return $this;
    }

    public function removeUser(Users $user): self
    {
        if ($this->users->removeElement($user)) {
            if ($user->getPromotion() === $this) {
                $user->setPromotion(null);
            }
        }
        return $this;
    }

    public function getFormation(): ?Formation
    {
        return $this->formation;
    }

    public function setFormation(?Formation $formation): self
    {
        $this->formation = $formation;
        return $this;
    }
}
