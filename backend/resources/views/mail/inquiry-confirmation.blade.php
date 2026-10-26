@extends('mail.layout')

@section('title', 'Sydrek received your brief')

@section('preheader')
Sydrek received your {{ $inquiry->interest }} brief. We will reply at {{ $inquiry->email }}.
@endsection

@section('body')
    @php
        $reference = str_pad((string) $inquiry->id, 4, '0', STR_PAD_LEFT);
    @endphp

    <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:16px;font-weight:bold;letter-spacing:1.6px;color:#2563FF;">BRIEF RECEIVED · {{ $reference }}</div>
    <div style="padding-top:10px;font-family:Arial,Helvetica,sans-serif;font-size:30px;line-height:36px;font-weight:bold;color:#0B1220;">We have your brief</div>
    <p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:26px;color:#3D4A5C;">
        Hello {{ $inquiry->name }}, Sydrek received your note about <strong style="color:#0B1220;">{{ $inquiry->interest }}</strong>. A person on the team will reply at {{ $inquiry->email }}.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
        <tr>
            <td width="33%" valign="top" bgcolor="#070B1A" style="width:33%;background-color:#070B1A;padding:16px 12px;border-radius:14px 0 0 14px;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:14px;font-weight:bold;letter-spacing:1.2px;color:#22D3EE;">01</div>
                <div style="padding-top:8px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:18px;font-weight:bold;color:#FFFFFF;">Received</div>
                <div style="padding-top:4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:17px;color:#C5D4EA;">Your note is in.</div>
            </td>
            <td width="34%" valign="top" bgcolor="#10203F" style="width:34%;background-color:#10203F;padding:16px 12px;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:14px;font-weight:bold;letter-spacing:1.2px;color:#8FB4FF;">02</div>
                <div style="padding-top:8px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:18px;font-weight:bold;color:#FFFFFF;">Review</div>
                <div style="padding-top:4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:17px;color:#C5D4EA;">We read the brief.</div>
            </td>
            <td width="33%" valign="top" bgcolor="#163056" style="width:33%;background-color:#163056;padding:16px 12px;border-radius:0 14px 14px 0;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:14px;font-weight:bold;letter-spacing:1.2px;color:#8FB4FF;">03</div>
                <div style="padding-top:8px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:18px;font-weight:bold;color:#FFFFFF;">Reply</div>
                <div style="padding-top:4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:17px;color:#C5D4EA;">A first slice, not a deck.</div>
            </td>
        </tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:22px;border:1px solid #D5DEEA;border-radius:16px;">
        <tr>
            <td bgcolor="#F7F9FD" style="background-color:#F7F9FD;padding:16px 18px;border-bottom:1px solid #D5DEEA;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:14px;font-weight:bold;letter-spacing:1.2px;color:#5B677A;">WHAT YOU SENT</div>
            </td>
        </tr>
        <tr>
            <td style="padding:4px 18px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td width="110" valign="top" style="width:110px;padding:12px 12px 12px 0;border-bottom:1px solid #E2E8F0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#5B677A;">Interest</td>
                        <td valign="top" style="padding:12px 0;border-bottom:1px solid #E2E8F0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;font-weight:bold;color:#0B1220;">{{ $inquiry->interest }}</td>
                    </tr>
                    <tr>
                        <td width="110" valign="top" style="width:110px;padding:12px 12px 12px 0;border-bottom:1px solid #E2E8F0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#5B677A;">Phone</td>
                        <td valign="top" style="padding:12px 0;border-bottom:1px solid #E2E8F0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;font-weight:bold;color:#0B1220;">{{ $inquiry->phone }}</td>
                    </tr>
                    <tr>
                        <td width="110" valign="top" style="width:110px;padding:12px 12px 12px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#5B677A;">Note</td>
                        <td valign="top" style="padding:12px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;color:#0B1220;">{!! nl2br(e($inquiry->message)) !!}</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    <p style="margin:22px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#3D4A5C;">
        If a detail should change, reply to this email. Or reach the studio on WhatsApp.
    </p>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;">
        <tr>
            <td valign="middle" style="padding:0 10px 10px 0;">
                @include('mail.partials.button', [
                    'href' => 'https://sydrek.com',
                    'label' => 'Visit sydrek.com',
                ])
            </td>
            <td valign="middle" style="padding:0 0 10px 0;">
                @include('mail.partials.button', [
                    'href' => 'https://wa.me/201092322282',
                    'label' => 'WhatsApp Sydrek',
                    'variant' => 'whatsapp',
                ])
            </td>
        </tr>
    </table>
@endsection
