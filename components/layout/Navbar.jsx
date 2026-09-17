import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "../../data/site";
import { Logo } from "../ui/Logo";
import { HelpButton } from "../ui/HelpButton";

export function Navbar({ onDonate }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container-wide flex h-20 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((n) => (
            <Link
              key={n.to}
              className={`text-sm transition-colors hover:text-primary ${location.pathname.startsWith(n.to) ? "font-semibold text-primary" : "text-muted-foreground"}`}
              to={n.to}
            >
              {n.label}
            </Link>
          ))}
          <HelpButton onClick={onDonate} />
        </nav>
        <button
          aria-label="Open menu"
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="container-wide flex flex-col gap-4 border-t py-5 md:hidden">
          {navItems.map((n) => (
            <Link
              onClick={() => setOpen(false)}
              key={n.to}
              to={n.to}
              className={`text-sm transition-colors hover:text-primary ${location.pathname.startsWith(n.to) ? "font-semibold text-primary" : "text-muted-foreground"}`}
            >
              {n.label}
            </Link>
          ))}
          <HelpButton
            onClick={() => {
              setOpen(false);
              onDonate();
            }}
            className="w-fit"
          />
        </nav>
      )}
    </header>
  );
}
