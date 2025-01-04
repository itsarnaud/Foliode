<?php

namespace App\Controller;

use App\Repository\PortfoliosRepository;
use App\Repository\ProjectsImagesRepository;
use App\Repository\ProjectsLinksRepository;
use App\Service\FileUploaderService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Routing\Annotation\Route;

class ProjectResourceController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private ProjectsImagesRepository $projectsImagesRepository,
        private ProjectsLinksRepository $projectsLinksRepository,
        private PortfoliosRepository $portfoliosRepository,
        private FileUploaderService $fileUploader,
        private SerializerInterface $serializer
    ) {}

    #[IsGranted('ROLE_USER')]
    #[Route('/api/project/image/{id}', methods: ['DELETE'])]
    public function deleteProjectImage(string $id): JsonResponse
    {
        $user = $this->getUser();
        $directory = $this->getParameter('public_directory');

        $image = $this->projectsImagesRepository->findOneBy(['id' => $id]);
        if (!$image) {
            return new JsonResponse(['error' => 'No image found'], Response::HTTP_NOT_FOUND);
        }

        $portfolio = $this->portfoliosRepository->findOneBy(['projects' => $image->getProject()]);
        if (!$portfolio) {
            return new JsonResponse(['error' => 'Portfolio not found'], Response::HTTP_NOT_FOUND);
        }

        if ($portfolio->getUsers() !== $user) {
            return new JsonResponse(['error' => 'You are not authorized to perform this action'], Response::HTTP_FORBIDDEN);
        }

        $this->fileUploader->deleteFile($directory . $image->getImgSrc());
        $this->entityManager->remove($image);
        $this->entityManager->flush();

        return new JsonResponse(['success' => 'Image deleted successfully'], Response::HTTP_OK);
    }

    #[IsGranted('ROLE_USER')]
    #[Route('/api/project/image/{id}', methods: ['PUT'])]
    public function updateProjectImage(string $id, Request $request): JsonResponse
    {
        $user = $this->getUser();
        $publicDirectory = $this->getParameter('public_directory');
        $uploadDirectory = $this->getParameter('upload_directory') . '/project';
        $files = $request->files->get('images');

        $image = $this->projectsImagesRepository->findOneBy(['id' => $id]);
        if (!$image) {
            return new JsonResponse(['error' => 'No image found'], Response::HTTP_NOT_FOUND);
        }

        $portfolio = $this->portfoliosRepository->findOneBy(['projects' => $image->getProject()]);
        if (!$portfolio) {
            return new JsonResponse(['error' => 'Portfolio not found'], Response::HTTP_NOT_FOUND);
        }

        if ($portfolio->getUsers() !== $user) {
            return new JsonResponse(['error' => 'You are not authorized to perform this action'], Response::HTTP_FORBIDDEN);
        }

        $this->fileUploader->deleteFile($publicDirectory . $image->getImgSrc());

        $newImage = $this->fileUploader->uploadFile($files, $uploadDirectory);
        $image->setImgSrc($newImage);

        $this->entityManager->flush();

        $jsonImage = $this->serializer->serialize($image, 'json', ['groups' => 'getProject']);

        return new JsonResponse($jsonImage, Response::HTTP_CREATED, [], true);
    }
}
