<?php

namespace Tests\Feature;

use App\Mail\InquiryConfirmation;
use App\Mail\InquiryNotification;
use App\Models\Inquiry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class InquiryTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_brief_is_stored_and_both_emails_are_sent(): void
    {
        Mail::fake();

        $response = $this->postJson('/api/inquiries', $this->payload());

        $response->assertCreated()->assertJsonPath('message', 'Received. We will reply shortly.');
        $this->assertDatabaseCount('inquiries', 1);
        Mail::assertSent(InquiryNotification::class, function (InquiryNotification $mail) {
            return $mail->hasTo('sydrek26@gmail.com');
        });
        Mail::assertSent(InquiryConfirmation::class, function (InquiryConfirmation $mail) {
            return $mail->hasTo('ada@example.com');
        });

        $inquiry = Inquiry::query()->firstOrFail();
        $notice = (new InquiryNotification($inquiry))->render();
        $confirm = (new InquiryConfirmation($inquiry))->render();

        $this->assertStringContainsString('https://sydrek.com/brand/email-signature.png', $notice);
        $this->assertStringContainsString('Ada Lovelace', $notice);
        $this->assertStringContainsString('+20 100 555 0199', $notice);
        $this->assertStringContainsString('#2563FF', $notice);
        $this->assertStringContainsString('https://sydrek.com/brand/email-signature.png', $confirm);
        $this->assertStringContainsString('We have your brief', $confirm);
    }

    public function test_a_filled_honeypot_is_ignored(): void
    {
        Mail::fake();

        $response = $this->postJson('/api/inquiries', $this->payload([
            'website' => 'https://spam.example',
        ]));

        $response->assertOk();
        $this->assertDatabaseCount('inquiries', 0);
        Mail::assertNothingSent();
    }

    public function test_a_short_message_is_rejected(): void
    {
        $response = $this->postJson('/api/inquiries', $this->payload([
            'message' => 'Too short',
        ]));

        $response->assertUnprocessable();
        $this->assertDatabaseCount('inquiries', 0);
    }

    /**
     * @param  array<string, string>  $overrides
     * @return array<string, string>
     */
    private function payload(array $overrides = []): array
    {
        return array_merge([
            'name' => 'Ada Lovelace',
            'email' => 'ada@example.com',
            'phone' => '+20 100 555 0199',
            'interest' => 'CRM',
            'message' => 'We need a CRM that the sales team will actually open each morning.',
        ], $overrides);
    }
}
