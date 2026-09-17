import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { HelpButton } from "../ui/HelpButton";

export function HeroSection({ copy = {
  eyebrow: "Fighting Hunger. Restoring Dignity.",
  title: "Together, We Can End Hunger in Nigeria",
  description:
    "We work with communities to provide food, support vulnerable families, and create sustainable pathways out of poverty.",
  image: "https://images.unsplash.com/photo-1504159506876-f8338247a14a?auto=format&fit=crop&w=1200&q=85",
}, onDonate }) {
  return (
    <section className="container-wide grid gap-10 py-12 md:grid-cols-[.9fr_1.1fr] md:items-center md:py-20">
      <div className="animate-rise">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[.2em] text-primary">
          {copy.eyebrow}
        </p>
        <h1 className="display max-w-xl text-6xl leading-[.96] md:text-8xl">
          {copy.title}
        </h1>
        <p className="mt-7 max-w-lg text-lg leading-8 text-muted-foreground">
          {copy.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <HelpButton onClick={onDonate} />
          <Link
            to="/impact"
            className="inline-flex h-11 min-w-52 items-center justify-center gap-2 rounded-md border border-[#1d6f5f] bg-background px-5 text-[0.72rem] font-semibold tracking-[.12em] uppercase text-[#11231e] transition-colors hover:bg-[#f4faf7] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Explore Our Impact <ArrowUpRight data-icon="inline-end" />
          </Link>
        </div>
      </div>
      <div className="relative min-h-[28rem] overflow-hidden rounded-[2rem] bg-secondary">
        <img
          src={copy.image}
          alt="Nigerian family at a community food program"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute bottom-5 left-5 rounded-2xl bg-background/90 p-4 backdrop-blur">
          <p className="text-2xl font-semibold">250k+</p>
          <p className="text-xs text-muted-foreground">people reached</p>
        </div>
      </div>
    </section>
  );
}
