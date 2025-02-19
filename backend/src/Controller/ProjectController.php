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
use Symfony\Component\Security\Http\Attribute\IsGranted;

class ProjectController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private ProjectsRepository     $projectsRepository,
        private SerializerInterface    $serializer,
        private PortfoliosRepository   $portfoliosRepository,
        private FileUploaderService    $fileUploader,
        private ValidatorBaseService   $validatorBaseService
    ) {}

    #[IsGranted('ROLE_USER')]
    #[Route('/api/project', methods: ['POST'])]
    public function add_project(
        Request $request,
    ): JsonResponse {
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
        if ($errors) {
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

    #[IsGranted('ROLE_USER')]
    #[Route('/api/projects', methods: ['POST'])]
    public function add_projects(Request $request): JsonResponse
    {
        $user = $this->getUser();
        $data = $request->request->all();
        $files = $request->files->all();
        $uploadDir = $this->getParameter('upload_directory') . '/project';
        $portfolio = $this->portfoliosRepository->findOneBy(['users' => $user]);

        if (!$data || !$files) {
            return new JsonResponse(['error' => 'bad request'], Response::HTTP_BAD_REQUEST);
        }

        $projects = [];
        foreach ($data['projects'] as $index => $projectData) {
            if (!isset($projectData['title']) || !isset($files['projects'][$index]['images'])) {
                return new JsonResponse(['error' => "Invalid data for project at index $index"], Response::HTTP_BAD_REQUEST);
            }

            $project = new Projects();
            $project->setTitle($projectData['title']);
            $project->setDescription($projectData['description']);
            $project->setPortfolio($portfolio);

            foreach ($files['projects'][$index]['images'] as $file) {
                if (!$file instanceof UploadedFile) {
                    return new JsonResponse(['error' => 'Invalid file format'], Response::HTTP_BAD_REQUEST);
                }

                $filePath = $this->fileUploader->uploadFile($file, $uploadDir);
                $projectImage = new ProjectsImages();
                $projectImage->setImgSrc($filePath);
                $projectImage->setImgAlt($project->getTitle());
                $project->addProjectsImage($projectImage);
            }

            $this->entityManager->persist($project);
            $projects[] = $project;
        }

        $this->entityManager->flush();

        return new JsonResponse($projects, Response::HTTP_CREATED);
    }

    #[IsGranted('ROLE_USER')]
    #[Route('/api/project/{id}', methods: ['POST'])]
    public function update_project(
        string  $id,
        Request $request,
    ): JsonResponse {
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

        $project = $this->projectsRepository->findOneBy(['id' => $id]);

        if ($project->getPortfolio() !== $this->portfoliosRepository->findOneBy(['users' => $user])) {
            return new JsonResponse(['error' => "no project found "], Response::HTTP_NOT_FOUND);
        }

        $this->serializer->deserialize($data, Projects::class, 'json', ['object_to_populate' => $project]);
        $errors = $this->validatorBaseService->CatchInvalidData($user);
        if ($errors) {
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

        $this->entityManager->flush();

        $jsonProject = $this->serializer->serialize($project, 'json', ['groups' => 'getPortfolio']);
        return new JsonResponse($jsonProject, Response::HTTP_OK, [], true);
    }


    #[IsGranted('ROLE_USER')]
    #[Route('/api/project/{id}', methods: ['DELETE'])]
    public function deleteProject(string $id): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['error' => 'Unauthorized profile'], Response::HTTP_UNAUTHORIZED);
        }
        $project = $this->projectsRepository->findOneBy(['id' => $id]);
        if (!$project) {
            return new JsonResponse(['error' => 'No project found'], Response::HTTP_NOT_FOUND);
        }
        if ($project->getPortfolio() !== $this->portfoliosRepository->findOneBy(['users' => $user])) {
            return new JsonResponse(['error' => " no project found "], Response::HTTP_NOT_FOUND);
        }
        $this->entityManager->remove($project);
        $this->entityManager->flush();
        return new JsonResponse(['message' => 'Project deleted successfully'], Response::HTTP_OK);
    }

    #[IsGranted('ROLE_USER')]
    #[Route('/api/project/{id}', methods: ['GET'])]
    public function getProject(string $id): JsonResponse
    {
        $project = $this->projectsRepository->findOneBy(['id' => $id]);
        if (!$project) {
            return new JsonResponse(['error' => 'No project found'], Response::HTTP_NOT_FOUND);
        }
        $jsonProject = $this->serializer->serialize($project, 'json', ['groups' => 'getPortfolio']);
        return new JsonResponse($jsonProject, Response::HTTP_OK, [], true);
    }

    #[IsGranted('ROLE_USER')]
    #[Route('/api/projects', methods: ['GET'])]
    public function getProjects(): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['error' => 'Unauthorized profile'], Response::HTTP_UNAUTHORIZED);
        }
        $portfolio = $this->portfoliosRepository->findOneBy(['users' => $user]);

        if (!$portfolio) {
            return new JsonResponse(['error' => 'projects not found'], Response::HTTP_NOT_FOUND);
        }

        $projects = $portfolio->getProjects();

        $jsonProjects = $this->serializer->serialize($projects, 'json', ['groups' => 'getProject']);
        return new JsonResponse($jsonProjects, Response::HTTP_OK, [], true);
    }
}
