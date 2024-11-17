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
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Doctrine\ORM\EntityManagerInterface;

class ExternalAuthController extends AbstractController
{
    #[Route('/api/auth/github', methods: ['POST'])]
    public function githubAuth(
        Request $request,
        UsersRepository $usersRepository,
        SerializerInterface $serializer,
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
            $email = $userData['email'] ?? $userData['html_url'];
            $user = $usersRepository->findOneBy(['email' => $email]);

            if ($user) {
                $user->setGithubLogin($userData['login']);
                $user->setGithubId($userData['id']);
                $user->setAvatarUrl($userData['avatar_url'] ?? null);
            } else {
                $user = (new Users())
                ->setFullName($userData['name'] ?? 'Unknown')
                ->setEmail($userData['email'] ?? $userData['url'])
                ->setIsEmailVerified(true)
                ->setGithubLogin($userData['login'])
                ->setGithubId($userData['id'])
                ->setAvatarUrl($userData['avatar_url'] ?? null)
                ->setStudent(true)
                ->setTeacher(false);
            }

            $em->persist($user);
            $em->flush();
        }

        $token = $jwtManager->create($user);

        $jsonUser = $serializer->serialize($user, 'json', ['groups' => 'getUsers']);
        return new JsonResponse(['token' => $token, 'user' => json_decode($jsonUser)], Response::HTTP_OK);
    }

    #[Route('/api/auth/dribbble', methods: ['POST'])]
    public function dribbbleAuth(
        Request $request,
        UsersRepository $usersRepository,
        SerializerInterface $serializer,
        JWTTokenManagerInterface $jwtManager,
        HttpClientInterface $httpClient,
        EntityManagerInterface $em
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $dribbbleToken = $data['dribbble_token'] ?? null;

        if (!$dribbbleToken) {
            return new JsonResponse(['error' => 'dribbble token is missing'], Response::HTTP_BAD_REQUEST);
        }

        try {
            $response = $httpClient->request('GET', 'https://api.dribbble.com/v2/user', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $dribbbleToken,
                ],
            ]);

            if ($response->getStatusCode() !== 200) {
                return new JsonResponse(['error' => 'Invalid Dribbble token'], Response::HTTP_UNAUTHORIZED);
            }

            $userData = $response->toArray();
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Dribbble API error', 'details' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $user = $usersRepository->findOneBy(['dribble_id' => $userData['id']]);

        if (!$user) {
            $email = $userData['email'] ?? $userData['html_url'];
            $user = $usersRepository->findOneBy(['email' => $email]);

            if ($user) {
                $user->setDribbbleLogin($userData['login']);
                $user->setDribbbleId($userData['id']);
                $user->setAvatarUrl($userData['avatar_url'] ?? null);
            } else {
                $user = (new Users())
                ->setFullName($userData['name'] ?? 'Unknown')
                ->setEmail($userData['email'] ?? $userData['html_url'])
                ->setIsEmailVerified(true)
                ->setDribbbleLogin($userData['login'])
                ->setDribbbleId($userData['id'])
                ->setAvatarUrl($userData['avatar_url'] ?? null)
                ->setStudent(true)
                ->setTeacher(false);
            }

            $em->persist($user);
            $em->flush();
        }

        $token = $jwtManager->create($user);

        $jsonUser = $serializer->serialize($user, 'json', ['groups' => 'getUsers']);
        return new JsonResponse(['token' => $token, 'user' => json_decode($jsonUser)], Response::HTTP_OK);

    }




}
