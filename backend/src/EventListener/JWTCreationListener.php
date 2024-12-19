<?php

namespace App\EventListener;

use App\Entity\Users;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTCreationListener 
{
    public function onJWTCreated(JWTCreatedEvent $event): void
    {
        /** @var Users $user */
        $user = $event->getUser();
        $payload = $event->getData();
        
        $payload['full_name'] = $user->getFullName();
        $payload['avatar_url'] = $user->getAvatarUrl();
        $payload['roles'] = $user->getRoles();
        $payload['email'] = $user->getEmail();
        $payload['github_login'] = $user->getGithubLogin() ?? null;
        $payload['dribbble_login'] = $user->getDribbbleLogin() ?? null;
        
        $event->setData($payload);
    }
}