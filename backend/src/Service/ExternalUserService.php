<?php

namespace App\Service;

use App\Entity\Users;
use App\Repository\UsersRepository;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;

class ExternalUserService
{


    public function __construct(
        private UsersRepository $usersRepository,
        private EntityManagerInterface $entityManager,
        private JWTTokenManagerInterface $JWTManager,
        private SerializerInterface $serializer,
    ) {}

    private function getJsonUser(Users $user): array
    {
        $token = $this->JWTManager->create($user);
        $jsonUser = $this->serializer->serialize($user, 'json', ['groups' => 'getUsers']);
        return ["token" => $token, "user" => $jsonUser];
    }

    public function findOrCreateUserFromGithub(array $userData, string $email): array
    {
        $user = $this->usersRepository->findOneBy(['github_id' => $userData['id']]);
        $existingUser = $this->usersRepository->findOneBy(['email' => $email]);

        if ($user) {
            return $this->getJsonUser($user);
        }

        if ($existingUser) {
            throw new \Exception('Le compte existe déjà. Veuillez vous connecter pour lier vos comptes.');
        }

        $user = (new Users())
            ->setLastName($userData['lastname'] ?? 'Unknown')
            ->setFirstName($userData['firstname'] ?? 'Unknown')
            ->setEmail($userData['email'] ?? $email)
            ->setIsEmailVerified(true)
            ->setGithubLogin($userData['login'])
            ->setGithubId($userData['id'])
            ->setAvatarUrl($userData['avatar_url'] ?? null)
            ->setStudent(true)
            ->setTeacher(false);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->getJsonUser($user);
    }

    public function updateUserWithGithub(Users $user, array $userData): array
    {
        $user->setGithubLogin($userData['login']);
        $user->setGithubId($userData['id']);
        $user->setAvatarUrl($userData['avatar_url'] ?? null);
        $this->entityManager->flush();

        return $this->getJsonUser($user);
    }

    public function findOrCreateUserFromDribbble(array $userData): array
    {
        $user = $this->usersRepository->findOneBy(['dribbble_id' => $userData['id']]);
        $existingUser = $this->usersRepository->findOneBy(['email' => $userData['email']]);

        if ($user) {
            return $this->getJsonUser($user);
        }

        if ($existingUser) {
            throw new \Exception('Email already in use. Please log in to link accounts.');
        }

        $user = (new Users())
            ->setLastName($userData['lastname'] ?? 'Unknown')
            ->setFirstName($userData['firstname'] ?? 'Unknown')
            ->setEmail($userData['email'] ?? $userData['html_url'])
            ->setIsEmailVerified(true)
            ->setDribbbleLogin($userData['login'])
            ->setDribbbleId($userData['id'])
            ->setAvatarUrl($userData['avatar_url'] ?? null)
            ->setStudent(true)
            ->setTeacher(false);

        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return $this->getJsonUser($user);
    }

    public function updateUserWithDribble(Users $user, array $userData): array
    {
        $user->setDribbbleLogin($userData['login']);
        $user->setDribbbleId($userData['id']);
        $user->setAvatarUrl($userData['avatar_url'] ?? null);
        $this->entityManager->flush();

        return $this->getJsonUser($user);
    }
}
