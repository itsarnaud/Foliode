<?php

namespace App\Service;

use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\String\ByteString;

class FileUploaderService
{
    public function __construct(private Filesystem $filesystem) {}

    public function uploadFile(UploadedFile $file, string $directory): string
    {

        if (!$file->isValid()) {
            throw new \InvalidArgumentException(" Invalid file upload ");
        }

        $fileName = $this->generateRandomString() . '.' . $file->guessExtension();

        try {
            $file->move($directory, $fileName);
        } catch (\Exception $e) {
            throw new \InvalidArgumentException(" Failed to upload file  ");
        }

        $relativePath = $this->getRelativePath($directory);

        return $relativePath . '/' .  $fileName;
    }

    public function deleteFile(string $filePath): void
    {
        if ($this->filesystem->exists($filePath)) {
            $this->filesystem->remove($filePath);
        }
    }

    private function generateRandomString(): string
    {
        return ByteString::fromRandom(25, 'abcdefghijklmnopqrstuvwxyz0123456789');
    }

    private function getRelativePath(string $path): ?string
    {
        $keyword = 'uploads';
        $position = strpos($path, $keyword);
        if ($position !== false) {
            return substr($path, $position);
        }
        return null;
    }
}
