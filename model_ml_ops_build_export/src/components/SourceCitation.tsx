import type { SourceCitation as SourceCitationType } from "../types";
import { SourceProviderIcon } from "./icons/SourceIcons";

type SourceCitationProps = {
  sources: SourceCitationType[];
};

export function SourceCitation({ sources }: SourceCitationProps) {
  if (sources.length === 0) {
    return null;
  }

  const [primary, ...rest] = sources;

  return (
    <span className="ml-1.5 inline-flex items-center gap-1 align-baseline">
      <a
        href={primary.url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 rounded-full border border-[#e5e2dc] bg-[#f3f1ec] px-2 py-0.5 text-[11px] font-medium text-[#5c5852] transition hover:border-[#d4cfc6] hover:bg-[#ebe8e2] hover:text-ink"
        onClick={primary.url === "#" ? (event) => event.preventDefault() : undefined}
      >
        <SourceProviderIcon provider={primary.provider} className="h-3 w-3 flex-none" />
        <span>{primary.label}</span>
      </a>
      {rest.length > 0 ? (
        <span className="inline-flex items-center rounded-full border border-[#e5e2dc] bg-[#f3f1ec] px-1.5 py-0.5 text-[11px] font-medium text-[#5c5852]">
          +{rest.length}
        </span>
      ) : null}
    </span>
  );
}
