<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class EmailCheckerController extends AbstractController
{
    #[Route('/email/checker', name: 'app_email_checker')]
    public function index(): Response
    {
        return $this->render('email_checker/index.html.twig', [
            'controller_name' => 'EmailCheckerController',
        ]);
    }


}
