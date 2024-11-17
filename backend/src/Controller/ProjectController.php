<?php

namespace App\Controller;

use App\Service\ProjectService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;


class ProjectController extends AbstractController
{

    #[Route('/api/project', methods: ['POST'])]
    public function add_project(
        Request $request,
        Security $security,
        ProjectService $projectService
    ): JsonResponse
    {
        $user = $security->getUser();
        $data = $request->getContent();

        if(!$user){
            return new JsonResponse(['error' => 'unauthorized profil'], Response::HTTP_UNAUTHORIZED);
        }

        if(!$data){
            return new JsonResponse(['error' => 'bad request'], Response::HTTP_BAD_REQUEST);
        }

        $jsonProject = $projectService->CreateProject($user, $data);
        return new JsonResponse($jsonProject, Response::HTTP_CREATED, [], true);
    }
}
