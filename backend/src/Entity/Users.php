<?php

namespace App\Entity;

use App\Repository\UsersRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UsersRepository::class)]
class Users implements PasswordAuthenticatedUserInterface, UserInterface
{
    #[ORM\Id]
    #[ORM\Column(type: "uuid", unique: true)]
    #[ORM\GeneratedValue(strategy: "CUSTOM")]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "Le nom est requis.")]
    #[Assert\Regex(
        pattern: '/^[\p{L}\s]+$/u',
        message: 'Le nom doit contenir uniquement des lettres et des espaces.'
    )]
    #[Groups(['getUsers', 'getPortfolio'])]
    private ?string $lastname = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "Le prénom est requis.")]
    #[Assert\Regex(
        pattern: '/^[\p{L}\s]+$/u',
        message: 'Le prénom doit contenir uniquement des lettres et des espaces.'
    )]
    #[Groups(['getUsers', 'getPortfolio'])]
    private ?string $firstname = null;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Assert\NotBlank(message: "L'adresse email est requis.")]
    #[Assert\Email(message: "Le format de l'adresse email est invalide.")]
    #[Groups(['getUsers', 'getPortfolio', 'getPromotion'])]
    private ?string $email = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Assert\NotBlank(message: "Le mot de passe est requis.")]
    #[Assert\Length(
        min: 8,
        minMessage: "Le mot de passe doit avoir au moins {{ limit }} caractères."
    )]
    private ?string $password = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups('getUsers')]
    private ?string $github_login = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups('getUsers')]
    private ?string $github_id = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups('getUsers')]
    private ?string $dribbble_login = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups('getUsers')]
    private ?string $dribbble_id = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['getUsers', 'getPortfolio', 'getPromotion'])]
    private ?string $avatar_url = null;

    #[ORM\Column(type: 'json')]
    private $roles = [];

    #[ORM\Column(type: 'string', length: 6, nullable: true)]
    private ?int $email_verification_code = null;

    #[ORM\Column]
    #[Groups('getUsers')]
    private  ?bool $is_email_verified = null;

    #[ORM\OneToOne(mappedBy: 'users', targetEntity: Portfolios::class)]
    #[Groups(['getUsers'])]
    private ?Portfolios $portfolio = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getLastName(): ?string
    {
        return $this->lastname;
    }

    public function setLastName(string $lastname): static
    {
        $this->lastname = $lastname;
        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstname;
    }

    public function setFirstName(string $firstname): static
    {
        $this->firstname = $firstname;
        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(?string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getGithubLogin(): ?string
    {
        return $this->github_login;
    }

    public function setGithubLogin(?string $github_login): static
    {
        $this->github_login = $github_login;

        return $this;
    }

    public function getGithubId(): string
    {
        return $this->github_id;
    }

    public function setGithubId(?string $githubId): self
    {
        $this->github_id = $githubId;
        return $this;
    }

    public function getDribbbleLogin(): ?string
    {
        return $this->dribbble_login;
    }

    public function setDribbbleLogin(?string $dribbbleLogin): self
    {
        $this->dribbble_login= $dribbbleLogin;
        return $this;
    }

    public function getDribbbleId(): ?string
    {
        return $this->dribbble_id;
    }

    public function setDribbbleId(?string $dribbbleId): self
    {
        $this->dribbble_id = $dribbbleId;
        return $this;
    }


    public function getAvatarUrl(): ?string
    {
        return $this->avatar_url;
    }

    public function setAvatarUrl(?string $avatar_url): static
    {
        $this->avatar_url = $avatar_url;

        return $this;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;
        return $this;
    }

    public function getEmailVerificationCode(): string
    {
        return $this->email_verification_code;
    }

    public function setEmailVerificationCode(?string $emailVerificationCode): self
    {
        $this->email_verification_code = $emailVerificationCode;
        return $this;
    }

    public function getIsEmailVerified(): bool
    {
        return $this->is_email_verified;
    }

    public function setIsEmailVerified(bool $isEmailVerified): self
    {
        $this->is_email_verified = $isEmailVerified;
        return $this;
    }

    public function getSalt(): ?string
    {
        return null;
    }

    public function eraseCredentials(): void
    {
        // $this->password = null;
    }

    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    public function getPortfolio(): ?Portfolios
    {
        return $this->portfolio;
    }

    public function setPortfolio(?Portfolios $portfolio): self
    {
        $this->portfolio = $portfolio;

        if ($portfolio && $portfolio->getUsers() !== $this) {
            $portfolio->setUsers($this);
        }

        return $this;
    }


}