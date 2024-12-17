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
        
        $payload['name'] = $user->getName();
        $payload['firstname'] = $user->getFirstName();
        $payload['avatar_url'] = $user->getAvatarUrl();
        $payload['roles'] = $user->getRoles();
        $payload['email'] = $user->getEmail();
        $payload['github_login'] = $user->getGithubLogin() || '';
        $payload['dribbble_login'] = $user->getDribbbleLogin() || '';
        
        $event->setData($payload);
    }
}