<?php

namespace App\Entity;

use App\Repository\PromotionRepository;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Entity\Users;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PromotionRepository::class)]
class Promotion
{
    #[ORM\Id]
    #[ORM\Column(type: "uuid", unique: true)]
    #[ORM\GeneratedValue(strategy: "CUSTOM")]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[Groups(['getPromotion'])]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['getPromotion'])]
    private ?string $institution = null;

    #[ORM\OneToMany(mappedBy: 'promotion', targetEntity: Users::class)]
    #[Groups(['getPromotion'])]
    private Collection $users;

    #[ORM\Column(type: 'string', length: 6, unique: true)]
    #[Groups(['getPromotion'])]
    private ?string $code = null;

    #[ORM\ManyToOne(targetEntity: Formation::class, inversedBy: 'promotions')]
    #[Groups(['getPromotion'])]
    private ?Formation $formation = null;

    #[ORM\ManyToOne]
    #[Groups(['getPromotion'])]
    private ?Users $creator = null;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): self
    {
        $this->code = $code;
        return $this;
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

    public function getCreator(): ?Users
    {
        return $this->creator;
    }

    public function setCreator(?Users $creator): static
    {
        $this->creator = $creator;

        return $this;
    }
}
