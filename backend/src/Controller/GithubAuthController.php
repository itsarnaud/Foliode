<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\UsersRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class GithubAuthController extends AbstractController
{
    #[Route('/api/auth/github/student/signup', name: 'app_github_signup', methods: ['POST'])]
    public function app_github_signup(
        Request $request,
        SerializerInterface $serializer,
        EntityManagerInterface $em,
        JWTTokenManagerInterface $jwtManager
    ): JsonResponse
    {
        try {
            $user = $serializer->deserialize($request->getContent(), Users::class, 'json');
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Invalid data format.'], Response::HTTP_BAD_REQUEST);
        }

        $user->setStudent(true);
        $user->setTeacher(false);
        $user->setIsEmailVerified(true);

        $em->persist($user);
        $em->flush();

        $token = $jwtManager->create($user);
        return new JsonResponse(['token' => $token], JsonResponse::HTTP_OK);
    }

    #[Route('/api/auth/github', name:'github_auth', methods: ['POST'])]
    public function github_auth(
        Request $request,
        UsersRepository $usersRepository,
        JWTTokenManagerInterface $jwtManager,
        HttpClientInterface $httpClient
    )
    {
        $githubToken = $request->headers->get('Authorization');
        $data = json_decode($request->getContent(), true);
        $githubLogin = $data['github_login'];

        if (!$githubToken) {
            return new JsonResponse(['error' => 'Missing GitHub token'], 400);
        }

        if (!$githubLogin) {
            return new JsonResponse(['error' => 'Missing GitHub login'], 400);
        }

        $user = $usersRepository->findOneBy(['github_login' => $githubLogin]);

        if (!$user) {
            return new JsonResponse(['error' => 'incorrect user'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        if (str_starts_with($githubToken, 'Bearer ')) {
            $githubToken = substr($githubToken, 7);
        }

        try {
            $response = $httpClient->request('GET', 'https://api.github.com/user', [
                'headers' => [
                    'Authorization' => 'token ' . $githubToken,
                    'Accept' => 'application/vnd.github.v3+json',
                ],
            ]);

            if ($response->getStatusCode() !== 200) {
                return new JsonResponse(['error' => 'Invalid GitHub token'], 401);
            }

            $userData = $response->toArray();

            $expectedUserId = $user->getGithubId();
            if ($userData['id'] !== $expectedUserId) {
                return new JsonResponse(['error' => 'GitHub ID mismatch'], 403);
            }

            $token = $jwtManager->create($user);

            return new JsonResponse(['token' => $token], JsonResponse::HTTP_OK);

        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'GitHub API error', 'details' => $e->getMessage()], 500);
        }
    }


}
