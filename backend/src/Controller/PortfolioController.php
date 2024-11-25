<?php

namespace App\Controller;

use App\Repository\PortfoliosRepository;
use App\Service\PortfolioService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;


class PortfolioController extends AbstractController
{
    #[Route('api/portfolio', methods: ['POST'])]
    public function add_portfolio(
        Request $request,
        PortfolioService $portfolioService,
    ): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $user = $this->getUser();
        $data = $request->getContent();

        $jsonPortfolio = $portfolioService->CreatPortfolio($data, $user);

        return new JsonResponse($jsonPortfolio, Response::HTTP_CREATED, [], true);
    }


    #[Route('api/portfolio', methods: ['PUT'])]
    public function update_portfolio(
        Request $request,
        PortfolioService $portfolioService,
    ): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $user = $this->getUser();
        $data = $request->getContent();

        $jsonPortfolio = $portfolioService->UpdatePortfolio($data, $user);

        return new JsonResponse($jsonPortfolio, Response::HTTP_CREATED, [], true);
    }

    #[Route('api/portfolio', methods: ['GET'])]
    public function get_portfolio(
        SerializerInterface $serializer,
        PortfoliosRepository $portfoliosRepository,
        PortfolioService $portfolioService
    ): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $user = $this->getUser();
        $jsonPortfolio = $portfolioService->getPortfolio($user);
        return new JsonResponse($jsonPortfolio, Response::HTTP_OK, [], true);
    }
}
