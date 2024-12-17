<?php

namespace App\Controller;

use App\Entity\Projects;
use App\Entity\ProjectsImages;
use App\Repository\PortfoliosRepository;
use App\Repository\ProjectsRepository;
use App\Service\FileUploaderService;
use App\Service\ValidatorBaseService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use OpenApi\Annotations as OA;
use Symfony\Component\Serializer\SerializerInterface;

class ProjectController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private ProjectsRepository     $projectsRepository,
        private SerializerInterface    $serializer,
        private PortfoliosRepository   $portfoliosRepository,
        private FileUploaderService    $fileUploader,
        private ValidatorBaseService   $validatorBaseService
    )
    {
    }

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
        Request        $request,
        ProjectService $projectService,
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

        $portfolio = $this->portfoliosRepository->findOneBy(['users' => $user]);

        if (!$portfolio) {
            return new JsonResponse(['error' => 'no portfolio found'], Response::HTTP_NOT_FOUND);
        }

        $project = $this->serializer->deserialize($data, Projects::class, 'json');
        $project->setPortfolio($portfolio);

        $errors = $this->validatorBaseService->CatchInvalidData($user);
        if($errors) {
            return new  JsonResponse($errors, Response::HTTP_BAD_REQUEST);
        }

        foreach ($files as $file) {
            if (!$file instanceof UploadedFile) {
                throw new \InvalidArgumentException("Invalid file format.");
            }

            $filePath = $this->fileUploader->uploadFile($file, $uploadDir);
            $projectImage = new ProjectsImages();
            $projectImage->setImgSrc($filePath);
            $projectImage->setImgAlt($project->getTitle());
            $project->addProjectsImage($projectImage);
        }

        $this->entityManager->persist($project);
        $this->entityManager->flush();

        $jsonProject = $this->serializer->serialize($project, 'json', ['groups' => 'getPortfolio']);
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

        $project = $this->projectsRepository->findOneBy(['id' => $id]);

        if ($project->getPortfolio() !== $this->portfoliosRepository->findOneBy(['users' => $user])) {
            return new JsonResponse(['error' => " no project found "], Response::HTTP_NOT_FOUND);
        }

        $this->serializer->deserialize($data, Projects::class, 'json', ['object_to_populate' => $project]);
        $errors = $this->validatorBaseService->CatchInvalidData($user);
        if($errors) {
            return new  JsonResponse($errors, Response::HTTP_BAD_REQUEST);
        }

        $this->entityManager->flush();

        $jsonProject = $this->serializer->serialize($project, 'json', ['groups' => 'getPortfolio']);
        return new JsonResponse($jsonProject, Response::HTTP_OK, [], true);
    }
}