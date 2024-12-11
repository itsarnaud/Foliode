<?php

namespace App\Service;

use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\Projects;
use App\Entity\Users;
use App\Repository\PortfoliosRepository;
use App\Repository\ProjectsRepository;
use App\Entity\ProjectsImages;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;


class ProjectService extends ValidatorBaseService
{
    private EntityManagerInterface $entityManager;
    private ProjectsRepository $projectsRepository;
    private SerializerInterface $serializer;
    private PortfoliosRepository $portfoliosRepository;
    private ValidatorInterface $validator;
    private FileUploaderService $fileUploader;

    public function __construct(
        EntityManagerInterface $entityManager,
        ProjectsRepository     $projectsRepository,
        SerializerInterface    $serializer,
        PortfoliosRepository   $portfoliosRepository,
        ValidatorInterface     $validator,
        FileUploaderService    $fileUploader
    )
    {
        $this->entityManager = $entityManager;
        $this->projectsRepository = $projectsRepository;
        $this->serializer = $serializer;
        $this->portfoliosRepository = $portfoliosRepository;
        $this->validator = $validator;
        $this->fileUploader = $fileUploader;
    }


    public function createProject(Users $user, string $data, array $files, string $uploadDir): string
    {
        $portfolio = $this->portfoliosRepository->findOneBy(['users' => $user]);

        if (!$portfolio) {
            throw new \InvalidArgumentException("No portfolio found");
        }

        try {
            $project = $this->serializer->deserialize($data, Projects::class, 'json');
        } catch (\Exception $e) {
            throw new \InvalidArgumentException("Bad request: invalid JSON.");
        }

        $project->setPortfolio($portfolio);

        $errors = $this->validator->validate($project);
        $this->catchInvalidData($errors);

        foreach ($files as $file) {
            if (!$file instanceof UploadedFile) {
                throw new \InvalidArgumentException("Invalid file format.");
            }

            $filePath = $this->fileUploader->uploadFile($file, $uploadDir);
            $projectImage = new ProjectsImages();
            $projectImage->setImgSrc($filePath);
            $projectImage->setImgAlt($project->getTitle());
            $project->addProjectsImage($projectImage);
        }

        $this->entityManager->persist($project);
        $this->entityManager->flush();

        return $this->serializer->serialize($project, 'json', ['groups' => 'getPortfolio']);
    }

    public function UpdateProject(Users $user, string $data, string $id): string
    {
        $project = $this->projectsRepository->findOneBy(['id' => $id]);

        if ($project->getPortfolio() !== $this->portfoliosRepository->findOneBy(['users' => $user])) {
            throw new \InvalidArgumentException(" no project found ");
        }

        $this->serializer->deserialize($data, Projects::class, 'json', ['object_to_populate' => $project]);
        $errors = $this->validator->validate($project);
        $this->CatchInvalidData($errors);

        $this->entityManager->flush();
        return $this->serializer->serialize($project, 'json', ['groups' => 'getPortfolio']);
    }

}