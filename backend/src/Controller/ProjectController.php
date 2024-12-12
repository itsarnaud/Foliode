<?php

namespace App\Controller;

use App\Service\ProjectService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use OpenApi\Annotations as OA;

class ProjectController extends AbstractController
{
    /**
     * @OA\Post(
     *     path="/api/project",
     *     summary="Add a new project",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             example={"name": "Project Name", "description": "Project Description"}
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Project created successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             example={"id": 1, "name": "Project Name", "description": "Project Description"}
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad request"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     )
     * )
     */
    #[Route('/api/project', methods: ['POST'])]
    public function add_project(
        Request             $request,
        ProjectService      $projectService,
    ): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $user = $this->getUser();
        $data = $request->get('json');
        $files = $request->files->get('images');
        $uploadDir = $this->getParameter('upload_directory') . '/project';

        if (!$user) {
            return new JsonResponse(['error' => 'unauthorized profil'], Response::HTTP_UNAUTHORIZED);
        }

        if (!$data) {
            return new JsonResponse(['error' => 'bad request'], Response::HTTP_BAD_REQUEST);
        }

        $jsonProject = $projectService->createProject($user, $data, $files, $uploadDir);
        return new JsonResponse($jsonProject, Response::HTTP_CREATED, [], true);
    }

    /**
     * @OA\Put(
     *     path="/api/project/{id}",
     *     summary="Update an existing project",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             example={"name": "Updated Project Name", "description": "Updated Project Description"}
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Project updated successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             example={"id": 1, "name": "Updated Project Name", "description": "Updated Project Description"}
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad request"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     )
     * )
     */
    #[Route('/api/project/{id}', methods: ['PUT'])]
    public function update_project(
        string         $id,
        Request        $request,
        ProjectService $projectService
    ): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $user = $this->getUser();
        $data = $request->getContent();

        if (!$user) {
            return new JsonResponse(['error' => 'unauthorized profil'], Response::HTTP_UNAUTHORIZED);
        }

        if (!$data) {
            return new JsonResponse(['error' => 'bad request'], Response::HTTP_BAD_REQUEST);
        }

        $jsonProject = $projectService->UpdateProject($user, $data, $id);
        return new JsonResponse($jsonProject, Response::HTTP_OK, [], true);
    }
}