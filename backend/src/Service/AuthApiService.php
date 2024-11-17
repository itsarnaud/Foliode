<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;

class AuthApiService
{
    private HttpClientInterface $httpClient;

    public function __construct(HttpClientInterface $httpClient)
    {
        $this->httpClient = $httpClient;
    }

    public function getGithubUser(string $token): ?array
    {
        try {
            $response = $this->httpClient->request('GET', 'https://api.github.com/user', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $token,
                    'Accept' => 'application/vnd.github.v3+json',
                ],
            ]);
            return $response->toArray();
        } catch (ClientExceptionInterface |
        RedirectionExceptionInterface |
        ServerExceptionInterface |
        TransportExceptionInterface |
        DecodingExceptionInterface
        $e) {
            return null;
        }
    }

    public function getDribbbleUser(string $token): ?array
    {
        try {
            $response = $this->httpClient->request('GET', 'https://api.dribbble.com/v2/user', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $token,
                ],
            ]);
            return $response->toArray();
        } catch (ClientExceptionInterface |
        RedirectionExceptionInterface |
        ServerExceptionInterface |
        TransportExceptionInterface |
        DecodingExceptionInterface
        $e) {
            return null;
        }
    }
}
