<?php

namespace App\Http\Controller;

use App\Persistence\Entity\Users;
use App\Persistence\Repository\UsersRepository;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class UserController extends AbstractController
{

    public function __construct(
        private UsersRepository             $usersRepository,
        private EntityManagerInterface      $entityManager,
        private UserPasswordHasherInterface $passwordHasher,
        private JWTTokenManagerInterface    $jwtManager,
    )
    {
    }

    #[IsGranted('ROLE_USER')]
    #[Route('/api/user', name: 'update_user', methods: ['PUT'])]
    public function update_user(
        Request $req
    ): JsonResponse
    {
        $user = $this->getUser();

        if (!$user instanceof \Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface) {
            return new JsonResponse(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        if (!$user) {
            return new JsonResponse(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($req->getContent(), true);

        if (!$data) {
            return new JsonResponse(['error' => 'Bad request'], Response::HTTP_BAD_REQUEST);
        }

        if (!isset($data['password'])) {
            return new JsonResponse(['error' => 'Le mot de passe est requis.'], Response::HTTP_BAD_REQUEST);
        }

        if (!$this->passwordHasher->isPasswordValid($user, $data['password'])) {
            return new JsonResponse(['error' => 'Le mot de passe est incorrect.'], Response::HTTP_UNAUTHORIZED);
        }

        if ($user instanceof Users && isset($data['email']) && $data['email'] !== $user->getEmail()) {
            $existingUser = $this->usersRepository->findOneBy(['email' => $data['email']]);
            if ($existingUser) {
                return new JsonResponse(['error' => 'Cette adresse mail est déjà utilisé.'], Response::HTTP_CONFLICT);
            }
            $user->setEmail($data['email']);
        }

        if (isset($data['first_name']) && $user instanceof Users) {
            $user->setFirstName($data['first_name']);
        }

        if (isset($data['last_name']) && $user instanceof Users) {
            $user->setLastName($data['last_name']);
        }

        $this->entityManager->flush();
        $token = $this->jwtManager->create($user);
        return new JsonResponse(['message' => 'User updated successfully', 'token' => $token], Response::HTTP_OK);
    }

    
}
