import { HelpButton } from "../ui/HelpButton";

export function DonationSection({ onDonate }) {
  return (
    <section id="donate" className="bg-[#17352c] py-20 text-white">
      <div className="container-wide flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-[#efb366]">
            Give with confidence
          </p>
          <h2 className="display max-w-2xl text-5xl leading-none md:text-6xl">
            Your support can make a difference.
          </h2>
          <p className="mt-5 max-w-md leading-7 text-white/65">
            Open the same secure donation experience used by HELP NOW.
          </p>
        </div>
        <HelpButton
          onClick={onDonate}
          className="shrink-0 bg-[#efb366] text-[#11231e] hover:bg-[#f4c17d]"
        />
      </div>
    </section>
  );
}
