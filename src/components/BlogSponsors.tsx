interface SponsorLogo {
  src: string;
  alt: string;
}

interface BlogSponsorsProps {
  sponsors: SponsorLogo[];
}

function BlogSponsors({ sponsors }: BlogSponsorsProps) {
  if (sponsors.length === 0) return null;

  const hasSingleSponsor = sponsors.length === 1;

  return (
    <section
      className="not-prose my-10 rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-navy-950/30 sm:p-5"
      aria-label="Logotypy sponsorów i partnerów"
    >
      <div
        className={`grid gap-3 ${
          hasSingleSponsor
            ? "grid-cols-1"
            : "grid-cols-2 md:grid-cols-3"
        }`}
      >
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.src}
            className={`flex items-center justify-center rounded-xl border border-white/10 bg-white shadow-lg shadow-navy-950/20 transition-transform duration-300 hover:-translate-y-1 ${
              hasSingleSponsor ? "min-h-40 p-6 sm:min-h-48 sm:p-8" : "min-h-28 p-4"
            }`}
          >
            <img
              src={sponsor.src}
              alt={sponsor.alt}
              loading="lazy"
              decoding="async"
              className={
                hasSingleSponsor
                  ? "max-h-28 w-full object-contain sm:max-h-32"
                  : "max-h-20 w-full object-contain"
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default BlogSponsors;
