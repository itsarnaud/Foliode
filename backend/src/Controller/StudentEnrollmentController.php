<?php

namespace App\Controller;

use App\Repository\PromotionRepository;
use App\Repository\UsersRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class StudentEnrollmentController extends AbstractController
{
    public function __construct(
        private PromotionRepository $promotionRepository,
        private SerializerInterface $serializer,
        private EntityManagerInterface $entityManager,
        private UsersRepository $usersRepository,
        private JWTTokenManagerInterface $jwtManager
    ) {}

    #[IsGranted('ROLE_USER')]
    #[Route('/api/promotion/enroll', methods: ['POST'])]
    public function enrollPromotion(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $code = $data['code'];
        $user = $this->getUser();

        if (!$code) {
            return new JsonResponse(['error' => 'Promotion code is required'], Response::HTTP_BAD_REQUEST);
        }

        $promotion = $this->promotionRepository->findOneBy(['code' => $code]);

        if (!$promotion) {
            return new JsonResponse(['error' => 'Promotion not found'], Response::HTTP_NOT_FOUND);
        }

        $user->setPromotion($promotion);
        $this->entityManager->flush();

        $token = $this->jwtManager->create($user);
        return new JsonResponse(['token' => $token], JsonResponse::HTTP_OK);
    }

    #[IsGranted('ROLE_USER')]
    #[Route('/api/show/promotions', methods:['GET'])]
    public function showPromotions(): JsonResponse
    {
        $user = $this->getUser();
        $promotions = $user->getPromotions();

        if(!$promotions){
            return new JsonResponse(['error' => 'No promotions found'], Response::HTTP_NOT_FOUND);
        }

        $data = $this->serializer->serialize($promotions, 'json');

        return new JsonResponse($data, JsonResponse::HTTP_OK, [], true);
    }
}
