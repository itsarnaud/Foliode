<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Repository\UsersRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class AuthController extends AbstractController
{

    #[Route('/api/auth/student/signup', name: 'auth_student_signup', methods: ['POST'])]
    public function auth_student_signup(
        Request $request,
        SerializerInterface $serializer,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher,
        MailerInterface $mailer
    ): JsonResponse {

        try {
            $user = $serializer->deserialize($request->getContent(), Users::class, 'json');
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Invalid data format.'], Response::HTTP_BAD_REQUEST);
        }

        $user->setStudent(true);
        $user->setTeacher(false);

        if ($user->getPassword()) {
            $hashedPassword = $passwordHasher->hashPassword($user, $user->getPassword());
            $user->setPassword($hashedPassword);
        } else {
            return new JsonResponse(['error' => 'Password is required.'], Response::HTTP_BAD_REQUEST);
        }

        $user->setIsEmailVerified(false);

        $verificationCode = random_int(100000, 999999);
        $user->setEmailVerificationCode($verificationCode);

        $emailMessage = (new Email())
            ->from('no-reply@foliode.com')
            ->to($user->getEmail())
            ->subject('Vérification de votre adresse email')
            ->text("Votre code de vérification est : $verificationCode");

        $mailer->send($emailMessage);

        $em->persist($user);
        $em->flush();

        $jsonUser = $serializer->serialize($user, 'json', ['groups' => 'getUsers']);
        return new JsonResponse($jsonUser, Response::HTTP_CREATED, [], true);
    }

    #[Route('/api/auth', name: 'auth_login', methods: ['POST'])]
    public function auth_signin(
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
        UsersRepository $usersRepository,
        JWTTokenManagerInterface $jwtManager
    ): JsonResponse {
    
        $data = json_decode($request->getContent(), true);
        if (!isset($data['email'])) {
            return new JsonResponse(['error' => 'Email is required'], JsonResponse::HTTP_BAD_REQUEST);
        }
    
        $email = $data['email'];
        $user = $usersRepository->findOneBy(['email' => $email]);
    
        if (!$user || !$passwordHasher->isPasswordValid($user, $data['password'])) {
            return new JsonResponse(['error' => 'incorrect user or password'], JsonResponse::HTTP_UNAUTHORIZED);
        }
        $token = $jwtManager->create($user);
    
        return new JsonResponse(['token' => $token], JsonResponse::HTTP_OK);
    }
}
