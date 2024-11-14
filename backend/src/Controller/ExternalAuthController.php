<?php

namespace App\Controller;

use App\Entity\Users;
use App\Repository\UsersRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Doctrine\ORM\EntityManagerInterface;

class ExternalAuthController extends AbstractController
{
    #[Route('/api/auth/github', name: 'github_auth', methods: ['POST'])]
    public function githubAuth(
        Request $request,
        UsersRepository $usersRepository,
        JWTTokenManagerInterface $jwtManager,
        HttpClientInterface $httpClient,
        EntityManagerInterface $em
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $githubToken = $data['github_token'] ?? null;

        if (!$githubToken) {
            return new JsonResponse(['error' => 'GitHub token is missing'], Response::HTTP_BAD_REQUEST);
        }

        try {
            $response = $httpClient->request('GET', 'https://api.github.com/user', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $githubToken,
                    'Accept' => 'application/vnd.github.v3+json',
                ],
            ]);

            if ($response->getStatusCode() !== 200) {
                return new JsonResponse(['error' => 'Invalid GitHub token'], Response::HTTP_UNAUTHORIZED);
            }

            $userData = $response->toArray();
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'GitHub API error', 'details' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $user = $usersRepository->findOneBy(['github_id' => $userData['id']]);

        if (!$user) {
            $user = (new Users())
                ->setFullName($userData['name'] ?? 'Unknown')
                ->setEmail($userData['email'] ?? $userData['url'])
                ->setIsEmailVerified(true)
                ->setGithubLogin($userData['login'])
                ->setGithubId($userData['id'])
                ->setAvatarUrl($userData['avatar_url'] ?? null)
                ->setStudent(true)
                ->setTeacher(false);

            $em->persist($user);
            $em->flush();
        }

        $token = $jwtManager->create($user);

        return new JsonResponse(['token' => $token], Response::HTTP_OK);
    }


}
