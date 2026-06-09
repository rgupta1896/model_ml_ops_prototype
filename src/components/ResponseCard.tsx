type ResponseCardProps = {
  content: string[];
  sources: string[];
  lastUpdated: string;
};

export function ResponseCard({
  content,
  sources,
  lastUpdated,
}: ResponseCardProps) {
  return (
    <article className="rounded-[24px] border border-white/65 bg-[rgba(255,255,255,0.62)] p-6 shadow-[0_18px_34px_rgba(34,31,29,0.06)] backdrop-blur-md">
      <div className="space-y-4 text-[15px] leading-7 text-[#37332f]">
        {content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-6 border-t border-sand/80 pt-4 text-sm text-muted">
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-medium text-ink">Source:</span>{" "}
            {sources.map((source, index) => (
              <span key={source}>
                <a
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  className="underline decoration-sand underline-offset-4 transition hover:text-ink"
                >
                  {source}
                </a>
                {index < sources.length - 1 ? " / " : ""}
              </span>
            ))}
          </p>
          <p>
            <span className="font-medium text-ink">Last updated:</span>{" "}
            {lastUpdated}
          </p>
        </div>
      </div>
    </article>
  );
}
