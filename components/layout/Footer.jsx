import { Mail, Globe, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "../ui/Logo";

export function Footer() {
  return (
    <footer className="bg-[#11231e] text-white">
      <div className="container-wide grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-6 text-white/60">
            Building a Nigeria where every person can access nutritious food and
            the opportunity to thrive.
          </p>
          <div className="mt-7 flex gap-3 text-white/70">
            <Mail size={18} />
            <Globe size={18} />
            <Phone size={18} />
          </div>
        </div>
        {[
          ["Organization", "About", "Our Work", "Impact", "Stories"],
          [
            "Get involved",
            "Help Now",
            "Volunteer",
            "Join our community",
            "Partner with us",
          ],
          ["Resources", "News", "Donation policy", "Privacy policy", "Terms"],
        ].map(([h, ...items]) => (
          <div key={h}>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[.18em] text-[#efb366]">
              {h}
            </h3>
            <div className="flex flex-col gap-3 text-sm text-white/65">
              {items.map((i) => (
                <Link
                  key={i}
                  to={
                    i === "About"
                      ? "/about"
                      : i === "Our Work"
                        ? "/our-work"
                        : i === "Impact"
                          ? "/impact"
                          : i === "Stories"
                            ? "/stories"
                            : "/"
                  }
                  className="hover:text-white"
                >
                  {i}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="container-wide flex flex-col gap-3 border-t border-white/15 py-6 text-xs text-white/45 md:flex-row md:justify-between">
        <span>© 2026 Upliftment Against Hunger Initiative NG (UAHIN). All rights reserved.</span>
        <span className="flex items-center gap-2">
          <Mail size={13} /> hello@uahin.org{" "}
          <Phone size={13} className="ml-3" /> +234 800 123 4567
        </span>
      </div>
    </footer>
  );
}
