export function WhyHelpSection() {
  return (
    <section className="container-wide grid gap-10 py-24 md:grid-cols-[1.1fr_.9fr] md:items-center">
      <div className="relative min-h-[25rem] overflow-hidden rounded-[2rem]">
        <img
          src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=85"
          alt="Children learning together in Nigeria"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute bottom-5 right-5 max-w-[13rem] rounded-2xl bg-[#efb366] p-5">
          <p className="display text-5xl">1 in 4</p>
          <p className="mt-2 text-sm leading-5">
            Nigerians face food insecurity. Behind every number is a neighbor.
          </p>
        </div>
      </div>
      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-primary">
          Why this matters
        </p>
        <h2 className="display max-w-2xl text-4xl leading-[1.05] md:text-6xl">
          Millions face difficult choices every day.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
          Food insecurity is shaped by rising costs, unemployment, displacement and unequal access to opportunity. We respond with urgency — and with respect.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 border-t pt-6">
          <div>
            <p className="text-3xl font-semibold">72%</p>
            <p className="mt-1 text-sm text-muted-foreground">
              of our programs are locally led
            </p>
          </div>
          <div>
            <p className="text-3xl font-semibold">₦18bn</p>
            <p className="mt-1 text-sm text-muted-foreground">
              in food value moved through communities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
