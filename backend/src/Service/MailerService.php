<?php

namespace App\Service;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;

class MailerService
{


    public function __construct(
        private MailerInterface $mailer
    )
    {}

    public function sendEmail(string $subject, string $content, string $recipient): bool
    {
        $emailMessage = (new Email())
            ->from('no-reply@localhost')
            ->to($recipient)
            ->subject($subject)
            ->text($content);

        try {
            $this->mailer->send($emailMessage);
        } catch (TransportExceptionInterface $e) {
            return false;
        }

        return true;
    }

}