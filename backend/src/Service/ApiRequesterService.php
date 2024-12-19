<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;

class ApiRequesterService
{
    public function __construct(private HttpClientInterface $httpClient)
    {}

    public function get(string $url, array $header): ?array
    {
        try {
            $response = $this->httpClient->request('GET', $url, [
                'headers' => $header
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