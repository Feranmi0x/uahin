"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  ArrowUpRight,
  Heart,
  HeartHandshake,
  Menu,
  X,
  MapPin,
  Lock,
  Check,
  Mail,
  Phone,
  Globe,
  Plus,
  ShieldCheck,
  CreditCard,
  Landmark,
  Wallet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { formatNaira } from "../data/site";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

const emptySiteData = {
  navItems: [],
  programs: [],
  articles: [],
  impactStats: [],
  pageCopy: {},
  values: [],
  supporters: [],
  gallery: [],
};

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground">
        <Heart fill="currentColor" size={19} />
      </span>
      <span className="font-semibold tracking-tight">
        UAHIN
        <br />
        <span className="text-[0.58rem] font-normal tracking-[.18em] text-muted-foreground">
          UPLIFTMENT AGAINST HUNGER
        </span>
      </span>
    </Link>
  );
}
function HelpButton({ onClick, className = "" }) {
  return (
    <Button
      onClick={onClick}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#1a6658] bg-[#1a6658] px-5 text-[0.72rem] font-semibold tracking-[.12em] text-white uppercase shadow-sm transition-colors hover:border-[#154d44] hover:bg-[#154d44] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6658]/20 ${className}`}
    >
      <HeartHandshake className="size-4" />
      <span>Give Today</span>
    </Button>
  );
}
function Navbar({ onDonate, navItems }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="container-wide flex h-19 items-center justify-between gap-8">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navItems.map((n) => {
            const active = location.pathname === n.to || (n.to !== "/" && location.pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                className={`relative rounded-full px-4 py-2 text-[0.76rem] font-semibold tracking-[0.16em] uppercase transition-all duration-200 hover:bg-[#f1f7f3] hover:text-[#123d35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active ? "bg-[#edf6f1] text-[#123d35] shadow-[inset_0_0_0_1px_rgba(26,102,88,0.08)]" : "text-[#425b56]"}`}
                to={n.to}
              >
                {n.label}
              </Link>
            );
          })}
          <HelpButton onClick={onDonate} className="ml-4 h-12 px-6" />
        </nav>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="grid size-11 place-items-center rounded-full border border-border bg-background text-foreground transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      {open && (
        <nav className="container-wide flex flex-col gap-2 border-t border-border/70 py-5 md:hidden" aria-label="Mobile navigation">
          {navItems.map((n) => (
            <Link
              onClick={() => setOpen(false)}
              key={n.to}
              to={n.to}
              className="rounded-2xl px-4 py-3 text-lg font-semibold transition hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {n.label}
            </Link>
          ))}
          <HelpButton
            onClick={() => {
              setOpen(false);
              onDonate();
            }}
            className="mt-3 w-fit px-6"
          />
        </nav>
      )}
    </header>
  );
}
function Footer() {
  return (
    <footer className="bg-[#f9f8f6] text-[#11231e]">
      <div className="container-wide grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-6 text-[#5d7169]">
            Building a Nigeria where every person can access nutritious food and
            the opportunity to thrive.
          </p>
          <div className="mt-7 flex gap-3 text-[#5d7169]">
            <Mail size={18} />
            <Globe size={18} />
            <Phone size={18} />
          </div>
        </div>
        {[
          ["Organization", "About", "Our Work", "Impact", "Stories"],
          [
            "Get involved",
            "Give Today",
            "Volunteer",
            "Join our community",
            "Partner with us",
          ],
          ["Resources", "News", "Donation policy", "Privacy policy", "Terms"],
        ].map(([h, ...items]) => (
          <div key={h}>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[.18em] text-primary">
              {h}
            </h3>
            <div className="flex flex-col gap-3 text-sm text-[#5d7169]">
              {items.map((i) => {
                const target =
                  i === "About"
                    ? "/about"
                    : i === "Our Work"
                      ? "/our-work"
                      : i === "Impact"
                        ? "/impact"
                        : i === "Stories"
                          ? "/stories"
                          : i === "News"
                            ? "/news"
                            : i === "Donation policy"
                              ? "/donation-policy"
                              : i === "Privacy policy"
                                ? "/privacy-policy"
                                : i === "Terms"
                                  ? "/terms"
                                  : i === "Give Today"
                                    ? "#donate"
                                    : i === "Join our community"
                                      ? "#community"
                                      : i === "Volunteer"
                                        ? "#community"
                                        : i === "Partner with us"
                                          ? "#community"
                                          : "/";

                return (
                  <Link
                    key={i}
                    to={target}
                    onClick={(event) => {
                      if (target.startsWith("#")) {
                        event.preventDefault();
                        const el = document.getElementById(target.slice(1));
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }
                    }}
                    className="hover:text-[#11231e]"
                  >
                    {i}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="container-wide flex flex-col gap-3 border-t border-[#e8e4df] py-6 text-xs text-[#5d7169] md:flex-row md:justify-between">
        <span>© 2026 Upliftment Against Hunger Initiative NG (UAHIN). All rights reserved.</span>
        <span className="flex items-center gap-2">
          <Mail size={13} /> hello@uahin.org{" "}
          <Phone size={13} className="ml-3" /> +234 800 123 4567
        </span>
      </div>
    </footer>
  );
}
function SectionHeading({ eyebrow, title, description, dark = false }) {
  return (
    <div className={dark ? "text-white" : ""}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-primary">
        {eyebrow}
      </p>
      <h2 className="display max-w-2xl text-4xl leading-[1.05] md:text-6xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-xl text-base leading-7 ${dark ? "text-white/65" : "text-muted-foreground"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
function Hero({
  copy = {
    eyebrow: "Fighting Hunger. Restoring Dignity.",
    title: "Together, We Can End Hunger in Nigeria",
    description:
      "We work with communities to provide food, support vulnerable families, and create sustainable pathways out of poverty.",
    image: "https://images.unsplash.com/photo-1504159506876-f8338247a14a?auto=format&fit=crop&w=1200&q=85",
  },
  onDonate,
}) {
  return (
    <section className="container-wide grid gap-12 py-12 md:grid-cols-[.88fr_1.12fr] md:items-center md:gap-16 md:py-20 lg:py-24">
      <div className="animate-rise max-w-xl">
        <div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.2em] text-primary">
          <span className="h-px w-10 bg-primary" />
          <span>{copy.eyebrow}</span>
        </div>
        <h1 className="display max-w-2xl text-[3.2rem] leading-[.94] tracking-[-.055em] sm:text-6xl md:text-[4.8rem] lg:text-[5.6rem]">
          {copy.title}
        </h1>
        <p className="mt-8 max-w-md text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
          {copy.description}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <HelpButton onClick={onDonate} className="h-12 px-6" />
          <Link
            to="/impact"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#1d6f5f] bg-white px-5 text-xs font-semibold tracking-[.12em] text-[#11231e] transition-all hover:-translate-y-0.5 hover:border-[#1a5d4d] hover:bg-[#f4faf7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-y-0"
          >
            EXPLORE OUR IMPACT <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <div className="mt-12 flex items-center gap-4 border-t border-border/80 pt-5 text-sm text-muted-foreground">
          <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-primary"><Heart size={16} fill="currentColor" /></span>
          <span>
            <span className="display text-2xl leading-none tracking-tighter text-[#11231e]">250k+</span>
            <span className="ml-2">lives supported through community-led action</span>
          </span>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-2xl">
        <div className="relative aspect-[.92] overflow-hidden bg-secondary sm:aspect-[1.02]">
          <img
            src={copy.image}
            alt="Nigerian family at a community food program"
            className="size-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
          />
        </div>
      </div>
    </section>
  );
}
function Impact({ impactStats = [] }) {
  return (
    <section id="impact" className="bg-[#dfece2] py-20">
      <div className="container-wide grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-center">
        <SectionHeading
          eyebrow="Our reach"
          title="Change travels further together."
          description="From the Sahel to the Middle Belt, our work is rooted in local partnerships and measurable outcomes."
        />
        <div className="relative min-h-88 overflow-hidden rounded-4xl border border-[#d7e3db] bg-[#edf3ee] p-6 shadow-[0_18px_40px_rgba(17,35,30,0.04)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(15,107,85,0.10),transparent_42%),linear-gradient(180deg,#edf3ee_0%,#e4efe8_100%)]" />
          <div className="absolute left-[44%] top-[18%] h-56 w-40 rotate-12 rounded-[45%_55%_48%_52%] border border-[#9bb6ad] bg-[#dfece2] md:h-64 md:w-48" />
          <div className="absolute left-[50%] top-[26%] h-3.5 w-3.5 rounded-full bg-ring ring-4 ring-[#edf3ee] shadow-[0_0_0_6px_rgba(15,107,85,0.12)]" />
          <div className="absolute left-[38%] top-[44%] h-3.5 w-3.5 rounded-full bg-ring ring-4 ring-[#edf3ee] shadow-[0_0_0_6px_rgba(15,107,85,0.12)]" />
          <div className="absolute left-[59%] top-[60%] h-3.5 w-3.5 rounded-full bg-ring ring-4 ring-[#edf3ee] shadow-[0_0_0_6px_rgba(15,107,85,0.12)]" />
          <div className="absolute right-6 top-6 flex flex-col gap-2">
            {impactStats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-[#d7e3db] bg-white/80 px-4 py-3 backdrop-blur-sm"
              >
                <div className="display text-3xl leading-none tracking-[-0.06em] text-[#11231e]">
                  {s.value}
                </div>
                <div className="mt-1 text-[0.62rem] uppercase tracking-[.12em] text-[#5d7169]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <p className="absolute bottom-5 left-6 flex items-center gap-2 text-sm font-medium text-[#11231e]">
            <MapPin size={16} className="text-primary" /> Working across Nigeria
          </p>
        </div>
      </div>
    </section>
  );
}
function Why() {
  return (
    <section className="container-wide grid gap-10 py-24 md:grid-cols-[1.1fr_.9fr] md:items-center">
      <div className="relative min-h-100 overflow-hidden rounded-4xl">
        <img
          src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=85"
          alt="Children learning together in Nigeria"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute bottom-5 right-5 max-w-52 rounded-2xl bg-accent p-5">
          <p className="display text-5xl">1 in 4</p>
          <p className="mt-2 text-sm leading-5">
            Nigerians face food insecurity. Behind every number is a neighbor.
          </p>
        </div>
      </div>
      <div>
        <SectionHeading
          eyebrow="Why this matters"
          title="Millions face difficult choices every day."
          description="Food insecurity is shaped by rising costs, unemployment, displacement and unequal access to opportunity. We respond with urgency — and with respect."
        />
        <div className="mt-8 grid grid-cols-2 gap-6 border-t pt-6">
          <div>
            <p className="display text-5xl leading-none tracking-[-0.06em] text-[#11231e]">72%</p>
            <p className="mt-2 text-sm text-muted-foreground">
              of our programs are locally led
            </p>
          </div>
          <div>
            <p className="display text-5xl leading-none tracking-[-0.06em] text-[#11231e]">₦18bn</p>
            <p className="mt-2 text-sm text-muted-foreground">
              in food value moved through communities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
function Programs({ programs = [] }) {
  const [active, setActive] = useState(0);

  if (!programs.length) {
    return null;
  }

  const p = programs[active] || programs[0];

  return (
    <section className="bg-white py-24">
      <div className="container-wide">
        <div className="grid gap-8 pb-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div className="max-w-120">
            <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[.2em] text-primary">
              Our programs
            </p>
            <h2 className="display text-4xl leading-[1.02] tracking-[-0.04em] text-[#11231e] md:text-5xl">
              How we are helping in Nigeria
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-[#5d7169]">
              Immediate support, lasting pathways, and local leadership at every step.
            </p>
          </div>

          <div className="flex justify-start md:justify-end">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e8e4df] bg-[#f8f5f2] p-1.5">
              {programs.map((x, i) => (
                <button
                  aria-label={`Show ${x.title}`}
                  key={x.title}
                  onClick={() => setActive(i)}
                  className={`inline-flex size-10 items-center justify-center rounded-full text-sm font-semibold transition-all ${i === active ? "bg-[#11231e] text-white" : "bg-transparent text-[#3d564f] hover:bg-white"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-2 grid overflow-hidden rounded-[1.75rem] bg-white text-[#11231e] ring-1 ring-[#ece7e2] md:grid-cols-2">
          <img
            src={p.image}
            alt={p.title}
            className="h-80 w-full object-cover md:h-124"
          />
          <div className="flex flex-col justify-between p-8 md:p-12">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[.24em] text-primary">
                {p.location}
              </p>
              <h3 className="display mt-4 text-4xl leading-none md:text-5xl">
                {p.title}
              </h3>
              <p className="mt-5 max-w-md text-base leading-7 text-[#54655f]">
                {p.description}
              </p>
            </div>
            <div className="mt-10 flex items-end justify-between pt-5">
              <div>
                <p className="display text-4xl leading-none tracking-[-0.04em] text-[#11231e] md:text-5xl">
                  {p.stat}
                </p>
                <p className="mt-2 text-sm text-[#5d7169]">
                  reached through this program
                </p>
              </div>
              <ArrowUpRight className="text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function WorkArchive({ gallery = [] }) {
  const [page, setPage] = useState(1);
  const per = 3;

  if (!gallery.length) {
    return null;
  }

  const total = Math.ceil(gallery.length / per);
  const visible = gallery.slice((page - 1) * per, page * per);

  return (
    <section className="bg-[#f7f3ee] py-24">
      <div className="container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-primary">
            A record of care
          </p>
          <h2 className="display text-4xl leading-[1.02] tracking-[-0.04em] text-[#11231e] md:text-6xl">
            The work that shaped communities over the years
          </h2>
          <p className="mt-5 text-base leading-7 text-[#54655f]">
            These photographs capture Upliftment Against Hunger Initiative NG (UAHIN)’s work across communities and states over the years — moments of care, support, and collective action.
          </p>
        </div>

        <div className="mt-12 grid gap-1 md:grid-cols-3">
          {visible.map((item) => (
            <div key={item.id ?? item.title} className="overflow-hidden bg-[#f0ece8]">
              <img
                src={item.image}
                alt={item.title}
                className="aspect-[4/5] w-full object-cover transition duration-500 hover:scale-[1.015] md:aspect-[4/5]"
              />
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Pagination className="justify-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#archive"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(Math.max(1, page - 1));
                  }}
                  aria-disabled={page === 1}
                  className="h-9 rounded-full border border-transparent bg-transparent px-2 text-[0.7rem] font-medium uppercase tracking-[.14em] text-[#5d7169] hover:border-[#dfd5ca] hover:bg-white/80 hover:text-[#11231e]"
                />
              </PaginationItem>
              {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
                <PaginationItem key={n}>
                  <PaginationLink
                    href="#archive"
                    isActive={n === page}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(n);
                    }}
                    className="h-8 w-8 rounded-full border border-transparent bg-transparent text-[0.76rem] font-medium text-[#5d7169] hover:border-[#dfd5ca] hover:bg-white/80 hover:text-[#11231e]"
                  >
                    {n}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#archive"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(Math.min(total, page + 1));
                  }}
                  aria-disabled={page === total}
                  className="h-9 rounded-full border border-transparent bg-transparent px-2 text-[0.7rem] font-medium uppercase tracking-[.14em] text-[#5d7169] hover:border-[#dfd5ca] hover:bg-white/80 hover:text-[#11231e]"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
}
function Campaign({ onDonate }) {
  return (
    <section className="bg-[#f4efe9] py-24">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-4xl border border-[#e3d8cc] bg-[#faf7f2] px-6 py-12 text-[#11231e] shadow-[0_18px_40px_rgba(17,35,30,0.04)] md:px-10 md:py-16 lg:px-14">
          <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,rgba(15,107,85,0.08),transparent_65%)] lg:block" />
          <div className="relative z-10 max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-primary">
              Make a difference
            </p>
            <h2 className="display text-5xl leading-none md:text-6xl lg:text-7xl">
              Join us to end hunger in Nigeria.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#54655f]">
              Ending hunger takes individuals, communities and organizations
              choosing to act together.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <HelpButton
                onClick={onDonate}
                className="h-12 px-6 text-[0.72rem]"
              />
              <a
                href="#community"
                className="inline-flex h-12 items-center justify-center rounded-md border border-[#1d6f5f] bg-white px-5 text-[0.72rem] font-semibold tracking-[.12em] text-[#11231e] uppercase transition-colors hover:bg-[#f4faf7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
              >
                Join Our Community
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function News({ articles = [] }) {
  return (
    <section className="container-wide py-20">
      <div className="flex items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Explore more"
          title="Stories, updates & insights"
        />
        <Link
          to="/stories"
          className="hidden items-center gap-2 rounded-full border border-[#1d6f5f] bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:-translate-y-0.5 hover:border-[#1a5d4d] hover:bg-[#f4faf7] md:flex"
        >
          View all stories <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {articles.map((a) => (
          <article key={a.slug} className="group">
            <Link to={`/stories/${a.slug}`}>
              <div className="aspect-[1.25] overflow-hidden rounded-2xl">
                <img
                  src={a.image}
                  alt=""
                  className="size-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[.15em] text-primary">
                {a.category} · {a.date}
              </p>
              <h3 className="display mt-3 text-3xl leading-tight group-hover:text-primary">
                {a.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {a.excerpt}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
function formatCustomAmountInput(value) {
  const digitsOnly = String(value ?? "").replace(/[^\d]/g, "");
  if (!digitsOnly) return "";
  return Number(digitsOnly).toLocaleString("en-NG");
}

function sanitizeAmountInput(value) {
  const digitsOnly = String(value ?? "").replace(/[^\d]/g, "");
  return digitsOnly ? Number(digitsOnly) : "";
}

function DonationSection() {
  const [amount, setAmount] = useState(10000);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "" });
  const symbol = "₦";

  async function beginPayment() {
    setProcessing(true);
    setError("");
    try {
      const email = form.email.trim().toLowerCase();
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        throw new Error("Enter a valid email address.");
      }

      const response = await fetch("/api/donations/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          frequency: "once",
          firstName: "Supporter",
          lastName: "Donor",
          email,
          phone: "",
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to start payment.");

      if (window.self !== window.top) {
        window.open(result.authorizationUrl, "_blank", "noopener,noreferrer");
      } else {
        window.location.assign(result.authorizationUrl);
      }
    } catch (submissionError) {
      setError(submissionError.message || "Unable to start payment.");
      setProcessing(false);
    }
  }

  return (
    <section id="donate" className="bg-[#f4f7f3] py-20 text-[#11231e]">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl pb-8 text-center md:text-left">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-primary">
            Give with confidence
          </p>
          <h2 className="display text-5xl leading-none md:text-6xl">
            Your support can make a difference.
          </h2>
        </div>

        <div className="mx-auto max-w-2xl rounded-3xl border border-[#dfe7e1] bg-white p-6 sm:p-7 md:p-8">
          <div className="flex flex-col gap-7">
            <div>
              <p className="mb-3 text-sm font-semibold text-[#11231e]">Donation amount</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[5000, 10000, 25000, 50000, 100000].map((v) => (
                  <button
                    type="button"
                    key={v}
                    onClick={() => setAmount(v)}
                    className={`rounded-xl border px-3 py-4 text-sm font-semibold transition ${amount === v ? "border-primary bg-[#edf6f1] text-[#2f5d54]" : "border-[#dfe7e1] bg-[#f7faf8] text-[#11231e] hover:border-[#cddbd3] hover:bg-white"}`}
                  >
                    {symbol}{formatNaira(v)}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setAmount("")}
                  className={`rounded-xl border px-3 py-4 text-sm font-semibold transition ${typeof amount !== "number" ? "border-primary bg-[#edf6f1] text-[#2f5d54]" : "border-[#dfe7e1] bg-[#f7faf8] text-[#11231e] hover:border-[#cddbd3] hover:bg-white"}`}
                >
                  Custom Amount
                </button>
              </div>
              <div className="mt-3 flex items-center rounded-xl border border-[#dfe7e1] bg-[#f7faf8] px-4">
                <span className="pr-2 text-[#5d7169]">{symbol}</span>
                <input
                  inputMode="numeric"
                  type="text"
                  value={typeof amount === "number" ? formatCustomAmountInput(amount) : ""}
                  onChange={(e) => setAmount(sanitizeAmountInput(e.target.value))}
                  onKeyDown={(e) => {
                    if (/[a-zA-Z!@#$%^&*()_+=\-\[\]{};':"\\|,.<>/?`~]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  aria-label="Custom donation amount"
                  placeholder="Enter custom amount"
                  className="w-full bg-transparent px-2 py-3 text-base text-[#2f5d54] outline-none placeholder:text-[#7b8a84]"
                />
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-[#11231e]">Email address</p>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={(event) => setForm({ email: event.target.value })}
                placeholder="Email address"
                aria-label="Email address"
                required
                className="h-12 w-full rounded-xl border border-[#dfe7e1] bg-[#f7faf8] px-4 text-base text-[#11231e] placeholder:text-[#7b8a84] focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10"
              />
            </div>

            <div className="rounded-xl border border-[#dfe7e1] bg-[#f7faf8] p-4 text-sm text-[#405651]">
              <div className="flex items-center gap-3">
                <CreditCard className="text-primary" size={16} />
                <span>Paystack secure payment · NGN only</span>
              </div>
            </div>

            {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

            <Button
              onClick={beginPayment}
              disabled={processing}
              className="h-12 w-full rounded-md border border-[#1a6658] bg-[#1a6658] px-6 text-[0.72rem] font-semibold tracking-[.12em] text-white uppercase shadow-sm transition-colors hover:border-[#154d44] hover:bg-[#154d44] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:border-[#9bb6ad] disabled:bg-[#f2f7f5] disabled:text-[#7a8d87]"
            >
              {processing ? "Connecting To Paystack..." : "Continue To Payment"} <Lock data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
function Community() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Unable to join our community.");
      }

      setForm({ firstName: "", lastName: "", email: "", phone: "" });
      setSent(true);
    } catch (submissionError) {
      setError(
        submissionError.message || "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="community" className="bg-[#f6f1ea] py-20">
      <div className="container-wide grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-center">
        <SectionHeading
          eyebrow="Stay connected"
          title="Join our community"
          description="Get thoughtful updates about humanitarian work, campaigns, volunteer opportunities and impact from the field."
        />
        <div className="mx-auto w-full max-w-155 rounded-3xl border border-[#e3d8cc] bg-white p-5 sm:p-7 md:p-8">
          {sent ? (
            <div className="flex min-h-60 flex-col items-center justify-center text-center">
              <span className="grid size-14 place-items-center rounded-full bg-[#edf6f1] text-primary">
                <Check />
              </span>
              <h3 className="display mt-5 text-3xl text-[#11231e]">You are on the list.</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[#5d7169]">
                Thank you for standing with communities across Nigeria.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-[0.7rem] font-semibold uppercase tracking-[.18em] text-[#3d564f]">
                  <span>First name</span>
                  <Input
                    required
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    aria-label="First name"
                    className="h-12 rounded-xl border border-[#e3d8cc] bg-[#f9f5f1] px-4 text-base text-[#11231e] placeholder:text-[#7b8a84] focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10"
                  />
                </label>
                <label className="grid gap-2 text-[0.7rem] font-semibold uppercase tracking-[.18em] text-[#3d564f]">
                  <span>Last name</span>
                  <Input
                    required
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    aria-label="Last name"
                    className="h-12 rounded-xl border border-[#e3d8cc] bg-[#f9f5f1] px-4 text-base text-[#11231e] placeholder:text-[#7b8a84] focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10"
                  />
                </label>
              </div>
              <label className="grid gap-2 text-[0.7rem] font-semibold uppercase tracking-[.18em] text-[#3d564f]">
                <span>Email address</span>
                <Input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  aria-label="Email address"
                  className="h-12 rounded-xl border border-[#e3d8cc] bg-[#f9f5f1] px-4 text-base text-[#11231e] placeholder:text-[#7b8a84] focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10"
                />
              </label>
              <label className="grid gap-2 text-[0.7rem] font-semibold uppercase tracking-[.18em] text-[#3d564f]">
                <span>Mobile number</span>
                <Input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Mobile number (optional)"
                  aria-label="Mobile number"
                  className="h-12 rounded-xl border border-[#e3d8cc] bg-[#f9f5f1] px-4 text-base text-[#11231e] placeholder:text-[#7b8a84] focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10"
                />
              </label>
              {error && (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}
              <Button
                className="mt-1 h-12 w-full rounded-md border border-[#1a6658] bg-[#1a6658] px-6 text-[0.72rem] font-semibold tracking-[.12em] text-white uppercase shadow-sm transition-colors hover:border-[#154d44] hover:bg-[#154d44] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Join Our Community"}
              </Button>
              <p className="text-center text-xs leading-5 text-[#5d7169]">
                Your information is used only to keep you informed about our work.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
function DonationExperience({ open, onOpenChange }) {
  const [freq] = useState("once");
  const [amount, setAmount] = useState(10000);
  const method = "card";
  const [done, setDone] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const symbol = "₦";
  const displayAmount = typeof amount === "number" ? formatNaira(amount) : amount;

  async function beginPayment() {
    setProcessing(true);
    setError("");
    try {
      const email = form.email.trim().toLowerCase();
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        throw new Error("Enter a valid email address.");
      }

      const response = await fetch("/api/donations/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          frequency: freq,
          firstName: "Supporter",
          lastName: "Donor",
          email,
          phone: "",
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to start payment.");
      // The v0 preview runs inside an iframe. Paystack intentionally blocks
      // being embedded, so open its hosted checkout in a top-level tab there.
      if (window.self !== window.top) {
        window.open(result.authorizationUrl, "_blank", "noopener,noreferrer");
      } else {
        window.location.assign(result.authorizationUrl);
      }
    } catch (submissionError) {
      setError(submissionError.message || "Unable to start payment.");
      setProcessing(false);
    }
  }

  function updateForm(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference");
    if (!reference || params.get("donation") !== "verify") return;
    setProcessing(true);
    fetch(`/api/donations/verify?reference=${encodeURIComponent(reference)}`)
      .then((response) => response.json())
      .then((result) => {
        setPaymentResult(result.ok ? "success" : "failure");
        setDone(true);
      })
      .catch(() => setPaymentResult("failure"))
      .finally(() => setProcessing(false));
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-screen max-h-screen w-screen max-w-none sm:max-w-none overflow-y-auto rounded-none border-slate-200 bg-white p-0 text-slate-900">
        <div className="mx-auto max-w-2xl px-6 py-8 md:px-8 md:py-10">
          <DialogHeader className="text-left">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-emerald-700">
              Give with confidence
            </p>
            <DialogTitle className="display mt-3 text-4xl md:text-5xl text-slate-900">
              Your support can make a difference.
            </DialogTitle>
            <DialogDescription className="mt-4 leading-6 text-slate-600">
              Choose a donation amount, add your email, and continue to Paystack.
            </DialogDescription>
          </DialogHeader>

          {done ? (
            <div className="mt-10 flex min-h-80 flex-col items-center justify-center text-center">
              <Check className="text-emerald-700" size={48} />
              <h3 className="display mt-5 text-4xl text-slate-900">
                {paymentResult === "success" ? "Thank you for standing with us." : paymentResult === "failure" ? "Payment could not be confirmed." : "Thank you for choosing to help."}
              </h3>
              <p className="mt-3 text-slate-600">
                {paymentResult === "success" ? "Your NGN donation was verified and recorded securely." : paymentResult === "failure" ? "No funds were recorded. You can try again whenever you are ready." : "You are being redirected to Paystack's secure checkout."}
              </p>
              <Button
                onClick={() => setDone(false)}
                variant="outline"
                className="mt-7 rounded-full"
              >
                Make another choice
              </Button>
            </div>
          ) : (
            <div className="mt-8 flex flex-col gap-7">
              <div>
                <p className="mb-3 text-sm font-semibold text-slate-800">Donation amount</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[5000, 10000, 25000, 50000, 100000].map((v) => (
                    <button
                      type="button"
                      key={v}
                      onClick={() => setAmount(v)}
                      className={`rounded-xl border px-3 py-4 text-sm font-semibold transition ${amount === v ? "border-emerald-700 bg-emerald-50 text-[#2f5d54]" : "border-slate-200 bg-white text-slate-800 hover:border-slate-300"}`}
                    >
                      {symbol}{formatNaira(v)}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setAmount("")}
                    className={`rounded-xl border px-3 py-4 text-sm font-semibold ${typeof amount !== "number" ? "border-emerald-700 bg-emerald-50 text-[#2f5d54]" : "border-slate-200 bg-white text-slate-800 hover:border-slate-300"}`}
                  >
                    Custom Amount
                  </button>
                </div>
                <div className="mt-3 flex items-center rounded-xl border border-slate-200 bg-white px-4">
                  <span className="text-slate-500">{symbol}</span>
                  <input
                    inputMode="numeric"
                    type="text"
                    value={typeof amount === "number" ? formatCustomAmountInput(amount) : ""}
                    onChange={(e) => setAmount(sanitizeAmountInput(e.target.value))}
                    onKeyDown={(e) => {
                      if (/[a-zA-Z!@#$%^&*()_+=\-\[\]{};':"\\|,.<>/?`~]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    aria-label="Custom donation amount"
                    placeholder="Enter custom amount"
                    className="w-full bg-transparent px-3 py-3 outline-none text-[#2f5d54]"
                  />
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-slate-800">Email address</p>
                <Input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateForm}
                  placeholder="Email address"
                  aria-label="Email address"
                  required
                  className="h-12 rounded-xl border-slate-200 bg-white text-slate-900"
                />
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <div className="flex items-center gap-3">
                  <CreditCard className="text-emerald-700" />
                  <span>Paystack secure payment · NGN only</span>
                </div>
              </div>

              {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

              <Button
                onClick={beginPayment}
                disabled={processing}
                className="h-12 w-full rounded-md border border-[#1a6658] bg-[#1a6658] px-6 text-[0.72rem] font-semibold tracking-[.12em] text-white uppercase shadow-sm transition-colors hover:border-[#154d44] hover:bg-[#154d44] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-[#9bb6ad] disabled:bg-[#f2f7f5] disabled:text-[#7a8d87]"
              >
                {processing ? "Connecting To Paystack..." : "Continue To Payment"} <Lock data-icon="inline-end" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
function Sponsors({ supporters = [] }) {
  const [page, setPage] = useState(1);
  const per = 4;
  const total = Math.ceil(supporters.length / per);
  const visible = supporters.slice((page - 1) * per, page * per);
  return (
    <section className="border-t bg-white py-16">
      <div className="container-wide">
        <SectionHeading
          eyebrow="With gratitude"
          title="People who make this possible"
          description="Individual supporters across Nigeria and beyond help local partners keep vital work moving."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map(([name, desc, role, image]) => (
            <article
              key={name}
              className="overflow-hidden rounded-2xl border bg-background"
            >
              <img
                src={image}
                alt={`${name}, ${role}`}
                className="aspect-[1.05] w-full object-cover"
              />
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {role}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {desc}
                </p>
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
function FirstVisit() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("nourish-welcomed")) setOpen(true);
  }, []);
  const close = () => {
    localStorage.setItem("nourish-welcomed", "1");
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) close();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="display text-3xl">
            Before you help
          </DialogTitle>
          <DialogDescription className="leading-6">
            Your donation supports hunger relief, emergency assistance,
            community support and sustainable humanitarian programs across
            Nigeria.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-2xl bg-secondary p-4">
          <p className="text-sm font-semibold">Accepted currencies</p>
          <p className="mt-2 text-sm text-muted-foreground">
            ₦ Nigerian Naira (NGN) only
          </p>
        </div>
        <Button onClick={close} className="rounded-md">
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
}
function Home() {
  const [donate, setDonate] = useState(false);
  const [siteData, setSiteData] = useState(emptySiteData);

  useEffect(() => {
    let ignore = false;

    async function loadSiteData() {
      try {
        const response = await fetch("/api/site-data");
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        if (!ignore && data) {
          setSiteData({
            navItems: data.navItems || emptySiteData.navItems,
            programs: data.programs || [],
            articles: data.articles || [],
            impactStats: data.impactStats || [],
            pageCopy: data.pageCopy || emptySiteData.pageCopy,
            values: data.values || emptySiteData.values,
            supporters: data.supporters || [],
          });
        }
      } catch (error) {
        console.error("Failed to load site data", error);
      }
    }

    loadSiteData();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <Navbar onDonate={() => setDonate(true)} navItems={siteData.navItems} />
      <FirstVisit />
      <main>
        <Hero onDonate={() => setDonate(true)} />
        <Impact impactStats={siteData.impactStats} />
        <Why />
        <Programs programs={siteData.programs} />
        <Campaign onDonate={() => setDonate(true)} />
        <News articles={siteData.articles} />
        <DonationSection />
        <Community />
        <Sponsors supporters={siteData.supporters} />
      </main>
      <Footer />
      <DonationExperience open={donate} onOpenChange={setDonate} />
    </>
  );
}
function Inner({ type }) {
  const [donate, setDonate] = useState(false);
  const [siteData, setSiteData] = useState(emptySiteData);

  useEffect(() => {
    let ignore = false;

    async function loadSiteData() {
      try {
        const response = await fetch("/api/site-data");
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        if (!ignore && data) {
          setSiteData({
            navItems: data.navItems || [],
            programs: data.programs || [],
            articles: data.articles || [],
            impactStats: data.impactStats || [],
            pageCopy: data.pageCopy || {},
            values: data.values || [],
            supporters: data.supporters || [],
            gallery: data.gallery || [],
          });
        }
      } catch (error) {
        console.error("Failed to load site data", error);
      }
    }

    loadSiteData();
    return () => {
      ignore = true;
    };
  }, []);

  const copy = siteData.pageCopy[type] || {};
  return (
    <>
      <Navbar onDonate={() => setDonate(true)} navItems={siteData.navItems} />
      <main>
        <Hero copy={copy} onDonate={() => setDonate(true)} />
        {type === "/impact" ? (
          <>
            <Impact impactStats={siteData.impactStats} />
            <Why />
          </>
        ) : type === "/our-work" ? (
          <>
            <Programs programs={siteData.programs} />
            <WorkArchive gallery={siteData.gallery} />
          </>
        ) : (
          <section className="container-wide py-24">
            <SectionHeading
              eyebrow="What guides us"
              title="Rooted in people. Focused on progress."
              description="Upliftment Against Hunger Initiative NG (UAHIN) was founded by Nigerians who believe food is a foundation for dignity, learning and possibility."
            />
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {siteData.values.map((v) => (
                <div key={v.title} className="rounded-2xl bg-white p-7">
                  <Plus className="text-primary" />
                  <h3 className="mt-8 text-xl font-semibold">{v.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {v.text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
        {type !== "/our-work" && <Campaign onDonate={() => setDonate(true)} />}
      </main>
      <Footer />
      <DonationExperience open={donate} onOpenChange={setDonate} />
    </>
  );
}
function Stories() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function loadStories() {
      try {
        const response = await fetch("/api/site-data");
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error("Failed to load stories", error);
      }
    }

    loadStories();
  }, []);

  return (
    <>
      <Navbar onDonate={() => {}} navItems={emptySiteData.navItems} />
      <main>
        <div className="container-wide py-20">
          <SectionHeading
            eyebrow="From the field"
            title="Stories that move us forward."
            description="Reporting, reflections and updates from communities and the people working alongside them."
          />
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {articles.map((a) => (
              <article key={a.slug} className="group">
                <Link to={`/stories/${a.slug}`}>
                  <div className="aspect-[1.6] overflow-hidden rounded-3xl">
                    <img
                      src={a.image}
                      alt=""
                      className="size-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-primary">
                    {a.category} · {a.date}
                  </p>
                  <h2 className="display mt-2 text-4xl group-hover:text-primary">
                    {a.title}
                  </h2>
                  <p className="mt-3 text-muted-foreground">{a.excerpt}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
function Article({ slug }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function loadArticles() {
      try {
        const response = await fetch("/api/site-data");
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error("Failed to load article", error);
      }
    }

    loadArticles();
  }, []);

  const a = articles.find((story) => story.slug === slug) || articles[0];
  if (!a) {
    return null;
  }

  const storyText = a.content || a.body || "";
  const paragraphs = typeof storyText === "string" ? storyText.split(/\n\s*\n/) : Array.isArray(a.body) ? a.body : [];
  const relatedStories = articles.filter((story) => story.slug !== a.slug).slice(0, 3);

  return (
    <>
      <Navbar onDonate={() => {}} navItems={emptySiteData.navItems} />
      <main className="container-wide py-16">
        <Link to="/stories" className="text-sm text-primary">
          ← Back to stories
        </Link>
        <article className="mx-auto max-w-5xl">
          <p className="mt-12 text-xs font-semibold uppercase tracking-widest text-primary">
            {a.category} · {a.date}
          </p>
          <h1 className="display mt-5 text-5xl leading-none md:text-7xl lg:text-[5.5rem]">
            {a.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
            {a.excerpt}
          </p>
          <p className="mt-4 text-sm font-medium text-[#536860]">Words by {a.author}</p>
          <img
            src={a.image}
            alt=""
            className="mt-10 aspect-[1.8] w-full rounded-[1.6rem] object-cover"
          />
          <div className="mx-auto mt-12 max-w-3xl space-y-7">
            {paragraphs.map((x, index) => (
              <p key={`${a.slug}-${index}`} className="text-lg leading-8 text-foreground/80 md:text-xl md:leading-9">
                {x}
              </p>
            ))}
          </div>
        </article>

        {relatedStories.length > 0 && (
          <section className="mx-auto mt-20 max-w-5xl border-t border-[#e8e4df] pt-12">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">
              More stories
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {relatedStories.map((story) => (
                <Link key={story.slug} to={`/stories/${story.slug}`} className="group block">
                  <div className="overflow-hidden rounded-2xl">
                    <img src={story.image} alt="" className="aspect-[1.15] w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-[.15em] text-primary">
                    {story.category}
                  </p>
                  <h2 className="mt-2 display text-3xl leading-tight group-hover:text-primary">
                    {story.title}
                  </h2>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
function ArticleRoute() {
  const location = useLocation();
  return <Article slug={location.pathname.split("/").pop()} />;
}
function PolicyPage({ title, intro, sections = [] }) {
  return (
    <>
      <Navbar onDonate={() => {}} navItems={emptySiteData.navItems} />
      <main className="container-wide py-20 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">
            Policy
          </p>
          <h1 className="display mt-5 text-5xl leading-none md:text-7xl">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">{intro}</p>}
        </div>

        <div className="mx-auto mt-12 max-w-4xl space-y-6">
          {sections.map((section) => (
            <section key={section.heading} className="rounded-[1.75rem] border border-[#e8e4df] bg-white p-6 md:p-8">
              <h2 className="display text-2xl leading-tight md:text-3xl">{section.heading}</h2>
              <div className="mt-5 space-y-4 text-base leading-7 text-[#4f635d]">
                {section.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/news" element={<Stories />} />
        <Route path="/stories/:slug" element={<ArticleRoute />} />
        <Route path="/our-work" element={<Inner type="/our-work" />} />
        <Route path="/impact" element={<Inner type="/impact" />} />
        <Route path="/about" element={<Inner type="/about" />} />
        <Route
          path="/donation-policy"
          element={
            <PolicyPage
              title="Donation Policy"
              intro="We are committed to keeping every donation transparent, secure, and used to support food security and community resilience in Nigeria."
              sections={[
                {
                  heading: "How donations are used",
                  content: [
                    "All donations are directed toward the programs and initiatives that best serve vulnerable communities across Nigeria, including food support, resilience programs, and community-led action.",
                    "We use donor funds responsibly and prioritize initiatives with measurable community impact, transparent reporting, and strong local partnerships.",
                  ],
                },
                {
                  heading: "Payment security",
                  content: [
                    "All online donations are processed through Paystack, a secure payment provider. We do not store card details on our platform.",
                    "We accept donations in NGN only and confirm payment status before a contribution is recorded as complete.",
                  ],
                },
                {
                  heading: "Refunds and changes",
                  content: [
                    "Once a payment is successfully processed, the contribution is generally considered final. If a payment fails or is not verified, no funds will be recorded as completed.",
                    "If you need support with a donation issue, please contact hello@uahin.org and we will assist as quickly as possible.",
                  ],
                },
              ]}
            />
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <PolicyPage
              title="Privacy Policy"
              intro="We respect your privacy and handle your information carefully. This policy explains what we collect and how we use it."
              sections={[
                {
                  heading: "Information we collect",
                  content: [
                    "We may collect personal information such as your name, email address, phone number, and donation-related details when you complete a form or make a donation.",
                    "We only collect what is necessary to support donations, community updates, and volunteer engagement.",
                  ],
                },
                {
                  heading: "How we use it",
                  content: [
                    "We use your information to process donations, confirm transaction status, send relevant updates, and respond to your queries.",
                    "We do not sell or rent personal information to third parties for marketing purposes.",
                  ],
                },
                {
                  heading: "Contact",
                  content: [
                    "If you have questions about privacy, please contact hello@uahin.org. We will respond to your request as promptly as possible.",
                  ],
                },
              ]}
            />
          }
        />
        <Route
          path="/terms"
          element={
            <PolicyPage
              title="Terms and Conditions"
              intro="By using our website and making a donation, you agree to the terms outlined below."
              sections={[
                {
                  heading: "Use of the website",
                  content: [
                    "This website is provided for informational and donation purposes. We aim to keep the content accurate and up to date, but it may change without notice.",
                    "You are responsible for ensuring that any information you submit is correct and complete.",
                  ],
                },
                {
                  heading: "Donations",
                  content: [
                    "All donations are voluntary and subject to successful payment verification. We accept online donations in NGN only through secure checkout.",
                    "We reserve the right to reject or cancel a donation where fraud, abuse, or technical issues are suspected.",
                  ],
                },
                {
                  heading: "Changes to these terms",
                  content: [
                    "We may update these terms from time to time to reflect operational changes, legal requirements, or improvements to the website.",
                    "Continued use of the site after updates indicates your acceptance of any revised terms.",
                  ],
                },
              ]}
            />
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
export default dynamic(() => Promise.resolve(App), { ssr: false });
