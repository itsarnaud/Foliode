<?php

namespace App\Controller;

use App\Entity\Promotion;
use App\Repository\FormationRepository;
use App\Repository\PromotionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class PromotionController extends AbstractController
{

    public function __construct(
        private FormationRepository $formationRepository,
        private PromotionRepository $promotionRepository,
        private SerializerInterface $serializer,
        private EntityManagerInterface $entityManager,
    ) {}

    #[IsGranted('ROLE_USER')]
    #[Route('/api/promotion', methods: ['POST'])]
    public function createPromotion(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $this->getUser(); 
    
        if (!isset($data['formationId'])) {
            return new JsonResponse(['error' => 'Formation ID is required'], Response::HTTP_BAD_REQUEST);
        }
    
        $formation = $this->formationRepository->find($data['formationId']);

        if (!$formation) {
            return new JsonResponse(['error' => 'Formation not found'], Response::HTTP_NOT_FOUND);
        }
    
        $promotion = $this->serializer->deserialize($request->getContent(), Promotion::class, 'json');
    
        $promotion->setFormation($formation);
        $promotion->setCreator($user); 
    
        $code = random_int(100000, 999999);
        $promotion->setCode($code);
    
        $this->entityManager->persist($promotion);
        $this->entityManager->flush();
    

        $jsonPromotion = $this->serializer->serialize($promotion, 'json', ['groups' => 'getPromotion']);
        return new JsonResponse($jsonPromotion, Response::HTTP_CREATED, [], true);
    }
    

    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/promotion/{id}', methods: ['PUT'])]
    public function updatePromotion(
        Request $request,
        String $id,
    ): JsonResponse {
        $data = $request->getContent();
        $promotion = $this->promotionRepository->findBy(['id' => $id]);

        if (!$promotion) {
            return new JsonResponse(['error' => 'Promotion not found'], Response::HTTP_NOT_FOUND);
        }

        $newPromotion = $this->serializer->deserialize($data, Promotion::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $promotion]);

        $this->entityManager->flush();

        $jsonPromotion = $this->serializer->serialize($newPromotion, 'json', ['groups' => 'getPromotion']);
        return new JsonResponse($jsonPromotion, Response::HTTP_CREATED, [], true);
    }

    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/promotion/{id}', methods: ['GET'])]
    public function getPromotion(
        String $id
    ): JsonResponse {
        $promotion = $this->promotionRepository->findBy(['id' => $id]);

        if (!$promotion) {
            return new JsonResponse(['error' => 'Promotion not found'], Response::HTTP_NOT_FOUND);
        }

        $jsonPromotions = $this->serializer->serialize($promotion, 'json', ['groups' => 'getPromotion']);
        return new JsonResponse($jsonPromotions, Response::HTTP_OK, [], true);
    }

    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/promotion/{id}', methods: ['DELETE'])]
    public function deletePromotion(
        String $id
    ): JsonResponse {
        $promotion = $this->promotionRepository->find($id);

        if (!$promotion) {
            return new JsonResponse(['error' => 'Promotion not found'], Response::HTTP_NOT_FOUND);
        }

        $this->entityManager->remove($promotion);
        $this->entityManager->flush();
        return new JsonResponse(['message' => 'Promotion deleted'], Response::HTTP_OK);
    }
}
