<?php

namespace App\Http\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class ProjectDTO {

    #[Assert\NotBlank(message: "The name is required.")]
    #[Assert\Length(max: 255, maxMessage: "title cannot exceed 255 characters")]
    public string $title;

    public ?string $description = null;

    #[Assert\All([
        new Assert\Collection([
            'src' => new Assert\Url(message: "Each image must have a valid URL."),
            'alt' => new Assert\Length(max: 255, maxMessage: "The alt text cannot exceed 255 characters.")
        ])
    ])]
    public array $projectsImages = [];

    #[Assert\All([
        new Assert\Url(message: "Each project link must be a valid URL.")
    ])]
    public array $projectsLinks = [];

}