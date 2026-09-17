import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function CommunitySection() {
  const [sent, setSent] = useState(false);

  return (
    <section id="community" className="bg-secondary py-20">
      <div className="container-wide grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-primary">
            Stay connected
          </p>
          <h2 className="display max-w-2xl text-4xl leading-[1.05] md:text-6xl">
            Join our community
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            Get thoughtful updates about humanitarian work, campaigns, volunteer opportunities and impact from the field.
          </p>
        </div>
        <div className="rounded-3xl bg-white p-7 shadow-sm">
          {sent ? (
            <div className="flex min-h-56 flex-col items-center justify-center text-center">
              <span className="grid size-14 place-items-center rounded-full bg-secondary text-primary">
                <Check />
              </span>
              <h3 className="display mt-5 text-3xl">You are on the list.</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Thank you for standing with communities across Nigeria.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="grid gap-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  required
                  placeholder="First name"
                  aria-label="First name"
                />
                <Input
                  required
                  placeholder="Last name"
                  aria-label="Last name"
                />
              </div>
              <Input
                required
                type="email"
                placeholder="Email address"
                aria-label="Email address"
              />
              <Input
                type="tel"
                placeholder="Mobile number (optional)"
                aria-label="Mobile number"
              />
              <Button className="mt-2 rounded-full" type="submit">
                JOIN OUR COMMUNITY <ArrowUpRight data-icon="inline-end" />
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Your information is used only to keep you informed about our work.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
