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
    #[Assert\NotBlank(message: "Name is required.")]
    #[Assert\Regex(
        pattern: '/^[a-zA-Z\s]+$/',
        message: 'Name should only contain letters and spaces.'
    )]
    #[Groups('getUsers', 'getPortfolio')]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "First name is required.")]
    #[Assert\Regex(
        pattern: '/^[a-zA-Z\s]+$/',
        message: 'First name should only contain letters and spaces.'
    )]
    #[Groups('getUsers', 'getPortfolio')]
    private ?string $firstname = null;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Assert\NotBlank(message: "Email address is required.")]
    #[Assert\Email(message: "Invalid email format.")]
    #[Groups('getUsers')]
    private ?string $email = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Assert\NotBlank(message: "Password is required.")]
    #[Assert\Length(
        min: 8,
        minMessage: "Password must be at least {{ limit }} characters long."
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
    #[Groups('getUsers', 'getPortfolio')]
    private ?string $avatar_url = null;

    #[ORM\Column(type: 'json')]
    private $roles = [];

    #[ORM\Column]
    private ?bool $is_student = null;

    #[ORM\Column]
    private ?bool $is_teacher = null;

    #[ORM\Column(type: 'string', length: 6, nullable: true)]
    private ?int $email_verification_code = null;

    #[ORM\Column]
    #[Groups('getUsers')]
    private  ?bool $is_email_verified = null;

    #[ORM\Column]
    private ?bool $is_first_connection = null;

    #[ORM\OneToOne(mappedBy: 'users', targetEntity: Portfolios::class)]
    private ?Portfolios $portfolio = null;

    #[ORM\ManyToOne(inversedBy: 'users')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Promotion $promotion = null;

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

    public function setGithubId(string $githubId): self
    {
        $this->github_id = $githubId;
        return $this;
    }

    public function getDribbbleLogin(): ?string
    {
        return $this->dribbble_login;
    }

    public function setDribbbleLogin(string $dribbbleLogin): self
    {
        $this->dribbble_login= $dribbbleLogin;
        return $this;
    }

    public function getDribbbleId(): ?string
    {
        return $this->dribbble_id;
    }

    public function setDribbbleId(string $dribbbleId): self
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

    public function isStudent(): ?bool
    {
        return $this->is_student;
    }

    public function setStudent(bool $is_student): static
    {
        $this->is_student = $is_student;
        return $this;
    }

    public function isTeacher(): ?bool
    {
        return $this->is_teacher;
    }

    public function setTeacher(bool $is_teacher): static
    {
        $this->is_teacher = $is_teacher;
        return $this;
    }

    public function isFirstConnection(): ?bool
    {
        return $this->is_first_connection;
    }

    public function setFirstConnection(bool $is_first_connection): static
    {
        $this->is_first_connection = $is_first_connection;
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

    public function getPromotion(): ?Promotion
    {
        return $this->promotion;
    }

    public function setPromotion(?Promotion $promotion): self
    {
        $this->promotion = $promotion;
        return $this;
    }
}
