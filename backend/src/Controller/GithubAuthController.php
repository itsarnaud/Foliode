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

class GithubAuthController extends AbstractController
{
    #[Route('/api/github/auth', name: 'app_github_auth')]
    public function index(
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


}
