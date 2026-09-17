import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { supporters } from "../../data/site";
import { useState } from "react";

export function SupportersSection() {
  const [page, setPage] = useState(1);
  const per = 4;
  const total = Math.ceil(supporters.length / per);
  const visible = supporters.slice((page - 1) * per, page * per);

  return (
    <section className="border-t bg-white py-16">
      <div className="container-wide">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-primary">
            With gratitude
          </p>
          <h2 className="display max-w-2xl text-4xl leading-[1.05] md:text-6xl">
            People who make this possible
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            Individual supporters across Nigeria and beyond help local partners keep vital work moving.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map(([name, desc, role, image]) => (
            <article key={name} className="overflow-hidden rounded-2xl border bg-background">
              <img src={image} alt={`${name}, ${role}`} className="aspect-[1.05] w-full object-cover" />
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">{role}</p>
                <h3 className="mt-2 text-lg font-semibold">{name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{desc}</p>
              </div>
            </article>
          ))}
        </div>
        <Pagination className="mt-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#supporters"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(Math.max(1, page - 1));
                }}
                aria-disabled={page === 1}
              />
            </PaginationItem>
            {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
              <PaginationItem key={n}>
                <PaginationLink
                  href="#supporters"
                  isActive={n === page}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(n);
                  }}
                >
                  {n}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#supporters"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(Math.min(total, page + 1));
                }}
                aria-disabled={page === total}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
