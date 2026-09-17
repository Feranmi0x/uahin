import Link from "react-router-dom";
import { Heart } from "lucide-react";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground">
        <Heart fill="currentColor" size={19} />
      </span>
      <span className="font-semibold tracking-tight">
        UAHIN
        <br />
        <span className="text-[0.6rem] font-normal tracking-[.18em] text-muted-foreground">
          UPLIFTMENT AGAINST HUNGER
        </span>
      </span>
    </Link>
  );
}
