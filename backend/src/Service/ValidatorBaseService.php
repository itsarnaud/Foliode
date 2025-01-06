<?php

namespace App\Service;

use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Validator\ConstraintViolationListInterface;

class ValidatorBaseService
{
   
    public function __construct( private ValidatorInterface $validator)
    {}

    public function CatchInvalidData(object $data): ?array
    {
        $errors = $this->validator->validate($data);

        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }

            return $errorMessages;
        }

        return null;
    }
}
