<?php
namespace App\Service;

use App\Entity\Portfolios;
use App\Entity\Users;
use App\Repository\PortfoliosRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;

class PortfolioService
{
    private EntityManagerInterface $entityManager;
    private PortfoliosRepository $portfoliosRepository;
    private SerializerInterface $serializer;

    public function __construct(
        EntityManagerInterface $entityManager,
        PortfoliosRepository $portfoliosRepository,
        SerializerInterface $serializer,

    ) {
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
        $this->portfoliosRepository = $portfoliosRepository;
    }

    public function CreatPortfolio(string $data, Users $user): string
    {
        $portfolio = $this->serializer->deserialize($data, Portfolios::class, 'json');
        $portfolio->setUsers($user);

        $this->entityManager->persist($portfolio);
        $this->entityManager->flush();

        return $this->serializer->serialize($portfolio, 'json', ['groups' => 'getUsers']);
    }

    public function UpdatePortfolio(string $data, Users $user): string
    {
        $portfolio = $this->portfoliosRepository->findOneBy(['users' => $user]);

        $this->serializer->deserialize($data, Portfolios::class, 'json', ['object_to_populate' => $portfolio]);
        $this->entityManager->flush();

        return $this->serializer->serialize($portfolio, 'json', ['groups' => 'getPortfolio']);
    }


}