<?php
namespace App\Service;

use Symfony\Component\Validator\ConstraintViolationListInterface;

class ValidatorBaseService
{
    public function CatchInvalidData(ConstraintViolationListInterface $errors): void
    {
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }

            throw new \InvalidArgumentException(implode(", ", $errorMessages));
        }
    }

}