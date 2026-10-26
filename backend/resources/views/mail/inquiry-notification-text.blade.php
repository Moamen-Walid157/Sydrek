New Sydrek brief

{{ $inquiry->name }} sent a {{ $inquiry->interest }} brief through the Sydrek site.

Name: {{ $inquiry->name }}
Email: {{ $inquiry->email }}
Phone: {{ $inquiry->phone }}
Interest: {{ $inquiry->interest }}
Reference: {{ str_pad((string) $inquiry->id, 4, '0', STR_PAD_LEFT) }}

Message:
{{ $inquiry->message }}

Reply: {{ $inquiry->email }}
WhatsApp: https://wa.me/{{ preg_replace('/\D/', '', (string) $inquiry->phone) }}

sydrek.com
info@sydrek.com
+20 109 232 2282
