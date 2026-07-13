interface SponsorLogo {
  src: string;
  alt: string;
}

interface BlogSponsorsProps {
  sponsors: SponsorLogo[];
}

function BlogSponsors({ sponsors }: BlogSponsorsProps) {
  if (sponsors.length === 0) return null;

  return (
    <section
      className="not-prose my-10 rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-navy-950/30 sm:p-5"
      aria-label="Logotypy sponsorów i partnerów"
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.src}
            className="flex min-h-28 items-center justify-center rounded-xl border border-white/10 bg-white p-4 shadow-lg shadow-navy-950/20 transition-transform duration-300 hover:-translate-y-1"
          >
            <img
              src={sponsor.src}
              alt={sponsor.alt}
              loading="lazy"
              decoding="async"
              className="max-h-20 w-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default BlogSponsors;
