import { Quote } from "lucide-react";
import { RatingStars } from "@/components/rating-stars";
import { Section, SectionHeading } from "@/components/section";
import { testimonials } from "@/data";
import type { Broker } from "@/lib/broker";

export function Testimonials({ broker }: { broker: Broker }) {
  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Client words"
        title={`What clients say about ${broker.name}`}
        description="Six people who bought, sold or rented through us in the last two years."
        align="center"
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {testimonials.map((testimonial) => (
          <li
            key={testimonial.id}
            className="relative flex flex-col rounded-2xl border border-border bg-card p-6"
          >
            <Quote
              className="absolute right-5 top-5 size-7 text-brand/15"
              aria-hidden
            />
            <RatingStars rating={testimonial.rating} size={15} />
            <blockquote className="mt-4 flex-1 text-[14.5px] leading-relaxed text-foreground/90">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
              <span
                aria-hidden
                className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-[13px] font-semibold text-brand-ink"
              >
                {testimonial.avatarInitials}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">
                  {testimonial.author}
                </span>
                <span className="block truncate text-[12.5px] text-muted-foreground">
                  {testimonial.role} · {testimonial.locality}
                </span>
              </span>
            </figcaption>
          </li>
        ))}
      </ul>
    </Section>
  );
}
