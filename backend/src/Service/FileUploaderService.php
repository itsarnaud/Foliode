<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\String\ByteString;

class FileUploaderService
{

    public function uploadFile(UploadedFile $file, string $directory): string
    {

        if (!$file->isValid()) {
            throw new \InvalidArgumentException(" Invalid file upload ");
        }

        $fileName = $this->generateRandomString() . $file->guessExtension();

        try {
            $file->move($directory, $fileName);
        } catch (\Exception $e) {
            throw new \InvalidArgumentException(" Failed to upload file  ");
        }

        return $directory . $fileName;
    }

    private function generateRandomString(): string
    {
        return ByteString::fromRandom(25, 'abcdefghijklmnopqrstuvwxyz0123456789');
    }

}