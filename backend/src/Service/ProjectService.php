<?php
namespace App\Service;

use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\Projects;
use App\Entity\Users;
use App\Repository\PortfoliosRepository;
use App\Repository\ProjectsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;


class ProjectService extends ValidatorBaseService
{
    private EntityManagerInterface $entityManager;
    private ProjectsRepository $projectsRepository;
    private SerializerInterface $serializer;
    private PortfoliosRepository $portfoliosRepository;
    private ValidatorInterface $validator;

    public function __construct(
        EntityManagerInterface $entityManager,
        ProjectsRepository $projectsRepository,
        SerializerInterface $serializer,
        PortfoliosRepository $portfoliosRepository,
        ValidatorInterface $validator,
    ) {
        $this->entityManager = $entityManager;
        $this->projectsRepository = $projectsRepository;
        $this->serializer = $serializer;
        $this->portfoliosRepository = $portfoliosRepository;
        $this->validator = $validator;
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

        $errors = $this->validator->validate($project);
        $this->CatchInvalidData($errors);

        $this->entityManager->persist($project);
        $this->entityManager->flush();

        return $this->serializer->serialize($project, 'json', ['groups' => 'getPortfolio']);
    }

}