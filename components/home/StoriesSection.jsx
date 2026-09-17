import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function StoriesSection() {
  return (
    <section className="container-wide py-20">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-primary">
            Explore more
          </p>
          <h2 className="display max-w-2xl text-4xl leading-[1.05] md:text-6xl">
            Stories, updates & insights
          </h2>
        </div>
        <Link to="/stories" className="hidden items-center gap-2 text-sm font-semibold text-primary md:flex">
          View all stories <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        <p className="text-sm text-muted-foreground md:col-span-3">
          Story profiles are loaded from the database and updated as new field reports are published.
        </p>
      </div>
    </section>
  );
}
