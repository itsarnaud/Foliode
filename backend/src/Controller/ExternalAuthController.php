<?php

namespace App\Controller;

use App\Service\ApiRequesterService;
use App\Service\ExternalUserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UsersRepository;


class ExternalAuthController extends AbstractController
{

    public function __construct(
        private ApiRequesterService $apiRequester,
        private UsersRepository     $usersRepository,
    )
    {
    }

    #[Route('/api/user/auth/github', methods: ['POST'])]
    public function githubAuth(
        Request             $request,
        ExternalUserService $externalUserService
    ): JsonResponse
    {
        $data        = json_decode($request->getContent(), true);
        $githubToken = $data['token'] ?? null;
        $email       = $data['email'] ?? null;
        $user        = $this->getUser();

        if (!$githubToken) {
            return new JsonResponse(['error' => 'GitHub token is missing'], Response::HTTP_BAD_REQUEST);
        }

        $userData = $this->apiRequester->get('https://api.github.com/user', ['Authorization' => 'Bearer ' . $githubToken, 'Accept' => 'application/vnd.github.v3+json',]);

        if (!$userData) {
            return new JsonResponse(['error' => 'Github Token is invalid'], Response::HTTP_BAD_REQUEST);
        }

        if (!$user) {
            $jsonUser = $externalUserService->findOrCreateUserFromGithub($userData, $email);
            return new JsonResponse($jsonUser, Response::HTTP_OK);
        }

        $jsonUser = $externalUserService->updateUserWithGithub($user, $userData);
        return new JsonResponse($jsonUser, Response::HTTP_OK);
    }

    #[Route('/api/user/auth/dribbble', methods: ['POST'])]
    public function dribbbleAuth(
        Request             $request,
        ExternalUserService $externalUserService
    ): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $dribbbleToken = $data['token'] ?? null;
        $user = $this->getUser();

        if (!$dribbbleToken) {
            return new JsonResponse(['error' => 'dribbble token is missing'], Response::HTTP_BAD_REQUEST);
        }

        $userData = $this->apiRequester->get('https://api.dribbble.com/v2/user', ['Authorization' => 'Bearer ' . $dribbbleToken]);

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
