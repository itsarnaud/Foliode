<?php

namespace App\Controller;

use App\Entity\Formation;
use App\Repository\FormationRepository;
use App\Repository\AcRepository;
use App\Service\ValidatorBaseService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class FormationController extends AbstractController
{
    public function __construct(
        private SerializerInterface $serializer,
        private ValidatorBaseService $validatorBaseService,
        private FormationRepository $formationRepository,
        private AcRepository $acRepository,
        private EntityManagerInterface $entityManager
    ) {}

    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/formation', methods: ['POST'])]
    public function createFormation(Request $request): Response
    {
        $data = $request->getContent();

        $formation = $this->serializer->deserialize($data, Formation::class, 'json');

        $this->entityManager->persist($formation);
        $this->entityManager->flush();

        $jsonFormation = $this->serializer->serialize($formation, 'json', ['groups' => 'getFormation']);
        return new JsonResponse($jsonFormation, Response::HTTP_CREATED, [], true);
    }

    #[Route('/api/formation', methods: ['GET'])]
    public function getFormations(): Response
    {
        $formations = $this->formationRepository->findAll();

        $jsonFormations = $this->serializer->serialize($formations, 'json', ['groups' => 'getFormation']);
        return new JsonResponse($jsonFormations, Response::HTTP_OK, [], true);
    }

    #[Route('/api/formation/{id}', methods: ['GET'])]
    public function getFormation(int $id): Response
    {
        $formation = $this->formationRepository->find($id);

        if (!$formation) {
            return $this->json(['message' => 'Formation not found'], Response::HTTP_NOT_FOUND);
        }

        $jsonFormation = $this->serializer->serialize($formation, 'json', ['groups' => 'getFormation']);
        return new JsonResponse($jsonFormation, Response::HTTP_OK, [], true);
    }

    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/formation/{id}', methods: ['PUT'])]
    public function updateFormation(Request $request, int $id): Response
    {
        $formation = $this->formationRepository->find($id);

        if (!$formation) {
            return $this->json(['message' => 'Formation not found'], Response::HTTP_NOT_FOUND);
        }

        $data = $request->getContent();
        $this->serializer->deserialize($data, Formation::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $formation]);

        $this->entityManager->flush();

        $jsonFormation = $this->serializer->serialize($formation, 'json', ['groups' => 'getFormation']);
        return new JsonResponse($jsonFormation, Response::HTTP_OK, [], true);
    }

    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/formation/{id}', methods: ['DELETE'])]
    public function deleteFormation(int $id): Response
    {
        $formation = $this->formationRepository->find($id);

        if (!$formation) {
            return $this->json(['message' => 'Formation not found'], Response::HTTP_NOT_FOUND);
        }

        $this->entityManager->remove($formation);
        $this->entityManager->flush();

        return $this->json(['message' => 'Formation deleted successfully'], Response::HTTP_NO_CONTENT);
    }
}
