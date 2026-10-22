import { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import "./islands.css";

interface BlogGalleryProps {
  images: { src: string; alt: string }[];
}

export default function BlogGallery({ images }: BlogGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center", loop: true }, [
    Autoplay({ delay: 4500, stopOnMouseEnter: true, stopOnFocusIn: true, stopOnInteraction: false }),
  ]);
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
    if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap());
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
    <section className="gal" aria-label="Galeria zdjęć">
      <div className="gal-bar">
        <p className="gal-label">Galeria</p>
        <p className="gal-count">
          {selectedIndex + 1}/{images.length}
        </p>
      </div>

      <div className="gal-stage">
        <div className="gal-viewport" ref={emblaRef}>
          <div className="gal-track">
            {images.map((image, index) => (
              <div className="gal-slide" key={image.src}>
                <figure className="gal-figure">
                  <img src={image.src} alt={image.alt} loading={index === 0 ? "eager" : "lazy"} decoding="async" />
                </figure>
              </div>
            ))}
          </div>
        </div>

        <button type="button" onClick={scrollPrev} className="gal-nav gal-nav--prev" aria-label="Poprzednie zdjęcie">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button type="button" onClick={scrollNext} className="gal-nav gal-nav--next" aria-label="Następne zdjęcie">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="gal-dots">
        {Array.from({ length: snapCount }).map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => scrollTo(index)}
            className="gal-dot"
            aria-label={`Przejdź do zdjęcia ${index + 1}`}
            aria-current={selectedIndex === index ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
