<?php

namespace App\Repository;

use App\Entity\PortfolioViews;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PortfolioViews>
 */
class PortfolioViewsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PortfolioViews::class);
    }


    public function getViewsLast7DaysForPortfolio(string $portfolioId): array
    {
        $qb = $this->createQueryBuilder('pv')
            ->select("pv.date as view_date, COUNT(pv.id) as view_count")
            ->where('pv.date >= :startDate')
            ->andWhere('pv.portfolio = :portfolioId')
            ->setParameter('startDate', new \DateTime('-6 days'))
            ->setParameter('portfolioId', $portfolioId)
            ->groupBy('pv.date')
            ->orderBy('pv.date', 'ASC');

        $results = $qb->getQuery()->getResult();

        foreach ($results as &$result) {
            if ($result['view_date'] instanceof \DateTimeInterface) {
                $result['view_date'] = $result['view_date']->format('Y-m-d');
            }
        }

        return $results;


    }

}
