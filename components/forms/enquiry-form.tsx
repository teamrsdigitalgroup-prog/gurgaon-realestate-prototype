"use client";

import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useBroker } from "@/components/broker/broker-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"name" | "phone", string>>;

export function EnquiryForm({
  context,
  className,
  compact = false,
}: {
  /** Shown back to the user on success, e.g. the property title. */
  context?: string;
  className?: string;
  compact?: boolean;
}) {
  const broker = useBroker();
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState({
    name: "",
    phone: "",
    message: context ? `I would like to schedule a visit to ${context}.` : "",
  });

  function validate(): boolean {
    const next: Errors = {};
    if (values.name.trim().length < 2) {
      next.name = "Please enter your name";
    }
    if (!/^[6-9]\d{9}$/.test(values.phone.replace(/\D/g, ""))) {
      next.phone = "Enter a 10-digit Indian mobile number";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    // No backend in this prototype; the pause stands in for the network call.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-brand-border bg-brand-soft p-6 text-center",
          className,
        )}
        role="status"
      >
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-brand text-brand-ink">
          <CheckCircle2 className="size-6" aria-hidden />
        </span>
        <h3 className="mt-4 font-heading text-lg font-semibold">
          Enquiry sent to {broker.name}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {values.name.split(" ")[0]}, your details are with us. Expect a call on{" "}
          {values.phone.replace(/\D/g, "")} within two working hours
          {context ? ` about ${context}` : ""}.
        </p>
        <Button
          variant="outline"
          className="mt-5 border-brand-border text-brand hover:bg-brand-muted"
          onClick={() => {
            setValues({ name: "", phone: "", message: "" });
            setStatus("idle");
          }}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn("flex flex-col gap-4", className)}
    >
      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <Field
          id="enquiry-name"
          label="Your name"
          error={errors.name}
          value={values.name}
          onChange={(value) => setValues((v) => ({ ...v, name: value }))}
          placeholder="Rahul Verma"
          autoComplete="name"
        />
        <Field
          id="enquiry-phone"
          label="Mobile number"
          error={errors.phone}
          value={values.phone}
          onChange={(value) => setValues((v) => ({ ...v, phone: value }))}
          placeholder="98765 43210"
          inputMode="tel"
          autoComplete="tel"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="enquiry-message">Message</Label>
        <Textarea
          id="enquiry-message"
          rows={compact ? 3 : 4}
          value={values.message}
          onChange={(event) =>
            setValues((v) => ({ ...v, message: event.target.value }))
          }
          placeholder="Tell us your budget, preferred locality and when you would like to visit."
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === "sending"}
        className="h-auto min-h-11 w-full whitespace-normal bg-brand py-3 text-center text-brand-ink hover:bg-brand-strong"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Sending
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden />
            Send enquiry to {broker.name}
          </>
        )}
      </Button>

      <p className="text-xs leading-relaxed text-muted-foreground">
        Demo form — nothing is submitted anywhere. On a live site this reaches{" "}
        {broker.name} by email and WhatsApp within seconds.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  value,
  onChange,
  ...props
}: {
  id: string;
  label: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
} & Omit<React.ComponentProps<typeof Input>, "onChange" | "value" | "id">) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
