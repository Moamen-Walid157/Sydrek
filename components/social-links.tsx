import { socials } from "@/lib/content";
import { cn } from "@/lib/utils";

const links = [
  { href: socials.facebook, label: "Facebook", icon: FacebookIcon },
  { href: socials.instagram, label: "Instagram", icon: InstagramIcon },
  { href: socials.whatsapp, label: "WhatsApp", icon: WhatsAppIcon },
] as const;

export function SocialLinks({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          data-cursor
          className={cn(
            "grid size-10 place-items-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-fg hover:shadow-[0_10px_24px_-16px_rgba(37,99,255,0.8)]",
            light ? "border-white/20 text-white/75 hover:bg-white/10 hover:text-white" : "hover:bg-white/10 dark:hover:bg-white/8",
          )}
        >
          <link.icon />
        </a>
      ))}
    </div>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M14.5 8.5V6.8c0-.8.5-1 .9-1h1.6V3.2h-2.2c-2.5 0-4.1 1.7-4.1 4.1v1.2H9v2.7h1.7V21h3.8v-9.8h2.4l.4-2.7h-2.8z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M12.04 3.2A8.8 8.8 0 0 0 3.9 16.3L3 21l4.8-.9A8.8 8.8 0 1 0 12.04 3.2zm5.1 12.5c-.22.62-1.28 1.18-1.78 1.26-.46.07-1.04.1-1.68-.1-.39-.13-.88-.3-1.52-.58-2.67-1.16-4.4-3.85-4.54-4.03-.13-.18-1.1-1.46-1.1-2.78 0-1.32.69-1.97.93-2.24.24-.27.53-.34.7-.34h.51c.16 0 .38-.06.6.46.22.54.75 1.85.82 1.98.07.13.1.29.02.46-.08.18-.13.29-.25.45-.13.16-.27.35-.38.47-.13.13-.26.27-.11.53.16.27.7 1.15 1.5 1.86 1.04.92 1.91 1.2 2.18 1.34.27.13.43.11.59-.07.16-.18.68-.8.86-1.07.18-.27.36-.22.6-.13.24.08 1.53.72 1.79.85.26.13.44.2.5.31.07.11.07.64-.15 1.26z" />
    </svg>
  );
}
