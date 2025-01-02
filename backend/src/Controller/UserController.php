<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;

use App\Repository\UsersRepository;

class UserController extends AbstractController
{

    public function __construct(
        private UsersRepository $usersRepository,
        private EntityManagerInterface $entityManager,
    )
    {
    }

    #[Route('/api/user', name: 'update_user', methods: ['PUT'])]
    public function update_user(
        Request $req
    ): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $data = $req->getContent();
        $user = $this->getUser();

        if (!$user) {
            return new JsonResponse(['error' => 'unauthorized profil'], Response::HTTP_UNAUTHORIZED);
        }

        if (!$data) {
            return new JsonResponse(['error' => 'bad request'], Response::HTTP_BAD_REQUEST);
        }

        
        
    }
}
