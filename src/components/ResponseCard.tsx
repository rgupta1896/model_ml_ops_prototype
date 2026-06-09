import type { AnswerBlock } from "../types";
import { SourceCitation } from "./SourceCitation";
import { ResponseAttachments } from "./ResponseAttachments";
import type { ResponseAttachment } from "../types";

type ResponseCardProps = {
  content: AnswerBlock[];
  attachments?: ResponseAttachment[];
  lastUpdated: string;
  showSources?: boolean;
};

export function ResponseCard({
  content,
  attachments,
  lastUpdated,
  showSources = true,
}: ResponseCardProps) {
  return (
    <article className="max-w-[760px]">
      <div className="space-y-5 text-[15px] leading-7 text-ink">
        {content.map((block, index) => {
          if (block.kind === "paragraph") {
            return (
              <p key={`paragraph-${index}`}>
                {block.text}
                {showSources ? <SourceCitation sources={block.sources} /> : null}
              </p>
            );
          }

          if (block.kind === "table") {
            return (
              <div key={`table-${index}`} className="space-y-3">
                <p>{block.caption}</p>
                <div className="overflow-x-auto rounded-2xl border border-[#e5e2dc] bg-white">
                  <table className="min-w-full text-left text-sm">
                    <thead className="border-b border-[#ece8e1] bg-[#faf8f4]">
                      <tr>
                        {block.headers.map((header) => (
                          <th
                            key={header}
                            className="px-4 py-3 font-medium text-[#5c5852]"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row) => (
                        <tr
                          key={row.join("-")}
                          className="border-b border-[#f0ece5] last:border-b-0"
                        >
                          {row.map((cell) => (
                            <td key={cell} className="px-4 py-3 text-ink">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {showSources ? (
                  <p>
                    <SourceCitation sources={block.sources} />
                  </p>
                ) : null}
              </div>
            );
          }

          return (
            <p
              key={`followup-${index}`}
              className="rounded-2xl border border-[#e8e4dc] bg-[#faf8f4] px-4 py-3 text-[#4b4742]"
            >
              {block.text}
            </p>
          );
        })}
      </div>

      {attachments && attachments.length > 0 ? (
        <ResponseAttachments attachments={attachments} />
      ) : null}

      <p className="mt-5 text-xs text-faint">Last updated {lastUpdated}</p>
    </article>
  );
}
