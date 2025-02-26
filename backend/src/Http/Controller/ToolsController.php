<?php

namespace App\Http\Controller;

use App\Persistence\Entity\Tools;
use App\Persistence\Repository\PortfoliosRepository;
use App\Service\FileUploaderService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Serializer\SerializerInterface;

class ToolsController extends AbstractController
{
    public function __construct(
        private FileUploaderService $uploader,
        private EntityManagerInterface $entityManager,
        private PortfoliosRepository $portfoliosRepository,
        private SerializerInterface $serializer
    ) {}

    #[IsGranted('ROLE_USER')]
    #[Route('/api/portfolio/tool', methods: ['POST'])]
    public function add_tool(Request $request): JsonResponse
    {
        $user = $this->getUser();
        $data = $request->get('json');
        $files = $request->files->get('images');
        $uploadDir = $this->getParameter('upload_directory') . '/tool';
        $portfolio = $this->portfoliosRepository->findOneBy(['user' => $user]);

        if (!$data && !$files) {
            return new JsonResponse(['error' => 'bad request'], Response::HTTP_BAD_REQUEST);
        }

        $tool = new Tools();
        $tool->setName($data['name']);

        $picto = $this->uploader->uploadFile($files, $uploadDir);
        $tool->setPicto($picto);
        $tool->addPortfolio($portfolio);

        $this->entityManager->persist($tool);
        $this->entityManager->flush();

        return new JsonResponse($tool, Response::HTTP_CREATED);
    }

    #[IsGranted('ROLE_USER')]
    #[Route('/api/portfolio/tools', methods: ['POST'])]
    public function add_tools(Request $request): JsonResponse
    {
        $user = $this->getUser();
        $data = $request->request->all();
        $files = $request->files->all();
        $uploadDir = $this->getParameter('upload_directory') . '/tool';
        $portfolio = $this->portfoliosRepository->findOneBy(['users' => $user]);

        if (!$data || !$files) {
            return new JsonResponse(['error' => 'bad request'], Response::HTTP_BAD_REQUEST);
        }

        $tools = [];
        foreach ($data['tools'] as $index => $toolData) {
            if (!isset($toolData['name']) || !isset($files['tools'][$index]['image'])) {
                return new JsonResponse(['error' => "Invalid data for tool at index $index"], Response::HTTP_BAD_REQUEST);
            }

            $tool = new Tools();
            $tool->setName($toolData['name']);

            $picto = $this->uploader->uploadFile($files['tools'][$index]['image'], $uploadDir);
            $tool->setPicto($picto);
            $tool->addPortfolio($portfolio);

            $this->entityManager->persist($tool);
            $tools[] = $tool;
        }

        $this->entityManager->flush();

        $jsonTools = $this->serializer->serialize($tools, 'json', ['groups' => 'getPortfolio']);



        return new JsonResponse($tools, Response::HTTP_CREATED);
    }

    #[IsGranted('ROLE_USER')]
    #[Route('/api/portfolio/tool/{id}', methods: ['DELETE'])]
    public function delete_tool(Tools $tool): JsonResponse
    {
        $user = $this->getUser();
        $portfolio = $this->portfoliosRepository->findOneBy(['users' => $user]);

        if (!$portfolio->getTools()->contains($tool)) {
            return new JsonResponse(['error' => 'tool not found'], Response::HTTP_NOT_FOUND);
        }

        $this->entityManager->remove($tool);
        $this->entityManager->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[IsGranted('ROLE_USER')]
    #[Route('/api/portfolio/tool/{id}', methods: ['PUT'])]
    public function update_tool(Tools $tool, Request $request): JsonResponse
    {
        $user = $this->getUser();
        $portfolio = $this->portfoliosRepository->findOneBy(['user' => $user]);

        if (!$portfolio->getTools()->contains($tool)) {
            return new JsonResponse(['error' => 'tool not found'], Response::HTTP_NOT_FOUND);
        }

        $data = $request->get('json');
        $files = $request->files->get('images');
        $uploadDir = $this->getParameter('upload_directory') . '/tool';

        if (!$data && !$files) {
            return new JsonResponse(['error' => 'bad request'], Response::HTTP_BAD_REQUEST);
        }

        $tool->setName($data['name']);

        if ($files) {
            $picto = $this->uploader->uploadFile($files, $uploadDir);
            $tool->setPicto($picto);
        }

        $this->entityManager->flush();

        return new JsonResponse($tool, Response::HTTP_OK);
    }

    #[IsGranted('ROLE_USER')]
    #[Route('/api/portfolio/tools', methods: ['GET'])]
    public function get_tools(): JsonResponse
    {
        $user = $this->getUser();
        $portfolio = $this->portfoliosRepository->findOneBy(['users' => $user]);

        return new JsonResponse($portfolio->getTools(), Response::HTTP_OK);
    }
}
