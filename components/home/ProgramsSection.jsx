import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { programs } from "../../data/site";

export function ProgramsSection() {
  const [active, setActive] = useState(0);
  const p = programs[active];

  return (
    <section className="bg-white py-24">
      <div className="container-wide">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-primary">
              Our programs
            </p>
            <h2 className="display max-w-2xl text-4xl leading-[1.05] md:text-6xl">
              How we are helping in Nigeria
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              Immediate support, lasting pathways, and local leadership at every step.
            </p>
          </div>
          <div className="flex gap-2">
            {programs.map((x, i) => (
              <button
                aria-label={`Show ${x.title}`}
                key={x.title}
                onClick={() => setActive(i)}
                className={`size-11 rounded-full border text-sm ${i === active ? "bg-primary text-primary-foreground" : "bg-background"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid overflow-hidden rounded-[2rem] bg-[#17352c] text-white md:grid-cols-2">
          <img
            src={p.image}
            alt={p.title}
            className="h-80 w-full object-cover md:h-[450px]"
          />
          <div className="flex flex-col justify-between p-8 md:p-12">
            <div>
              <p className="text-sm text-[#efb366]">{p.location}</p>
              <h3 className="display mt-4 text-5xl">{p.title}</h3>
              <p className="mt-5 max-w-md leading-7 text-white/65">{p.description}</p>
            </div>
            <div className="mt-10 flex items-end justify-between border-t border-white/15 pt-6">
              <div>
                <p className="text-3xl font-semibold">{p.stat}</p>
                <p className="text-sm text-white/55">reached through this program</p>
              </div>
              <ArrowUpRight />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
