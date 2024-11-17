<?php
namespace App\Service;

use App\Entity\Portfolios;
use App\Entity\Projects;
use App\Entity\Users;
use App\Repository\PortfoliosRepository;
use App\Repository\ProjectsRepository;
use Doctrine\ORM\EntityManagerInterface;
use mysql_xdevapi\Exception;
use PHPUnit\Util\Json;
use Symfony\Component\Serializer\SerializerInterface;


class ProjectService
{
    private EntityManagerInterface $entityManager;
    private ProjectsRepository $projectsRepository;
    private SerializerInterface $serializer;
    private PortfoliosRepository $portfoliosRepository;

    public function __construct(
        EntityManagerInterface $entityManager,
        ProjectsRepository $projectsRepository,
        SerializerInterface $serializer,
        PortfoliosRepository $portfoliosRepository
    ) {
        $this->entityManager = $entityManager;
        $this->projectsRepository = $projectsRepository;
        $this->serializer = $serializer;
        $this->portfoliosRepository = $portfoliosRepository;
    }

    public function CreateProject(Users $user, String $data): ?string
    {
        $portfolio = $this->portfoliosRepository->findOneBy(['users' => $user]);

        if (!$portfolio) {
            throw new \InvalidArgumentException("No portfolio found for the user.");
        }

        try{
            $project = $this->serializer->deserialize($data, Projects::class, 'json');
        }catch (Exception $e){
            throw new \InvalidArgumentException("bad request ");
        }

        $project->setPortfolio($portfolio);

        $this->entityManager->persist($project);
        $this->entityManager->flush();

        return $this->serializer->serialize($project, 'json', ['groups' => 'getPortfolio']);
    }






}