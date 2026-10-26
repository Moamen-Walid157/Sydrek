@php
    $variant = $variant ?? 'primary';
    $palettes = [
        'primary' => ['bg' => '#2563FF', 'color' => '#FFFFFF', 'border' => '#2563FF'],
        'dark' => ['bg' => '#070B1A', 'color' => '#FFFFFF', 'border' => '#070B1A'],
        'whatsapp' => ['bg' => '#128C7E', 'color' => '#FFFFFF', 'border' => '#0E6B61'],
    ];
    $palette = $palettes[$variant] ?? $palettes['primary'];
@endphp
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0;">
    <tr>
        <td align="center" bgcolor="{{ $palette['bg'] }}" style="background-color:{{ $palette['bg'] }};border:1px solid {{ $palette['border'] }};border-radius:12px;">
            <a href="{{ $href }}" style="display:inline-block;padding:14px 26px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:20px;font-weight:bold;color:{{ $palette['color'] }};text-decoration:none;border-radius:12px;">{{ $label }}</a>
        </td>
    </tr>
</table>
