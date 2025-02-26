<?php
namespace App\Http\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class UserDTO
{
    #[Assert\NotBlank(message: "Le nom est requis.")]
    #[Assert\Regex(
        pattern: '/^[\p{L}\s]+$/u',
        message: 'Le nom doit contenir uniquement des lettres et des espaces.'
    )]
    public ?string $lastname = null;

    #[Assert\NotBlank(message: "Le prénom est requis.")]
    #[Assert\Regex(
        pattern: '/^[\p{L}\s]+$/u',
        message: 'Le prénom doit contenir uniquement des lettres et des espaces.'
    )]
    public ?string $firstname = null;

    #[Assert\NotBlank(message: "L'adresse email est requise.")]
    #[Assert\Email(message: "Le format de l'adresse email est invalide.")]
    public ?string $email = null;

    #[Assert\NotBlank(message: "Le mot de passe est requis.")]
    #[Assert\Length(
        min: 8,
        minMessage: "Le mot de passe doit avoir au moins {{ limit }} caractères."
    )]
    public ?string $password = null;
}