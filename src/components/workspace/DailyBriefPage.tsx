type DailyBriefPageProps = {
  scope: "For You" | "Company-wide";
};

type BriefCard = {
  title: string;
  updated: string;
  bullets: string[];
  tone: string;
  icon: "cube" | "people" | "code" | "signals";
  iconTint: string;
};

const forYouBriefs: BriefCard[] = [
  {
    title: "The Latest on Product",
    updated: "Updated 2h ago",
    bullets: [
      "Workflows now come with a larger context window",
      "Chat is now voice-enabled",
      "User feedback surfaces in workflows (beta) to close the loop faster",
    ],
    tone: "text-[#2f6b2d]",
    icon: "cube",
    iconTint: "bg-[#edf4ea] text-[#3e6d37]",
  },
  {
    title: "User Signals",
    updated: "Updated 3h ago",
    bullets: [
      "UBS onboarding patterns: asset data mapping is the top friction point",
      "Office plugin caveat: Excel add-in needs re-auth after session timeout",
      "Repeated client workflow questions around approvals and exceptions",
    ],
    tone: "text-[#2b6292]",
    icon: "people",
    iconTint: "bg-[#edf3fb] text-[#376ca1]",
  },
  {
    title: "Engineering Notes",
    updated: "Updated 5h ago",
    bullets: [
      "Fixed chat timeout issue for long-running retrieval jobs",
      "Retrieval quality improved with hybrid search + reranking",
      "New retrieval diagnostics panel shipped for faster issue triage",
    ],
    tone: "text-[#5d47b3]",
    icon: "code",
    iconTint: "bg-[#f1edfb] text-[#5d47b3]",
  },
  {
    title: "Key Insights",
    updated: "Updated 6h ago",
    bullets: [
      "7 clients added this week are engaging with workflows",
      "Churn risk: 3 accounts haven’t used key features in 14+ days",
      "Average in-session time is up 12% week over week across banking users",
    ],
    tone: "text-[#b16c17]",
    icon: "signals",
    iconTint: "bg-[#fcf3e5] text-[#b16c17]",
  },
];

const companyWideBriefs: BriefCard[] = [
  {
    title: "Business-wide Updates",
    updated: "Updated 2h ago",
    bullets: [
      "Commercial teams are leaning into QBR and stakeholder mapping playbooks",
      "Product is prioritising clearer readiness messaging across new capabilities",
      "Support volume is stable week over week across major enterprise accounts",
    ],
    tone: "text-[#2f6b2d]",
    icon: "cube",
    iconTint: "bg-[#edf4ea] text-[#3e6d37]",
  },
  {
    title: "Cross-functional Risks",
    updated: "Updated 4h ago",
    bullets: [
      "Excel add-in auth friction still appears across multiple client accounts",
      "Engineering and EM teams need a tighter caveats handoff for retrieval jobs",
      "Product launch notes are still being referenced from older decks in the field",
    ],
    tone: "text-[#2b6292]",
    icon: "people",
    iconTint: "bg-[#edf3fb] text-[#376ca1]",
  },
  {
    title: "Engineering Notes",
    updated: "Updated 5h ago",
    bullets: [
      "Reliability fixes for chat retrieval shipped and are under observation",
      "Retrieval runbook updates are now documented for the support and EM teams",
      "Open PR review backlog is trending down heading into the next sprint",
    ],
    tone: "text-[#5d47b3]",
    icon: "code",
    iconTint: "bg-[#f1edfb] text-[#5d47b3]",
  },
];

function BriefIcon({ icon }: { icon: BriefCard["icon"] }) {
  const className = "h-7 w-7";

  switch (icon) {
    case "cube":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="m12 3 8 4.5v9L12 21 4 16.5v-9L12 3Z" />
          <path d="M12 21V12M20 7.5l-8 4.5L4 7.5" />
        </svg>
      );
    case "people":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <circle cx="9" cy="8" r="2.75" />
          <circle cx="16.5" cy="9.5" r="2.25" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 18a4.5 4.5 0 0 1 9 0" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 18a3.75 3.75 0 0 1 6.75 0" />
        </svg>
      );
    case "code":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 8-4 4 4 4M15 8l4 4-4 4" />
        </svg>
      );
    case "signals":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" d="M4 19h16M7 15l3-3 3 2 5-6" />
          <path strokeLinecap="round" d="M17 8h3v3" />
        </svg>
      );
    default:
      return null;
  }
}

const quickActions = [
  "Draft my team update",
  "What changed since yesterday?",
  "Top risks to watch",
];

export function DailyBriefPage({
  scope,
}: DailyBriefPageProps) {
  const briefs = scope === "For You" ? forYouBriefs : companyWideBriefs;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
      <div className="max-w-4xl">
        <h1 className="font-serif text-[2.6rem] font-normal leading-tight tracking-[-0.03em] text-ink md:text-[3.2rem]">
          Daily Brief
        </h1>
        <p className="mt-5 text-lg text-muted">
          Your curated briefing on all things Model ML
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {briefs.map((brief) => (
          <button
            key={brief.title}
            type="button"
            className="w-full rounded-[30px] border border-[#e6dfd4] bg-white px-5 py-5 text-left shadow-[0_12px_34px_rgba(34,31,29,0.05)] transition hover:border-[#ddd4c6] hover:bg-[#fdfcf9] sm:px-7"
          >
            <div className="flex items-start gap-5">
              <span className={`mt-1 flex h-20 w-20 flex-none items-center justify-center rounded-[28px] ${brief.iconTint}`}>
                <BriefIcon icon={brief.icon} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className={`text-[1.7rem] font-medium leading-tight ${brief.tone}`}>
                      {brief.title}
                    </h2>
                  </div>
                  <span className="mt-1 text-sm text-faint">{brief.updated} →</span>
                </div>
                <ul className="mt-4 space-y-2 text-[18px] leading-8 text-ink">
                  {brief.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-[0.8rem] h-1.5 w-1.5 flex-none rounded-full bg-[#54504b]" />
                      <span className="flex-1">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-[28px] border border-[#e6dfd4] bg-white px-5 py-5 shadow-[0_10px_30px_rgba(34,31,29,0.04)]">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-3 text-sm font-medium text-ink">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fcf3e5] text-[#b16c17]">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m13 2-6 10h5l-1 10 6-10h-5l1-10Z" />
              </svg>
            </span>
            Quick actions
          </span>
          <div className="flex flex-1 flex-wrap gap-3">
            {quickActions.map((action) => (
              <button
                key={action}
                type="button"
                className="rounded-full border border-[#e6dfd4] bg-[#faf8f4] px-5 py-2.5 text-sm font-medium text-[#4b4742] transition hover:border-[#d6cebf] hover:bg-white"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
