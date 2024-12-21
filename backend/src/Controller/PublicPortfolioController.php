<?php

namespace App\Controller;

use App\Repository\PortfoliosRepository;
use App\Repository\UsersRepository;
use OpenApi\Serializer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class PublicPortfolioController extends AbstractController
{
    public function __construct(
        private UsersRepository $usersRepository,
        private PortfoliosRepository $portfoliosRepository,
        private Serializer $serializer,
    )
    {
    }

    #[Route('/api/public/portfolio/{firstname}/{name}', methods: ['GET'])]
    public function getPortfolio(string $firstname, string $name): Response
    {
        $user = $this->usersRepository->findOneBy(['firstname' => $firstname, 'name' => $name]);

        if (!$user) {
            return $this->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $portfolio = $this->portfoliosRepository->findOneBy(['user' => $user]);

        if (!$portfolio) {
            return $this->json(['message' => 'Portfolio not found'], Response::HTTP_NOT_FOUND);
        }

        $jsonPortfolio = $this->serializer->serialize($portfolio, 'json', ['groups' => 'getPortfolio']);
        return new Response($jsonPortfolio, Response::HTTP_OK, [], true);
    }
}
