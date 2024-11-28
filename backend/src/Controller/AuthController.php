<?php

namespace App\Controller;

use App\Service\SimpleAuthService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class AuthController extends AbstractController
{

    #[Route('/api/signup', methods: ['POST'])]
    public function signup(
        Request $request,
        SimpleAuthService $authService
    ): JsonResponse {
        $data = $request->getContent();
        $jsonUser = $authService->registerUser($data);
        return new JsonResponse($jsonUser, Response::HTTP_CREATED, [], true);
    }

    #[Route('/api/auth', methods: ['POST'])]
    public function auth_signin(
        Request $request,
        SimpleAuthService $authService
    ): JsonResponse {

        $data = json_decode($request->getContent(), true);
        if (!isset($data['email'])) {
            return new JsonResponse(['error' => 'Email is required'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $token = $authService->authUser($data);
        return new JsonResponse(['token' => $token], JsonResponse::HTTP_OK);
    }

    #[Route('/api/checkmail', methods: ['POST'])]
    public function check_email(
        Request $request,
        SimpleAuthService $authService
    ): JsonResponse {

        $data = json_decode($request->getContent(), true);

        if (!$data['code'] || !$data['email']) {
            return new JsonResponse(['error' => 'code and email are required.'], Response::HTTP_BAD_REQUEST);
        }

        $token = $authService->checkEmail($data);

        return new JsonResponse(['token' => $token], JsonResponse::HTTP_OK);
    }

}
