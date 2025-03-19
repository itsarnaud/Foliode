<?php

namespace App\Controller;

use App\Entity\Portfolios;
use App\Repository\PortfoliosRepository;
use App\Service\ValidatorBaseService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Http\Attribute\IsGranted;


class PortfolioController extends AbstractController
{
    public function __construct(
        private ValidatorBaseService   $validatorBaseService,
        private EntityManagerInterface $entityManager,
        private SerializerInterface    $serializer,
        private PortfoliosRepository   $portfoliosRepository,
    ) {}

    #[IsGranted('ROLE_USER')]
    #[Route('api/portfolio', methods: ['POST'])]
    public function add_portfolio(Request $request): JsonResponse
    {
        $user = $this->getUser();
        $data = $request->getContent();

        $portfolio = $this->serializer->deserialize($data, Portfolios::class, 'json');
        $portfolio->setUsers($user);

        $errors = $this->validatorBaseService->CatchInvalidData($user);
        if ($errors) {
            return new  JsonResponse($errors, Response::HTTP_BAD_REQUEST);
        }

        $this->entityManager->persist($portfolio);
        $this->entityManager->flush();

        $jsonPortfolio = $this->serializer->serialize($portfolio, 'json', ['groups' => 'getPortfolio']);
        return new JsonResponse($jsonPortfolio, Response::HTTP_CREATED, [], true);
    }

    #[IsGranted('ROLE_USER')]
    #[Route('api/portfolio', methods: ['PUT'])]
    public function update_portfolio(Request $request): JsonResponse
    {
        $user = $this->getUser();
        $data = $request->getContent();

        $portfolio = $this->portfoliosRepository->findOneBy(['users' => $user]);


        $this->serializer->deserialize($data, Portfolios::class, 'json', ['object_to_populate' => $portfolio]);
        $portfolio->setUsers($user);

        $errors = $this->validatorBaseService->CatchInvalidData($user);
        if ($errors) {
            return new  JsonResponse($errors, Response::HTTP_BAD_REQUEST);
        }

        $this->entityManager->flush();

        $jsonPortfolio = $this->serializer->serialize($portfolio, 'json', ['groups' => 'getPortfolio']);

        return new JsonResponse($jsonPortfolio, Response::HTTP_CREATED, [], true);
    }

    #[IsGranted('ROLE_USER')]
    #[Route('api/portfolio', methods: ['GET'])]
    public function get_portfolio(): JsonResponse
    {
        $user = $this->getUser();
        $portfolio = $this->portfoliosRepository->findOneBy(['users' => $user]);
        $jsonPortfolio = $this->serializer->serialize($portfolio, 'json', ['groups' => 'getPortfolio']);
        return new JsonResponse($jsonPortfolio, Response::HTTP_OK, [], true);
    }

    #[IsGranted('ROLE_USER')]
    #[Route('api/portfolio', methods: ['DELETE'])]
    public function delete_portfolio(): JsonResponse
    {
        $user = $this->getUser();
        $portfolio = $this->portfoliosRepository->findOneBy(['users' => $user]);
        $this->entityManager->remove($portfolio);
        $this->entityManager->flush();
        return new JsonResponse(['message' => 'Portfolio deleted'], Response::HTTP_OK);
    }
}
