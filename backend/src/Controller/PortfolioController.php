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
use Symfony\Component\Validator\Validator\ValidatorInterface;


class PortfolioController extends AbstractController
{


    public function __construct(
        private ValidatorBaseService   $validatorBaseService,
        private EntityManagerInterface $entityManager,
        private SerializerInterface    $serializer,
        private ValidatorInterface     $validator,
        private PortfoliosRepository   $portfoliosRepository,
    )
    {
    }

    #[Route('api/portfolio', methods: ['POST'])]
    public function add_portfolio(Request $request): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $user = $this->getUser();
        $data = $request->getContent();

        $portfolio = $this->serializer->deserialize($data, Portfolios::class, 'json');
        $portfolio->setUsers($user);
        $errors = $this->validator->validate($portfolio);
        $this->validatorBaseService->CatchInvalidData($errors);


        $this->entityManager->persist($portfolio);
        $this->entityManager->flush();

        $jsonPortfolio = $this->serializer->serialize($portfolio, 'json', ['groups' => 'getUsers']);
        return new JsonResponse($jsonPortfolio, Response::HTTP_CREATED, [], true);
    }


    #[Route('api/portfolio', methods: ['PUT'])]
    public function update_portfolio(Request $request): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $user = $this->getUser();
        $data = $request->getContent();

        $portfolio = $this->portfoliosRepository->findOneBy(['users' => $user]);

        $this->serializer->deserialize($data, Portfolios::class, 'json', ['object_to_populate' => $portfolio]);
        $errors = $this->validator->validate($portfolio);
        $this->validatorBaseService->CatchInvalidData($errors);

        $this->entityManager->flush();

        $jsonPortfolio = $this->serializer->serialize($portfolio, 'json', ['groups' => 'getPortfolio']);

        return new JsonResponse($jsonPortfolio, Response::HTTP_CREATED, [], true);
    }

    #[Route('api/portfolio', methods: ['GET'])]
    public function get_portfolio(): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $user = $this->getUser();
        $portfolio = $this->portfoliosRepository->findOneBy(['users' => $user]);
        $jsonPortfolio = $this->serializer->serialize($portfolio, 'json', ['groups' => 'getPortfolio']);
        return new JsonResponse($jsonPortfolio, Response::HTTP_OK, [], true);
    }
}
