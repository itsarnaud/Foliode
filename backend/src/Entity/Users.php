<?php

namespace App\Entity;

use App\Repository\UsersRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UsersRepository::class)]
class Users implements PasswordAuthenticatedUserInterface, UserInterface
{
    #[ORM\Id]
    #[ORM\Column(type: "uuid", unique: true)]
    #[ORM\GeneratedValue(strategy: "CUSTOM")]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[Groups('getUsers')]
    private ?string $id = null;


    #[ORM\Column(length: 255)]
    #[Groups('getUsers')]
    private ?string $full_name = null;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Groups('getUsers')]
    private ?string $email = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $password = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $github_login = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $github_token = null;


    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups('getUsers')]
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
    private  ?bool $is_email_verified = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getFullName(): ?string
    {
        return $this->full_name;
    }

    public function setFullName(string $full_name): static
    {
        $this->full_name = $full_name;

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

    public function getGithubToken(string $githubToken): string
    {
        return $this->github_token;
    }

    public function setGithubToken(string $githubToken): self
    {
        $this->github_token = $githubToken;
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
        $this->password = null;
    }

    public function getUserIdentifier(): string
    {
        return $this->email;
    }
}
