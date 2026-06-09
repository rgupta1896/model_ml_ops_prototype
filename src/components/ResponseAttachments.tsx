import type { ResponseAttachment } from "../types";
import { ModelMLIcon } from "./icons/ModelMLIcon";

type ResponseAttachmentsProps = {
  attachments: ResponseAttachment[];
};

function AttachmentIcon() {
  return <ModelMLIcon className="h-4 w-4" size="sm" />;
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
              <AttachmentIcon />
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
