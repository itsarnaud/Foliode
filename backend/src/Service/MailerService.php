<?php

namespace App\Service;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;

class MailerService
{
    private MailerInterface $mailer;

    public function __construct(
        MailerInterface $mailInterface
    )
    {
        $this->mailer = $mailInterface;
    }

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