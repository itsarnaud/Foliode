<?php

namespace App\Entity;

use App\Repository\RessourcesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: RessourcesRepository::class)]
class Ressources
{
    #[ORM\Id]
    #[ORM\Column(type: "uuid", unique: true)]
    #[ORM\GeneratedValue(strategy: "CUSTOM")]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['getFormation', 'getPromotion'])]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['getFormation', 'getPromotion'])]
    private ?string $subject = null;

    /**
     * @var Collection<int, Ac>
     */
    #[ORM\ManyToMany(targetEntity: Ac::class, inversedBy: 'ressources')]
    private Collection $acs;

    public function __construct()
    {
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

    public function getSubject(): ?string
    {
        return $this->subject;
    }

    public function setSubject(string $subject): static
    {
        $this->subject = $subject;

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
        }

        return $this;
    }

    public function removeAc(Ac $ac): static
    {
        $this->acs->removeElement($ac);

        return $this;
    }
}
