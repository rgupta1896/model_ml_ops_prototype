export function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 rounded-[24px] border border-white/60 bg-[rgba(255,255,255,0.58)] px-5 py-4 shadow-[0_14px_28px_rgba(34,31,29,0.05)] backdrop-blur-md">
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 animate-bounce rounded-full bg-faint [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-faint [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-faint" />
      </div>
      <p className="text-sm text-muted">Ops Agent is drafting a response...</p>
    </div>
  );
}
