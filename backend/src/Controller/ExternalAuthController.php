<?php

namespace App\Controller;

use App\Service\AuthApiService;
use App\Service\ExternalUserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class ExternalAuthController extends AbstractController
{
    #[Route('/api/auth/github', methods: ['POST'])]
    public function githubAuth(
        Request             $request,
        AuthApiService      $authApiService,
        ExternalUserService $externalUserService
    ): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $githubToken = $data['github_token'] ?? null;
        $user = $this->getUser();

        if (!$githubToken) {
            return new JsonResponse(['error' => 'GitHub token is missing'], Response::HTTP_BAD_REQUEST);
        }

        $userData = $authApiService->getGithubUser($githubToken);

        if (!$userData) {
            return new JsonResponse(['error' => 'Github Token is invalid'], Response::HTTP_BAD_REQUEST);
        }

        if (!$user) {
            $jsonUser = $externalUserService->findOrCreateUserFromGithub($userData);
            return new JsonResponse($jsonUser, Response::HTTP_OK);
        }

        $jsonUser = $externalUserService->updateUserWithGithub($user, $userData);
        return new JsonResponse($jsonUser, Response::HTTP_OK);
    }

    #[Route('/api/auth/dribbble', methods: ['POST'])]
    public function dribbbleAuth(
        Request             $request,
        AuthApiService      $authApiService,
        ExternalUserService $externalUserService
    ): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $dribbbleToken = $data['dribbble_token'] ?? null;
        $user = $this->getUser();

        if (!$dribbbleToken) {
            return new JsonResponse(['error' => 'dribbble token is missing'], Response::HTTP_BAD_REQUEST);
        }

        $userData = $authApiService->getDribbbleUser($dribbbleToken);

        if (!$userData) {
            return new JsonResponse(['error' => 'dribbble Token is invalid'], Response::HTTP_BAD_REQUEST);
        }

        if (!$user) {
            $jsonUser = $externalUserService->findOrCreateUserFromDribbble($userData);;
            return new JsonResponse($jsonUser, Response::HTTP_OK);
        }

        $jsonUser = $externalUserService->updateUserWithDribble($user, $userData);
        return new JsonResponse($jsonUser, Response::HTTP_OK);
    }

}
