<?php

namespace App\Controller;

use App\Repository\PortfoliosRepository;
use App\Service\PortfolioService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;


class PortfolioController extends AbstractController
{
    #[Route('api/portfolio', methods: ['POST'])]
    public function add_portfolio(
        Request $request,
        PortfolioService $portfolioService,
        Security $security,
    ): JsonResponse
    {
        $user = $security->getUser();
        $data = $request->getContent();

        if(!$user){
            return new JsonResponse(['error' => 'unauthorized'], Response::HTTP_UNAUTHORIZED);
        }
        $jsonPortfolio = $portfolioService->CreatPortfolio($data, $user);

        return new JsonResponse($jsonPortfolio, Response::HTTP_CREATED, [], true);
    }


    #[Route('api/portfolio', methods: ['PUT'])]
    public function update_portfolio(
        Request $request,
        Security $security,
        PortfolioService $portfolioService,
    ): JsonResponse
    {
        $user = $security->getUser();
        $data = $request->getContent();

        $jsonPortfolio = $portfolioService->UpdatePortfolio($data, $user);

        return new JsonResponse($jsonPortfolio, Response::HTTP_CREATED, [], true);
    }

    #[Route('api/portfolio', methods: ['GET'])]
    public function get_portfolio(
        SerializerInterface $serializer,
        Security $security,
        PortfoliosRepository $portfoliosRepository,
    )
    {
        $user = $security->getUser();
        $portfolio = $portfoliosRepository->findOneBy(['users' => $user]);

        $jsonPortfolio = $serializer->serialize($portfolio, 'json', ['groups' => 'getPortfolio']);
        return new JsonResponse($jsonPortfolio, Response::HTTP_OK, [], true);
    }
}
