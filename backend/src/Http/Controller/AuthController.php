<?php

namespace App\Http\Controller;

use App\Persistence\Entity\Users;
use App\Persistence\Repository\UsersRepository;
use App\Service\MailerService;
use App\Service\ValidatorBaseService;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class AuthController extends AbstractController
{
    public function __construct(
        private MailerService               $mailerService,
        private UsersRepository             $usersRepository,
        private EntityManagerInterface      $entityManager,
        private SerializerInterface         $serializer,
        private UserPasswordHasherInterface $passwordHasher,
        private JWTTokenManagerInterface    $jwtManager,
        private ValidatorBaseService        $validatorBaseService,
    )
    {
    }

    #[Route('/api/user/signup', methods: ['POST'])]
    public function signup(Request $request): JsonResponse
    {
        $data = $request->getContent();
        $user = $this->serializer->deserialize($data, Users::class, 'json');
        $user->setIsEmailVerified(false);
        $user->setStudent(true);
        $user->setTeacher(false);

        $verificationCode = random_int(100000, 999999);
        $user->setEmailVerificationCode($verificationCode);

        $subject = 'Vérification de votre adresse email';
        $content = "Votre code de vérification est : $verificationCode";

        if (!$this->mailerService->sendEmail($subject, $content, $user->getEmail())) {
            return new JsonResponse(["error" => 'internal serveur error'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $errors = $this->validatorBaseService->CatchInvalidData($user);

        if($errors) {
            return new JsonResponse(['error' => $errors], Response::HTTP_BAD_REQUEST);
        }

        if($this->usersRepository->findOneBy(['email' => $user->getEmail()])) {
            return new JsonResponse(['error' => 'L\'adresse email est déjà utilisé.'], Response::HTTP_BAD_REQUEST);
        }

        $hashedPassword = $this->passwordHasher->hashPassword($user, $user->getPassword());
        $user->setPassword($hashedPassword);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $token = $this->jwtManager->create($user);
        return new JsonResponse(['token' => $token], Response::HTTP_CREATED);
    }

    #[Route('/api/user/signin', methods: ['POST'])]
    public function auth_signin(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!isset($data['email'])) {
            return new JsonResponse(['error' => 'Le mail est requis pour se connecter.'], JsonResponse::HTTP_BAD_REQUEST);
        }
        $email = $data['email'];
        $user = $this->usersRepository->findOneBy(['email' => $email]);

        if (!$user || !$this->passwordHasher->isPasswordValid($user, $data['password'])) {
            return new JsonResponse(['error' => 'Le mail ou le mot de passe est incorrect.'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $token = $this->jwtManager->create($user);
        return new JsonResponse(['token' => $token], JsonResponse::HTTP_OK);
    }

}
