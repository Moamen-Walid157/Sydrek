<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInquiryRequest;
use App\Mail\InquiryConfirmation;
use App\Mail\InquiryNotification;
use App\Models\Inquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;

class InquiryController extends Controller
{
    public function store(StoreInquiryRequest $request): JsonResponse
    {
        if (filled($request->input('website'))) {
            return response()->json([
                'message' => 'Received. We will reply shortly.',
            ]);
        }

        $inquiry = Inquiry::query()->create([
            'name' => $request->string('name')->trim()->toString(),
            'email' => $request->string('email')->trim()->toString(),
            'phone' => $request->string('phone')->trim()->toString(),
            'interest' => $request->string('interest')->toString(),
            'message' => $request->string('message')->trim()->toString(),
            'ip' => $request->ip(),
            'user_agent' => substr((string) $request->userAgent(), 0, 512),
        ]);

        $notify = (string) config('mail.inquiry_notify');

        Mail::to($notify)->send(new InquiryNotification($inquiry));
        Mail::to($inquiry->email)->send(new InquiryConfirmation($inquiry));

        return response()->json([
            'message' => 'Received. We will reply shortly.',
        ], 201);
    }
}
