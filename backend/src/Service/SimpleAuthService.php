<?php

namespace App\Service;

use App\Entity\Users;
use App\Repository\UsersRepository;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;


class SimpleAuthService extends ValidatorBaseService
{
    private MailerService $mailerService;
    private UsersRepository $usersRepository;
    private EntityManagerInterface $entityManager;
    private ValidatorInterface $validator;
    private SerializerInterface $serializer;
    private UserPasswordHasherInterface $passwordHasher;
    private JWTTokenManagerInterface $jwtManager;


    public function __construct(
        UsersRepository $usersRepository,
        EntityManagerInterface $entityManager,
        ValidatorInterface $validator,
        SerializerInterface $serializer,
        UserPasswordHasherInterface $passwordHasher,
        MailerService $mailer,
        JWTTokenManagerInterface $jwtManager,
    )
    {
        $this->usersRepository = $usersRepository;
        $this->entityManager = $entityManager;
        $this->validator = $validator;
        $this->serializer = $serializer;
        $this->passwordHasher = $passwordHasher;
        $this->mailerService = $mailer;
        $this->jwtManager = $jwtManager;
    }

    public function registerUser(string $user) : string
    {
        $user = $this->serializer->deserialize($user, Users::class, 'json');
        $user->setIsEmailVerified(false);
        $user->setStudent(true);
        $user->setTeacher(false);

        $verificationCode = random_int(100000, 999999);
        $user->setEmailVerificationCode($verificationCode);

        $subject = 'Vérification de votre adresse email';
        $content = "Votre code de vérification est : $verificationCode";

        if(!$this->mailerService->sendEmail($subject, $content, $user->getEmail())){
            throw new \InvalidArgumentException('internal serveur error');
        }

        $errors = $this->validator->validate($user);
        $this->CatchInvalidData($errors);

        $hashedPassword = $this->passwordHasher->hashPassword($user, $user->getPassword());
        $user->setPassword($hashedPassword);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->serializer->serialize($user, 'json', ['groups' => 'getUsers']);
    }

    public function authUser(array $data) : string
    {
        $email = $data['email'];
        $user = $this->usersRepository->findOneBy(['email' => $email]);

        if (!$user || !$this->passwordHasher->isPasswordValid($user, $data['password'])) {
            throw new \InvalidArgumentException('incorrect user or password');
        }

        return $this->jwtManager->create($user);
    }

    public  function checkEmail(Array $data) : string
    {
        $mailcheck_code = $data['code'] ?? null;
        $email = $data['email'] ?? null;

        $user = $this->usersRepository->findOneBy(['email' => $email]);
        if (!$user) {
            throw new \InvalidArgumentException('User not found');
        }

        if ($mailcheck_code !== $user->getEmailVerificationCode()) {
            throw new \InvalidArgumentException('Incorrect email or code');
        }

        $user->setEmailVerificationCode(null);
        $user->setIsEmailVerified(true);

        $this->entityManager->flush();

        return $this->jwtManager->create($user);
    }

}