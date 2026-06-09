import { PromptIconGlyph } from "./icons/PromptIcons";
import type { PromptDefinition } from "../types";

type SuggestedPromptPillProps = {
  prompt: PromptDefinition;
  onClick: (prompt: PromptDefinition) => void;
};

export function SuggestedPromptPill({ prompt, onClick }: SuggestedPromptPillProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(prompt)}
      className="inline-flex items-center gap-2 rounded-full border border-[#ddd8cf] bg-white px-4 py-2.5 text-sm text-[#4b4742] shadow-[0_1px_2px_rgba(34,31,29,0.04)] transition hover:border-[#cfc9be] hover:bg-[#faf9f7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentStrong/20"
    >
      <PromptIconGlyph icon={prompt.icon} className="h-3.5 w-3.5 text-faint" />
      <span>{prompt.text}</span>
    </button>
  );
}
