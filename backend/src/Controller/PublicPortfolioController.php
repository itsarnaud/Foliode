<?php

namespace App\Controller;

use App\Repository\PortfoliosRepository;
use App\Service\PortfolioViewService;
use App\Repository\UsersRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;


class PublicPortfolioController extends AbstractController
{
    public function __construct(
        private UsersRepository $usersRepository,
        private PortfoliosRepository $portfoliosRepository,
        private SerializerInterface $serializer,
        private PortfolioViewService $portfolioViewService
    )
    {
    }

    #[Route('/api/public/portfolio/{url}', methods: ['GET'])]
    public function getPortfolio(string $url): JsonResponse
    {
    
        $portfolio = $this->portfoliosRepository->findOneBy(['url' => $url]);
        $this->portfolioViewService->addView($portfolio);

        if (!$portfolio) {
            return $this->json(['message' => 'Portfolio not found'], Response::HTTP_NOT_FOUND);
        }

        $jsonPortfolio = $this->serializer->serialize($portfolio, 'json', ['groups' => 'getPortfolio']);
        return new JsonResponse($jsonPortfolio, Response::HTTP_OK, [], true);
    }
}
