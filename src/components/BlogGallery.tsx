import { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogGalleryImage {
  src: string;
  alt: string;
}

interface BlogGalleryProps {
  images: BlogGalleryImage[];
}

function BlogGallery({ images }: BlogGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      loop: true,
    },
    [
      Autoplay({
        delay: 4500,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
        stopOnInteraction: false,
      }),
    ],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(images.length);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    emblaApi?.plugins().autoplay?.reset();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    emblaApi?.plugins().autoplay?.reset();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
      emblaApi?.plugins().autoplay?.reset();
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setSnapCount(emblaApi.scrollSnapList().length);
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (images.length === 0) return null;

  return (
    <section
      className="not-prose my-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-navy-950/40"
      aria-label="Galeria zdjęć Kapusz Tennis Cup"
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-electric-400">
          Galeria
        </p>
        <p className="text-sm tabular-nums text-white/60">
          {selectedIndex + 1}/{images.length}
        </p>
      </div>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {images.map((image, index) => (
              <div className="min-w-0 flex-[0_0_100%]" key={image.src}>
                <figure className="relative flex aspect-[4/5] max-h-[78vh] items-center justify-center bg-navy-950/70 md:aspect-[16/10]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                </figure>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-navy-950/80 text-white shadow-lg shadow-navy-950/40 backdrop-blur transition hover:border-electric-400 hover:text-electric-400 focus:outline-none focus:ring-2 focus:ring-electric-400"
          aria-label="Poprzednie zdjęcie"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-navy-950/80 text-white shadow-lg shadow-navy-950/40 backdrop-blur transition hover:border-electric-400 hover:text-electric-400 focus:outline-none focus:ring-2 focus:ring-electric-400"
          aria-label="Następne zdjęcie"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 px-4 py-4">
        {Array.from({ length: snapCount }).map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-electric-400 ${
              selectedIndex === index
                ? "w-8 bg-electric-400"
                : "w-2.5 bg-white/25 hover:bg-white/50"
            }`}
            aria-label={`Przejdź do zdjęcia ${index + 1}`}
            aria-current={selectedIndex === index ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}

export default BlogGallery;
