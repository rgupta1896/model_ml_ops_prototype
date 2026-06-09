import type { PromptDefinition } from "../types";

type PromptCardProps = {
  prompt: PromptDefinition;
  onClick: (prompt: PromptDefinition) => void;
};

export function PromptCard({ prompt, onClick }: PromptCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(prompt)}
      className="group relative flex h-full min-h-40 flex-col justify-between rounded-[1.65rem] border border-white/55 bg-[rgba(244,247,251,0.72)] p-5 text-left shadow-[0_18px_34px_rgba(34,31,29,0.06)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/75 hover:bg-[rgba(248,250,253,0.86)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentStrong/20 focus-visible:ring-offset-2"
    >
      <span className="absolute right-5 top-5 text-sm text-faint transition group-hover:text-ink">
        ↗
      </span>
      <div>
        <span className="inline-flex rounded-full border border-white/75 bg-[rgba(255,255,255,0.6)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-faint">
          {prompt.role}
        </span>
        <p className="mt-6 max-w-[19rem] text-[1.05rem] leading-7 text-ink">{prompt.text}</p>
      </div>
      <span className="mt-8 text-sm text-muted transition group-hover:text-ink">
        {prompt.primary ? "Start here" : "Open prompt"}
      </span>
    </button>
  );
}
