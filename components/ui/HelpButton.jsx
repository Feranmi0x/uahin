import { HeartHandshake } from "lucide-react";
import { Button } from "./button";

export function HelpButton({ onClick, className = "" }) {
  return (
    <Button
      onClick={onClick}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-[0.72rem] font-semibold tracking-[.12em] uppercase ${className}`}
    >
      <HeartHandshake className="size-4" />
      Give Today
    </Button>
  );
}
