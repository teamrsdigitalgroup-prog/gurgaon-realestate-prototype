"use client";

import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function Gallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  const go = useCallback(
    (direction: 1 | -1) => setIndex((current) => (current + direction + count) % count),
    [count],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <div className="flex flex-col gap-3">
      <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted sm:aspect-[16/9]">
        <Image
          src={images[index]}
          alt={`${title} — photo ${index + 1} of ${count}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-neutral-900 shadow-md transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-neutral-900 shadow-md transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>

        <span className="absolute bottom-3 left-3 rounded-full bg-black/65 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {index + 1} / {count}
        </span>

        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-xs font-medium text-white backdrop-blur transition hover:bg-black/80"
            >
              <Expand className="size-3.5" aria-hidden />
              View full size
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl overflow-hidden p-0 sm:max-w-5xl">
            <DialogTitle className="sr-only">{title} — full size photo</DialogTitle>
            <div className="relative aspect-[16/10] w-full bg-neutral-950">
              <Image
                src={images[index]}
                alt={`${title} — enlarged photo ${index + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <ul className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {images.map((src, thumbIndex) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => setIndex(thumbIndex)}
              aria-label={`Show photo ${thumbIndex + 1}`}
              aria-current={thumbIndex === index}
              className={cn(
                "relative block size-16 shrink-0 overflow-hidden rounded-lg ring-2 transition sm:size-20",
                thumbIndex === index
                  ? "ring-brand"
                  : "ring-transparent hover:ring-brand-border",
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
