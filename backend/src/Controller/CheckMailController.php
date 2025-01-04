<?php

namespace App\Controller;

use App\Repository\UsersRepository;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;


class CheckMailController extends AbstractController
{
    public function __construct(
        private UsersRepository             $usersRepository,
        private EntityManagerInterface      $entityManager,
        private JWTTokenManagerInterface    $jwtManager,
    )
    {
    }

    #[Route('/api/checkmail', methods: ['POST'])]
    public function check_mail(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!$data['code'] || !$data['email']) {
            return new JsonResponse(['error' => 'code and email are required.'], Response::HTTP_BAD_REQUEST);
        }

        $mailcheck_code = $data['code'];
        $email = $data['email'];

        $user = $this->usersRepository->findOneBy(['email' => $email]);
        if (!$user) {
            return new JsonResponse(['error' => 'Incorrect email or code'], JsonResponse::HTTP_BAD_REQUEST);
        }

        if ($mailcheck_code !== $user->getEmailVerificationCode()) {
            return new JsonResponse(['error' => 'Incorrect email or code'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $user->setEmailVerificationCode(null);
        $user->setIsEmailVerified(true);

        $this->entityManager->flush();

        $token = $this->jwtManager->create($user);
        return new JsonResponse(['token' => $token], JsonResponse::HTTP_OK);
    }
}