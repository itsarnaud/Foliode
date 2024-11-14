<?php

namespace App\Controller;

use App\Repository\PortfoliosRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\UsersRepository;
use App\Entity\Portfolios; 
use Symfony\Contracts\HttpClient\HttpClientInterface;


class PortfolioController extends AbstractController
{
    #[Route('api/portfolio', methods: ['POST'])]
    public function add_portfolio(
        Request $request,
        SerializerInterface $serializer,
        EntityManagerInterface $em,
        Security $security,
    ): JsonResponse
    {
        $user = $security->getUser();
        
        try {
            $portfolio = $serializer->deserialize($request->getContent(), Portfolios::class, 'json');
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Invalid data format.'], Response::HTTP_BAD_REQUEST);
        }

        $portfolio->setUsers($user);

        $em->persist($portfolio);
        $em->flush();

        $jsonPortfolio = $serializer->serialize($portfolio, 'json', ['groups' => 'getUsers']);
        
        return new JsonResponse($jsonPortfolio, Response::HTTP_CREATED, [], true);
    }

    #[Route('api/portfolio', methods: ['PUT'])]
    public function update_portfolio(
        Request $request,
        SerializerInterface $serializer,
        EntityManagerInterface $em,
        Security $security,
        PortfoliosRepository $portfoliosRepository,
    ): JsonResponse
    {
        $user = $security->getUser();
        $data = json_decode($request->getContent(), true);
        $portfolio = $portfoliosRepository->findOneBy(['users' => $user]);

        if(!$data['title'] || !$data['subtitle'] || !$data['bio']){
            return new JsonResponse(['error' => 'Invalid data format.'], Response::HTTP_BAD_REQUEST);
        }

        $portfolio->setTitle($data['title']);
        $portfolio->setSubtitle($data['subtitle']);
        $portfolio->setBio($data['bio']);

        $em->persist($portfolio);
        $em->flush();

        $jsonPortfolio = $serializer->serialize($portfolio, 'json', ['groups' => 'getUsers']);
        return new JsonResponse($jsonPortfolio, Response::HTTP_CREATED, [], true);
    }


}
