import { Link } from "react-router-dom";
import Image from "next/image";

export function Logo() {
  return (
    <Link to="/" aria-label="Upliftment Against Hunger in Nigeria home" className="flex min-w-0 items-center gap-3">
      <Image src="/logo.JPG" alt="" width={44} height={44} className="size-10 shrink-0 rounded-[5px] object-cover sm:size-11" />
      <span className="min-w-0 font-semibold leading-tight tracking-tight">
        <span className="block text-xs sm:text-sm">Upliftment Against Hunger</span>
        <span className="mt-1 block text-[0.55rem] font-normal tracking-[.12em] text-muted-foreground sm:text-[0.6rem]">
          IN NIGERIA
        </span>
      </span>
    </Link>
  );
}
