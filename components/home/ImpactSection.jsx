import { MapPin } from "lucide-react";

export function ImpactSection({ stats = [] }) {
  return (
    <section id="impact" className="bg-[#dfece2] py-20">
      <div className="container-wide grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-center">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-primary">
            Our reach
          </p>
          <h2 className="display max-w-2xl text-4xl leading-[1.05] md:text-6xl">
            Change travels further together.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            From the Sahel to the Middle Belt, our work is rooted in local partnerships and measurable outcomes.
          </p>
        </div>
        <div className="relative min-h-[22rem] overflow-hidden rounded-[2rem] bg-[#b8d7bf] p-6">
          <div className="absolute left-[44%] top-[18%] h-56 w-40 rotate-12 rounded-[45%_55%_48%_52%] bg-primary/80 shadow-xl md:h-64 md:w-48" />
          <div className="absolute left-[52%] top-[27%] size-4 rounded-full bg-accent ring-4 ring-white/70" />
          <div className="absolute left-[39%] top-[43%] size-4 rounded-full bg-accent ring-4 ring-white/70" />
          <div className="absolute left-[57%] top-[62%] size-4 rounded-full bg-accent ring-4 ring-white/70" />
          <div className="absolute right-6 top-6 flex flex-col gap-2">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-background/85 px-4 py-3 backdrop-blur"
              >
                <b className="text-lg">{s.value}</b>
                <span className="ml-2 text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="absolute bottom-5 left-6 flex items-center gap-2 text-sm font-semibold">
            <MapPin size={16} /> Nigeria, our home
          </p>
        </div>
      </div>
    </section>
  );
}
