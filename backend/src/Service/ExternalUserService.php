<?php

namespace App\Service;

use App\Entity\Users;
use App\Repository\UsersRepository;
use Doctrine\ORM\EntityManagerInterface;

class ExternalUserService
{
    private $usersRepository;
    private $entityManager;

    public function __construct(UsersRepository $usersRepository, EntityManagerInterface $entityManager)
    {
        $this->usersRepository = $usersRepository;
        $this->entityManager = $entityManager;
    }

    public function findOrCreateUserFromGithub(array $userData): Users
    {
        $user = $this->usersRepository->findOneBy(['github_id' => $userData['id']]);

        if ($user) {
            return $user;
        }

        $email = $userData['email'];
        $user = $this->usersRepository->findOneBy(['email' => $email]);

        if(!$user){
            $user = (new Users())
                ->setFullName($userData['name'] ?? 'Unknown')
                ->setEmail($userData['email'] ?? $userData['url'])
                ->setIsEmailVerified(true)
                ->setGithubLogin($userData['login'])
                ->setGithubId($userData['id'])
                ->setAvatarUrl($userData['avatar_url'] ?? null)
                ->setStudent(true)
                ->setTeacher(false);
            $this->entityManager->persist($user);
            $this->entityManager->flush();
            return $user;
        }

        $user->setGithubLogin($userData['login']);
        $user->setGithubId($userData['id']);
        $user->setAvatarUrl($userData['avatar_url'] ?? null);
        $this->entityManager->flush();
        return $user;
    }

    public function findOrCreateUserFromDribbble(array $userData): Users
    {
        $user = $this->usersRepository->findOneBy(['dribbble_id' => $userData['id']]);

        if ($user) {
            return $user;
        }

        $email = $userData['email'] ?? $userData['html_url'];
        $user = $this->usersRepository->findOneBy(['email' => $email]);

        if (!$user) {
            $user = (new Users())
                ->setFullName($userData['name'] ?? 'Unknown')
                ->setEmail($userData['email'] ?? $userData['html_url'])
                ->setIsEmailVerified(true)
                ->setDribbbleLogin($userData['login'])
                ->setDribbbleId($userData['id'])
                ->setAvatarUrl($userData['avatar_url'] ?? null)
                ->setStudent(true)
                ->setTeacher(false);

            $this->entityManager->persist($user);
            $this->entityManager->flush();
            return $user;
        }

        $user->setDribbbleLogin($userData['login']);
        $user->setDribbbleId($userData['id']);
        $user->setAvatarUrl($userData['avatar_url'] ?? null);
        $this->entityManager->flush();
        return $user;
    }

}
