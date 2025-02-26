<?php

namespace App\Http\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class PortfolioDTO
{
    #[Assert\NotBlank]
    #[Assert\Length(max: 255, maxMessage: "Le titre ne peut pas dépasser 255 caractères.")]
    public string $title;

    #[Assert\NotBlank]
    #[Assert\Regex(
        pattern: '/^[a-z0-9_-]+$/',
        message: 'L’URL doit contenir uniquement des lettres minuscules, des chiffres, des underscores ou des tirets.'
    )]
    public string $url;

    #[Assert\Length(max: 255, maxMessage: "Le sous-titre ne peut pas dépasser 255 caractères.")]
    public ?string $subtitle = null;

    public ?string $bio = null;

    #[Assert\Type(type: 'array', message: 'La configuration doit être un tableau JSON valide.')]
    public ?array $config = null;

    #[Assert\Length(max: 255, maxMessage: "Le template ne peut pas dépasser 255 caractères.")]
    public ?string $template = null;

}
