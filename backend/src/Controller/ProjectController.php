<?php

namespace App\Controller;


use App\Entity\Projects;
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

class ProjectController extends AbstractController
{
    #[Route('/api/project', methods: ['POST'])]
    public function add_project(
        Request $request,
        SerializerInterface $serializer,
        EntityManagerInterface $em,
        Security $security,
        PortfoliosRepository $portfoliosRepository
    ): JsonResponse
    {
        $user = $security->getUser();
        $portfolio = $portfoliosRepository->findOneBy(['users' => $user]);

        $project = $serializer->deserialize($request->getContent(), Projects::class, 'json');
        $project->setPortfolio($portfolio);

        $em->persist($project);
        $em->flush();

        $jsonProject = $serializer->serialize($project, 'json', ['groups' => 'getUsers']);
        return new JsonResponse($jsonProject, Response::HTTP_CREATED, [], true);
    }

}
