"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Tell us your name."),
  email: z.string().email("Use a real email."),
  company: z.string().min(2, "Add a company or team."),
  interest: z.enum(["Platform", "Cloud", "Security", "Data", "Not sure"]),
  message: z.string().min(20, "Give us at least a sentence of context."),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { interest: "Platform" },
  });

  return (
    <form
      className="glass grid gap-4 rounded-[28px] p-6 md:p-8"
      onSubmit={handleSubmit(async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        toast.success(`Received, ${values.name}. We'll reply at ${values.email}.`);
        reset();
      })}
      noValidate
    >
      <Field label="Name" error={errors.name?.message}>
        <input className="field" {...register("name")} autoComplete="name" />
      </Field>
      <Field label="Email" error={errors.email?.message}>
        <input className="field" type="email" {...register("email")} autoComplete="email" />
      </Field>
      <Field label="Company" error={errors.company?.message}>
        <input className="field" {...register("company")} autoComplete="organization" />
      </Field>
      <Field label="Interest" error={errors.interest?.message}>
        <select className="field" {...register("interest")}>
          <option>Platform</option>
          <option>Cloud</option>
          <option>Security</option>
          <option>Data</option>
          <option>Not sure</option>
        </select>
      </Field>
      <Field label="What should stay standing?" error={errors.message?.message}>
        <textarea className="field min-h-32 resize-y" {...register("message")} />
      </Field>
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
