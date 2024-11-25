<?php
namespace App\Service;

use App\Entity\Portfolios;
use App\Entity\Users;
use App\Repository\PortfoliosRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class PortfolioService extends ValidatorBaseService
{
    private EntityManagerInterface $entityManager;
    private PortfoliosRepository $portfoliosRepository;
    private SerializerInterface $serializer;
    private ValidatorInterface $validator;


    public function __construct(
        EntityManagerInterface $entityManager,
        PortfoliosRepository $portfoliosRepository,
        SerializerInterface $serializer,
        ValidatorInterface $validator

    ) {
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
        $this->portfoliosRepository = $portfoliosRepository;
        $this->validator = $validator;
    }

    public function CreatPortfolio(string $data, Users $user): string
    {
        $portfolio = $this->serializer->deserialize($data, Portfolios::class, 'json');
        $portfolio->setUsers($user);
        $errors = $this->validator->validate($portfolio);
        $this->CatchInvalidData($errors);

        $this->entityManager->persist($portfolio);
        $this->entityManager->flush();

        return $this->serializer->serialize($portfolio, 'json', ['groups' => 'getUsers']);
    }

    public function UpdatePortfolio(string $data, Users $user): string
    {
        $portfolio = $this->portfoliosRepository->findOneBy(['users' => $user]);

        $this->serializer->deserialize($data, Portfolios::class, 'json', ['object_to_populate' => $portfolio]);
        $errors = $this->validator->validate($portfolio);
        $this->CatchInvalidData($errors);

        $this->entityManager->flush();

        return $this->serializer->serialize($portfolio, 'json', ['groups' => 'getPortfolio']);
    }

    public function getPortfolio(Users $user): string
    {
        $portfolio = $this->portfoliosRepository->findOneBy(['users' => $user]);
        return $this->serializer->serialize($portfolio, 'json', ['groups' => 'getPortfolio']);
    }
}