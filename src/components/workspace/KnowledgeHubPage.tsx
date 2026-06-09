import { useMemo, useState } from "react";
import type { Role } from "../../types";

type CollectionCard = {
  title: string;
  count: string;
  icon: "cap" | "target" | "code" | "book" | "map" | "chat" | "user" | "doc" | "spark" | "shield" | "message" | "pod";
  tint: string;
};

type HubFilter = "For You" | Role;

const collectionsByRole: Record<Role, CollectionCard[]> = {
  EM: [
    { title: "Engagement Lessons", count: "24 items", icon: "cap", tint: "bg-[#fcf3df] text-[#b8862b]" },
    { title: "Client Workflow Patterns", count: "21 items", icon: "map", tint: "bg-[#f1ebf8] text-[#8666b2]" },
    { title: "Case Jam Learnings", count: "15 items", icon: "chat", tint: "bg-[#fbede6] text-[#b56f35]" },
    { title: "Stakeholder Mapping", count: "12 items", icon: "pod", tint: "bg-[#eaf4f6] text-[#3c7b8f]" },
    { title: "Capability Notes", count: "22 items", icon: "doc", tint: "bg-[#eef3fb] text-[#5a82ba]" },
    { title: "Prompt Library", count: "31 items", icon: "spark", tint: "bg-[#f1ebf8] text-[#8666b2]" },
  ],
  Sales: [
    { title: "Sales & GTM Rituals", count: "18 items", icon: "target", tint: "bg-[#eaf6ef] text-[#428764]" },
    { title: "Objection Handling", count: "14 items", icon: "message", tint: "bg-[#fcf3df] text-[#b8862b]" },
    { title: "Case Jam Learnings", count: "15 items", icon: "chat", tint: "bg-[#fbede6] text-[#b56f35]" },
    { title: "Client Workflow Patterns", count: "21 items", icon: "map", tint: "bg-[#f1ebf8] text-[#8666b2]" },
    { title: "Capability Notes", count: "22 items", icon: "doc", tint: "bg-[#eef3fb] text-[#5a82ba]" },
    { title: "Pod Briefs", count: "23 items", icon: "pod", tint: "bg-[#eaf4f6] text-[#3c7b8f]" },
  ],
  Product: [
    { title: "Product Playbooks", count: "27 items", icon: "book", tint: "bg-[#fbede6] text-[#b56f35]" },
    { title: "Prompt Library", count: "31 items", icon: "spark", tint: "bg-[#f1ebf8] text-[#8666b2]" },
    { title: "Case Jam Learnings", count: "15 items", icon: "chat", tint: "bg-[#fbede6] text-[#b56f35]" },
    { title: "Capability Notes", count: "22 items", icon: "doc", tint: "bg-[#eef3fb] text-[#5a82ba]" },
    { title: "QA & Caveats", count: "17 items", icon: "shield", tint: "bg-[#eef0f2] text-[#69717d]" },
    { title: "Pod Briefs", count: "23 items", icon: "pod", tint: "bg-[#eaf4f6] text-[#3c7b8f]" },
  ],
  Engineering: [
    { title: "Engineering Bible", count: "32 items", icon: "code", tint: "bg-[#eef3fb] text-[#5a82ba]" },
    { title: "QA & Caveats", count: "17 items", icon: "shield", tint: "bg-[#eef0f2] text-[#69717d]" },
    { title: "Capability Notes", count: "22 items", icon: "doc", tint: "bg-[#eef3fb] text-[#5a82ba]" },
    { title: "Prompt Library", count: "31 items", icon: "spark", tint: "bg-[#f1ebf8] text-[#8666b2]" },
    { title: "Case Jam Learnings", count: "15 items", icon: "chat", tint: "bg-[#fbede6] text-[#b56f35]" },
    { title: "Pod Briefs", count: "23 items", icon: "pod", tint: "bg-[#eaf4f6] text-[#3c7b8f]" },
  ],
};

const forYouCollections: CollectionCard[] = [
  { title: "Engagement Lessons", count: "24 items", icon: "cap", tint: "bg-[#fcf3df] text-[#b8862b]" },
  { title: "Client Workflow Patterns", count: "21 items", icon: "map", tint: "bg-[#f1ebf8] text-[#8666b2]" },
  { title: "Case Jam Learnings", count: "15 items", icon: "chat", tint: "bg-[#fbede6] text-[#b56f35]" },
  { title: "Product Playbooks", count: "27 items", icon: "book", tint: "bg-[#fbede6] text-[#b56f35]" },
  { title: "Engineering Bible", count: "32 items", icon: "code", tint: "bg-[#eef3fb] text-[#5a82ba]" },
];

function SearchIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path strokeLinecap="round" d="m16 16 4 4" />
    </svg>
  );
}

function KbdIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="4" y="5.5" width="16" height="13" rx="3" />
      <path strokeLinecap="round" d="M9 12h6M12 9v6" />
    </svg>
  );
}

function CollectionIcon({ icon }: { icon: CollectionCard["icon"] }) {
  const className = "h-5 w-5";

  switch (icon) {
    case "cap":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="m3 10 9-4 9 4-9 4-9-4Z" />
          <path strokeLinecap="round" d="M7 12.5v4.2c0 .6 2.3 2.3 5 2.3s5-1.7 5-2.3v-4.2" />
        </svg>
      );
    case "code":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 8-4 4 4 4M15 8l4 4-4 4" />
        </svg>
      );
    case "book":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4H19v14H7.5A2.5 2.5 0 0 0 5 20.5v-14Z" />
          <path d="M5 6.5A2.5 2.5 0 0 0 2.5 4H2v14h.5A2.5 2.5 0 0 1 5 20.5" />
        </svg>
      );
    case "map":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="M4 19V8l6-3 4 3 6-3v11l-6 3-4-3-6 3Z" />
          <path d="M10 5v11M14 8v11" />
        </svg>
      );
    case "chat":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6A2.5 2.5 0 0 1 16.5 15H10l-5 5v-5.5A2.5 2.5 0 0 1 2.5 12V6.5Z" />
        </svg>
      );
    case "user":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <circle cx="12" cy="8" r="3.25" />
          <path strokeLinecap="round" d="M5.5 19a6.5 6.5 0 0 1 13 0" />
        </svg>
      );
    case "doc":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="M7 4h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
          <path d="M14 4v5h5M8 13h8M8 17h5" />
        </svg>
      );
    case "spark":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="m12 3 1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3Z" />
          <path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" />
        </svg>
      );
    case "shield":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="m12 3 7 3v5c0 4.4-2.8 8.4-7 10-4.2-1.6-7-5.6-7-10V6l7-3Z" />
        </svg>
      );
    case "message":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6A2.5 2.5 0 0 1 16.5 15H9l-4 4v-4.5A2.5 2.5 0 0 1 2.5 12V6.5Z" />
        </svg>
      );
    case "pod":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <circle cx="8" cy="8.5" r="2.5" />
          <circle cx="16" cy="8.5" r="2.5" />
          <path strokeLinecap="round" d="M3.5 18a4.5 4.5 0 0 1 9 0M11.5 18a4.5 4.5 0 0 1 9 0" />
        </svg>
      );
    default:
      return null;
  }
}

function FilterPill({
  label,
  active = false,
  onClick,
}: {
  label: HubFilter;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-accentStrong bg-accentStrong text-mist"
          : "border-[#e6dfd4] bg-white text-[#5c5852] hover:border-[#d6cebf] hover:bg-[#faf8f4]"
      }`}
    >
      {label}
    </button>
  );
}

export function KnowledgeHubPage() {
  const [activeFilter, setActiveFilter] = useState<HubFilter>("For You");

  const collections = useMemo(
    () => (activeFilter === "For You" ? forYouCollections : collectionsByRole[activeFilter]),
    [activeFilter],
  );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
      <div className="max-w-3xl">
        <h1 className="font-serif text-[2.6rem] font-normal leading-tight tracking-[-0.03em] text-ink md:text-[3.2rem]">
          The Hub
        </h1>
        <p className="mt-5 text-lg text-muted">
          Curated playbooks, learnings, and references
        </p>
      </div>

      <div className="mt-8 flex max-w-xl items-center gap-3 rounded-[22px] border border-[#e4ddd2] bg-white px-4 py-3 shadow-[0_8px_28px_rgba(34,31,29,0.04)]">
        <span className="text-faint">
          <SearchIcon />
        </span>
        <span className="flex-1 text-[15px] text-faint">Search knowledge…</span>
        <span className="inline-flex items-center gap-1 rounded-xl border border-[#ece6dc] bg-[#faf8f4] px-2.5 py-1 text-xs text-faint">
          <KbdIcon />
          K
        </span>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {(["For You", "EM", "Sales", "Product", "Engineering"] as const).map((filter) => (
          <FilterPill
            key={filter}
            label={filter}
            active={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          />
        ))}
      </div>

      <section className="mt-8 grid gap-4 pb-10 sm:grid-cols-2 xl:grid-cols-4">
        {collections.map((card) => (
          <button
            key={card.title}
            type="button"
            className="rounded-[26px] border border-[#e6dfd4] bg-white px-5 py-5 text-left shadow-[0_10px_30px_rgba(34,31,29,0.04)] transition hover:border-[#ddd4c6] hover:bg-[#fdfcf9]"
          >
            <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.tint}`}>
              <CollectionIcon icon={card.icon} />
            </span>
            <p className="mt-5 text-[1.35rem] font-medium leading-8 text-ink">{card.title}</p>
            <p className="mt-1 text-sm text-muted">{card.count}</p>
          </button>
        ))}
      </section>
    </div>
  );
}
