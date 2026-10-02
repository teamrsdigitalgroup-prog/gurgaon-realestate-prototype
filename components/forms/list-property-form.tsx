"use client";

import { CheckCircle2, ImagePlus, Loader2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { useBroker } from "@/components/broker/broker-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { localities } from "@/data/localities";

const PROPERTY_TYPES = [
  "Apartment",
  "Builder Floor",
  "Independent House",
  "Villa",
  "Plot",
  "Office Space",
  "Retail Shop",
] as const;

type FieldName = "name" | "phone" | "locality" | "type" | "price";
type Errors = Partial<Record<FieldName, string>>;

const initialValues = {
  name: "",
  phone: "",
  locality: "",
  type: "",
  price: "",
  notes: "",
};

export function ListPropertyForm() {
  const broker = useBroker();
  const fileInput = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState(initialValues);
  const [photos, setPhotos] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function set<K extends keyof typeof initialValues>(
    key: K,
    value: (typeof initialValues)[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function validate(): boolean {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name";
    if (!/^[6-9]\d{9}$/.test(values.phone.replace(/\D/g, ""))) {
      next.phone = "Enter a 10-digit Indian mobile number";
    }
    if (!values.locality) next.locality = "Select the locality";
    if (!values.type) next.type = "Select the property type";
    if (!values.price.trim()) next.price = "Enter the price you expect";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    // Prototype only: no upload endpoint, so the photos stay in the browser.
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("sent");
  }

  if (status === "sent") {
    const locality = localities.find((l) => l.slug === values.locality);
    return (
      <div
        role="status"
        className="rounded-2xl border border-brand-border bg-brand-soft p-6 text-center sm:p-8"
      >
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-brand text-brand-ink">
          <CheckCircle2 className="size-6" aria-hidden />
        </span>
        <h3 className="mt-4 font-heading text-xl font-semibold">
          Your property is with {broker.name}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Thanks {values.name.split(" ")[0]}. We have your {values.type} in{" "}
          {locality?.name ?? "Gurgaon"} at an expected {values.price}
          {photos.length > 0
            ? `, along with ${photos.length} ${photos.length === 1 ? "photo" : "photos"}`
            : ""}
          . {broker.name} will call you on {values.phone.replace(/\D/g, "")} to
          arrange the valuation visit.
        </p>
        <dl className="mx-auto mt-6 grid max-w-md gap-2 text-left text-[13px]">
          {[
            "Valuation visit within 48 hours",
            "Professional photos and floor plan at our cost",
            "Listed to our buyer database the same week",
          ].map((step, index) => (
            <div
              key={step}
              className="flex items-center gap-3 rounded-xl bg-background/70 px-3 py-2.5"
            >
              <dt className="grid size-6 shrink-0 place-items-center rounded-full bg-brand text-[11px] font-semibold text-brand-ink">
                {index + 1}
              </dt>
              <dd className="text-muted-foreground">{step}</dd>
            </div>
          ))}
        </dl>
        <Button
          variant="outline"
          className="mt-6 border-brand-border text-brand hover:bg-brand-muted"
          onClick={() => {
            setValues(initialValues);
            setPhotos([]);
            setStatus("idle");
          }}
        >
          List another property
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="owner-name">Owner name</Label>
          <Input
            id="owner-name"
            value={values.name}
            onChange={(event) => set("name", event.target.value)}
            placeholder="Suresh Kumar"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
          />
          <FieldError id="owner-name" message={errors.name} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="owner-phone">Mobile number</Label>
          <Input
            id="owner-phone"
            value={values.phone}
            onChange={(event) => set("phone", event.target.value)}
            placeholder="98765 43210"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
          />
          <FieldError id="owner-phone" message={errors.phone} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="owner-locality-trigger">Locality</Label>
          <Select
            items={localities.map((l) => ({ value: l.slug, label: l.name }))}
            value={values.locality}
            onValueChange={(value) => set("locality", value ?? "")}
          >
            <SelectTrigger
              id="owner-locality-trigger"
              className="h-10 w-full"
              aria-invalid={Boolean(errors.locality)}
            >
              <SelectValue placeholder="Select locality" />
            </SelectTrigger>
            <SelectContent>
              {localities.map((locality) => (
                <SelectItem key={locality.slug} value={locality.slug}>
                  {locality.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError id="owner-locality" message={errors.locality} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="owner-type-trigger">Property type</Label>
          <Select
            value={values.type}
            onValueChange={(value) => set("type", value ?? "")}
          >
            <SelectTrigger
              id="owner-type-trigger"
              className="h-10 w-full"
              aria-invalid={Boolean(errors.type)}
            >
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError id="owner-type" message={errors.type} />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="owner-price">Expected price</Label>
          <Input
            id="owner-price"
            value={values.price}
            onChange={(event) => set("price", event.target.value)}
            placeholder="₹2.4 Cr, or ₹65,000 per month for a rental"
            aria-invalid={Boolean(errors.price)}
          />
          <FieldError id="owner-price" message={errors.price} />
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor="owner-photos">Photos</Label>
        <label
          htmlFor="owner-photos"
          className="mt-1.5 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-brand-border bg-brand-tint px-4 py-7 text-center transition hover:bg-brand-soft"
        >
          <span className="grid size-10 place-items-center rounded-full bg-brand text-brand-ink">
            <ImagePlus className="size-5" aria-hidden />
          </span>
          <span className="mt-3 text-sm font-medium">
            Add photos of your property
          </span>
          <span className="mt-1 text-xs text-muted-foreground">
            JPG or PNG, up to 10 images. Drag and drop works too.
          </span>
          <input
            ref={fileInput}
            id="owner-photos"
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(event) => {
              const names = Array.from(event.target.files ?? []).map(
                (file) => file.name,
              );
              setPhotos((current) => [...current, ...names].slice(0, 10));
            }}
          />
        </label>

        {photos.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {photos.map((name, index) => (
              <li
                key={`${name}-${index}`}
                className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs"
              >
                <Upload className="size-3.5 shrink-0 text-brand" aria-hidden />
                <span className="truncate">{name}</span>
                <button
                  type="button"
                  onClick={() =>
                    setPhotos((current) =>
                      current.filter((_, i) => i !== index),
                    )
                  }
                  className="shrink-0 rounded-full p-0.5 text-muted-foreground transition hover:bg-background hover:text-foreground"
                  aria-label={`Remove ${name}`}
                >
                  <X className="size-3.5" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-1.5">
        <Label htmlFor="owner-notes">Anything else we should know?</Label>
        <Textarea
          id="owner-notes"
          rows={3}
          value={values.notes}
          onChange={(event) => set("notes", event.target.value)}
          placeholder="Floor, facing, age of the property, whether it is tenanted, and when you would like to sell."
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === "sending"}
        className="mt-6 h-auto min-h-12 w-full whitespace-normal bg-brand py-3 text-center text-brand-ink hover:bg-brand-strong"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Submitting
          </>
        ) : (
          `List my property with ${broker.name}`
        )}
      </Button>

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        Demo form — nothing is uploaded or stored. No listing fee is charged
        until the property is sold or rented.
      </p>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${id}-error`} className="text-xs font-medium text-destructive">
      {message}
    </p>
  );
}
