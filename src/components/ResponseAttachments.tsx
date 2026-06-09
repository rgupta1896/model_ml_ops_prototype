import type { ResponseAttachment } from "../types";

type ResponseAttachmentsProps = {
  attachments: ResponseAttachment[];
};

function AttachmentIcon({ type }: { type: ResponseAttachment["type"] }) {
  const className = "h-4 w-4 text-[#c45c2d]";

  if (type === "spreadsheet") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path strokeLinecap="round" d="M4 4h12l4 4v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        <path strokeLinecap="round" d="M14 4v4h4M8 13h8M8 17h5" />
      </svg>
    );
  }

  if (type === "document") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 4h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        <path strokeLinecap="round" d="M14 4v5h5M8 13h8M8 17h8" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path strokeLinecap="round" d="M8 20h8M12 16v4" />
    </svg>
  );
}

export function ResponseAttachments({ attachments }: ResponseAttachmentsProps) {
  return (
    <div className="mt-6 space-y-2">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-faint">
        Attachments
      </p>
      <div className="space-y-2">
        {attachments.map((attachment) => (
          <button
            key={attachment.name}
            type="button"
            className="flex w-full items-start gap-3 rounded-2xl border border-[#e5e2dc] bg-[#faf8f4] px-4 py-3 text-left transition hover:border-[#d4cfc6] hover:bg-white"
          >
            <div className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-[#fff3eb]">
              <AttachmentIcon type={attachment.type} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">{attachment.name}</p>
              <p className="mt-1 text-sm leading-6 text-muted">{attachment.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
