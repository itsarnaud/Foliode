<?php

namespace App\Service;

use App\Entity\PortfolioViews;
use App\Entity\Portfolios;
use App\Repository\PortfolioViewsRepository;
use Doctrine\ORM\EntityManagerInterface;

class PortfolioViewService
{
    public function __construct(
        private EntityManagerInterface   $entityManager,
        private PortfolioViewsRepository $portfolioViewsRepository
    )
    {
    }

    public function addView(Portfolios $portfolio): void
    {
        $portfolioView = new PortfolioViews();
        $portfolioView->setPortfolio($portfolio);

        $this->entityManager->persist($portfolioView);
        $this->entityManager->flush();
    }

    public function getViewsLast7Days(Portfolios $portfolio): array
    {
        return $this->portfolioViewsRepository->getViewsLast7DaysForPortfolio($portfolio->getId());
    }
}