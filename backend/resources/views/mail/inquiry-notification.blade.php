@extends('mail.layout')

@section('title', 'New Sydrek brief')

@section('preheader')
{{ $inquiry->name }} sent a {{ $inquiry->interest }} brief. Phone {{ $inquiry->phone }}.
@endsection

@section('body')
    @php
        $digits = preg_replace('/\D/', '', (string) $inquiry->phone);
        $whatsapp = $digits !== '' ? 'https://wa.me/'.$digits : null;
        $received = $inquiry->created_at?->timezone('Africa/Cairo')->format('j M Y, H:i');
        $reference = str_pad((string) $inquiry->id, 4, '0', STR_PAD_LEFT);
    @endphp

    <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:16px;font-weight:bold;letter-spacing:1.6px;color:#2563FF;">NEW BRIEF · {{ $reference }}</div>
    <div style="padding-top:10px;font-family:Arial,Helvetica,sans-serif;font-size:30px;line-height:36px;font-weight:bold;color:#0B1220;">{{ $inquiry->name }}</div>
    <p style="margin:12px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:24px;color:#3D4A5C;">
        A {{ $inquiry->interest }} brief just landed on the Sydrek site. Reply goes straight to them.
    </p>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;">
        <tr>
            <td bgcolor="#E8EFFF" style="background-color:#E8EFFF;border-radius:999px;padding:7px 12px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:16px;font-weight:bold;letter-spacing:0.4px;color:#2563FF;">
                {{ $inquiry->interest }}
            </td>
        </tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:22px;border:1px solid #D5DEEA;border-radius:16px;">
        <tr>
            <td width="50%" valign="top" bgcolor="#F7F9FD" style="width:50%;background-color:#F7F9FD;padding:16px 16px 14px;border-bottom:1px solid #D5DEEA;border-right:1px solid #D5DEEA;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:14px;font-weight:bold;letter-spacing:1.2px;color:#5B677A;">NAME</div>
                <div style="padding-top:6px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;font-weight:bold;color:#0B1220;">{{ $inquiry->name }}</div>
            </td>
            <td width="50%" valign="top" bgcolor="#F7F9FD" style="width:50%;background-color:#F7F9FD;padding:16px 16px 14px;border-bottom:1px solid #D5DEEA;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:14px;font-weight:bold;letter-spacing:1.2px;color:#5B677A;">PHONE</div>
                <div style="padding-top:6px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;font-weight:bold;color:#0B1220;">
                    @if ($digits !== '')
                        <a href="tel:+{{ $digits }}" style="color:#2563FF;text-decoration:none;">{{ $inquiry->phone }}</a>
                    @else
                        {{ $inquiry->phone }}
                    @endif
                </div>
            </td>
        </tr>
        <tr>
            <td width="50%" valign="top" style="width:50%;padding:16px 16px 14px;border-right:1px solid #D5DEEA;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:14px;font-weight:bold;letter-spacing:1.2px;color:#5B677A;">EMAIL</div>
                <div style="padding-top:6px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:#0B1220;">
                    <a href="mailto:{{ $inquiry->email }}" style="color:#2563FF;text-decoration:none;">{{ $inquiry->email }}</a>
                </div>
            </td>
            <td width="50%" valign="top" style="width:50%;padding:16px 16px 14px;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:14px;font-weight:bold;letter-spacing:1.2px;color:#5B677A;">INTEREST</div>
                <div style="padding-top:6px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;font-weight:bold;color:#0B1220;">{{ $inquiry->interest }}</div>
            </td>
        </tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;">
        <tr>
            <td bgcolor="#F4F7FB" style="background-color:#F4F7FB;border-left:4px solid #22D3EE;padding:18px 18px 20px;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:16px;font-weight:bold;letter-spacing:1.4px;color:#2563FF;">THE BRIEF</div>
                <div style="padding-top:10px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;color:#0B1220;">{!! nl2br(e($inquiry->message)) !!}</div>
            </td>
        </tr>
    </table>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:26px;">
        <tr>
            <td valign="middle" style="padding:0 10px 10px 0;">
                @include('mail.partials.button', [
                    'href' => 'mailto:'.$inquiry->email.'?subject='.rawurlencode('Re: '.$inquiry->interest),
                    'label' => 'Reply to '.$inquiry->name,
                ])
            </td>
            @if ($whatsapp)
                <td valign="middle" style="padding:0 0 10px 0;">
                    @include('mail.partials.button', [
                        'href' => $whatsapp,
                        'label' => 'WhatsApp',
                        'variant' => 'whatsapp',
                    ])
                </td>
            @endif
        </tr>
    </table>

    @if ($received)
        <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#5B677A;">
            Received {{ $received }} Cairo time · Reference {{ $reference }}
        </p>
    @endif
@endsection
