export function SectionHeading({ eyebrow, title, description, dark = false }) {
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
