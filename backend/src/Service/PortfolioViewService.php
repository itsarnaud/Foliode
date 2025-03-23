<?php

namespace App\Service;

use App\Entity\PortfolioViews;
use App\Entity\Portfolios;
use Doctrine\ORM\EntityManagerInterface;

class PortfolioViewService
{
    public function __construct(
        private EntityManagerInterface $entityManager
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
}