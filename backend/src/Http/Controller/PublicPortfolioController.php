<?php

namespace App\Http\Controller;

use App\Persistence\Repository\PortfoliosRepository;
use App\Persistence\Repository\UsersRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class PublicPortfolioController extends AbstractController
{
    public function __construct(
        private UsersRepository $usersRepository,
        private PortfoliosRepository $portfoliosRepository,
        private SerializerInterface $serializer,
    )
    {
    }

    #[Route('/api/public/portfolio/{url}', methods: ['GET'])]
    public function getPortfolio(string $url): Response
    {
    
        $portfolio = $this->portfoliosRepository->findOneBy(['url' => $url]);

        if (!$portfolio) {
            return $this->json(['message' => 'Portfolio not found'], Response::HTTP_NOT_FOUND);
        }

        $jsonPortfolio = $this->serializer->serialize($portfolio, 'json', ['groups' => 'getPortfolio']);
        return new Response($jsonPortfolio, Response::HTTP_OK, [], true);
    }
}
