"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { interests } from "@/lib/content";
import { isInterest, toolLabel } from "@/lib/tools";

const schema = z.object({
  name: z.string().min(2, "Tell us your name."),
  email: z.string().email("Use a real email."),
  phone: z
    .string()
    .trim()
    .min(7, "Add a phone number.")
    .max(30, "That phone number is too long.")
    .regex(/^\+?[0-9][0-9\s().-]{5,28}$/, "Use a phone number with digits."),
  interest: z.enum(interests),
  message: z.string().min(20, "Give us at least a sentence of context.").max(5000, "Keep the note under 5,000 characters."),
  website: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  return (
    <Suspense fallback={<div className="glass min-h-80 rounded-[28px]" aria-hidden />}>
      <ContactFormFields />
    </Suspense>
  );
}

function ContactFormFields() {
  const params = useSearchParams();
  const interestParam = params.get("interest");
  const interest = isInterest(interestParam) ? interestParam : "Websites";
  const message = (params.get("message") ?? "").slice(0, 5000);
  const fromTool = toolLabel(params.get("tool"));
  const briefKey = `${params.get("tool") ?? ""}|${interest}|${message}`;
  const skipReset = useRef(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { interest: "Websites", message: "" },
  });

  useEffect(() => {
    if (!fromTool || skipReset.current) return;
    reset({ name: "", email: "", phone: "", interest, message, website: "" });
  }, [briefKey, fromTool, interest, message, reset]);

  return (
    <form
      className="glass relative grid gap-4 rounded-[28px] p-6 md:p-8"
      onSubmit={handleSubmit(async (values) => {
        const endpoint = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
        if (!endpoint) {
          toast.error("The form is not connected yet.");
          return;
        }

        try {
          const response = await fetch(`${endpoint}/api/inquiries`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          const data = (await response.json().catch(() => null)) as {
            message?: string;
            errors?: Record<string, string[]>;
          } | null;

          if (!response.ok) {
            const first = data?.errors ? Object.values(data.errors).flat()[0] : data?.message;
            toast.error(first || "Could not send the brief. Try again in a moment.");
            return;
          }

          toast.success(`Received, ${values.name}. We'll reply at ${values.email}.`);
          skipReset.current = true;
          reset({ name: "", email: "", phone: "", interest: "Websites", message: "", website: "" });
        } catch {
          toast.error("Could not reach Sydrek. Check your connection and try again.");
        }
      })}
      noValidate
    >
      {fromTool && (
        <p className="rounded-2xl border border-line bg-[#2563ff]/10 px-4 py-3 text-sm">
          Your {fromTool} is in the message. Add your name and phone, then send it.
        </p>
      )}
      <Field label="Name" error={errors.name?.message}>
        <input className="field" {...register("name")} autoComplete="name" />
      </Field>
      <Field label="Email" error={errors.email?.message}>
        <input className="field" type="email" {...register("email")} autoComplete="email" />
      </Field>
      <Field label="Phone number" error={errors.phone?.message}>
        <input className="field" type="tel" inputMode="tel" {...register("phone")} autoComplete="tel" />
      </Field>
      <Field label="Interest" error={errors.interest?.message}>
        <select className="field" {...register("interest")}>
          {interests.map((interest) => (
            <option key={interest}>{interest}</option>
          ))}
        </select>
      </Field>
      <Field label="What are you building?" error={errors.message?.message}>
        <textarea className="field min-h-32 resize-y" {...register("message")} />
      </Field>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
        {...register("website")}
      />
      <button type="submit" className="btn btn-primary mt-2" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send the brief"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span>{label}</span>
      {children}
      {error && <span className="text-xs text-bad">{error}</span>}
    </label>
  );
}
