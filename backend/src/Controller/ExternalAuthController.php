<?php

namespace App\Controller;

use App\Service\AuthApiService;
use App\Service\ExternalUserService;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;


class ExternalAuthController extends AbstractController
{
    #[Route('/api/auth/github', methods: ['POST'])]
    public function githubAuth(
        Request $request,
        SerializerInterface $serializer,
        JWTTokenManagerInterface $jwtManager,
        AuthApiService $authApiService,
        ExternalUserService $externalUserService
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $githubToken = $data['github_token'] ?? null;

        if (!$githubToken) {
            return new JsonResponse(['error' => 'GitHub token is missing'], Response::HTTP_BAD_REQUEST);
        }

        $userData = $authApiService->getGithubUser($githubToken);

        if(!$userData){
            return new JsonResponse(['error' => 'Github Token is invalid'], Response::HTTP_BAD_REQUEST);
        }

        $user = $externalUserService->findOrCreateUserFromGithub($userData);
        $token = $jwtManager->create($user);

        $jsonUser = $serializer->serialize($user, 'json', ['groups' => 'getUsers']);
        return new JsonResponse(['token' => $token, 'user' => json_decode($jsonUser)], Response::HTTP_OK);
    }

    #[Route('/api/auth/dribbble', methods: ['POST'])]
    public function dribbbleAuth(
        Request $request,
        SerializerInterface $serializer,
        JWTTokenManagerInterface $jwtManager,
        AuthApiService $authApiService,
        ExternalUserService $externalUserService
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $dribbbleToken = $data['dribbble_token'] ?? null;

        if (!$dribbbleToken) {
            return new JsonResponse(['error' => 'dribbble token is missing'], Response::HTTP_BAD_REQUEST);
        }

        $userData = $authApiService->getDribbbleUser($dribbbleToken);

        if(!$userData){
            return new JsonResponse(['error' => 'dribbble Token is invalid'], Response::HTTP_BAD_REQUEST);
        }

        $user = $externalUserService->findOrCreateUserFromDribbble($userData);

        $token = $jwtManager->create($user);
        $jsonUser = $serializer->serialize($user, 'json', ['groups' => 'getUsers']);

        return new JsonResponse(['token' => $token, 'user' => json_decode($jsonUser)], Response::HTTP_OK);

    }




}
