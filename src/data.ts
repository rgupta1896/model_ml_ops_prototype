import type { DemoResponse, PromptDefinition, Role } from "./types";

export const roles: Role[] = ["EM", "Sales", "Product", "Engineering"];

const responses: Record<string, DemoResponse> = {
  "office-plugin": {
    role: "Sales",
    prompt: "Can I demo the Office Plugin to a client this week?",
    answer: [
      {
        kind: "paragraph",
        text: "Yes — you can demo the Office Plugin this week, but only as a controlled demo using the approved Demo v3 flow.",
        sources: [
          {
            label: "Linear ML-2481",
            url: "https://linear.app",
            provider: "linear",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "Position it as a workflow accelerator for document-heavy teams. Avoid describing it as generally available for full enterprise rollout. The main caveat is formatting: complex templates, tables and client-specific layouts may still need manual review.",
        sources: [
          {
            label: "Slack #office-plugin-demo",
            url: "https://slack.com",
            provider: "slack",
          },
          {
            label: "Notion · Demo v3 flow",
            url: "https://notion.so",
            provider: "notion",
          },
        ],
      },
    ],
    lastUpdated: "8 Jun 2026",
  },
  "goldman-sachs": {
    role: "Sales",
    prompt: "What's the talk track for Goldman Sachs?",
    answer: [
      {
        kind: "paragraph",
        text: "Goldman Sachs is best aligned to three Model ML workflows today: investment memo drafting, earnings synthesis, and client meeting prep from internal research packs.",
        sources: [
          {
            label: "GS account brief",
            url: "https://notion.so",
            provider: "notion",
          },
        ],
      },
      {
        kind: "table",
        caption: "GS workflow alignment and where to take the conversation:",
        headers: ["Workflow", "Model ML fit", "Lead with", "Take it to"],
        rows: [
          [
            "Investment memo drafting",
            "High — source-backed drafting with citation tracing",
            "Time saved on first-draft memos",
            "Pilot on one sector team with a clean source pack",
          ],
          [
            "Earnings synthesis",
            "High — multi-doc synthesis across filings and research",
            "Faster post-earnings note turnaround",
            "Controlled demo using approved earnings workflow",
          ],
          [
            "Client meeting prep",
            "Medium — strong on structured packs, weaker on ad-hoc notes",
            "Prep briefs from approved research corpus",
            "Workflow walkthrough, not full rollout promise",
          ],
        ],
        sources: [
          {
            label: "Slack #gs-sales",
            url: "https://slack.com",
            provider: "slack",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "Pitch triage: if the buyer cares about speed on written research, lead with investment memo drafting. If the room is markets-facing, open with earnings synthesis. If they're exploratory, start with meeting prep and position the broader platform as a follow-on expansion path.",
        sources: [
          {
            label: "Case Jam: Banking talk tracks",
            url: "#",
            provider: "casejam",
          },
        ],
      },
    ],
    lastUpdated: "9 Jun 2026",
  },
  "ubs-onboarding": {
    role: "EM",
    prompt: "What should I know before joining the UBS Asset Management account?",
    answer: [
      {
        kind: "paragraph",
        text: "Start with the investment memo workflow. UBS Asset Management is using Model ML around research synthesis and memo drafting, so the highest-leverage context is source-pack setup, source-backed answers, citation tracing and document export.",
        sources: [
          {
            label: "UBS onboarding brief",
            url: "https://notion.so",
            provider: "notion",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "Before joining, review the current asset management demo deck, the investment memo workflow, and the Office Plugin caveats. The main pitfalls are relying on messy scanned PDFs for citation-heavy outputs, using old Office Plugin demo scripts, or showing the Grids dashboard externally before it is approved.",
        sources: [
          {
            label: "Case Jam: Investment Memo",
            url: "#",
            provider: "casejam",
          },
          {
            label: "Slack #em-ubs",
            url: "https://slack.com",
            provider: "slack",
          },
        ],
      },
    ],
    attachments: [
      {
        name: "UBS Asset Management — Account Overview.pptx",
        type: "presentation",
        description: "Client-facing overview deck built for the account team.",
      },
      {
        name: "Investment Memo Workflow — Demo Deck.pptx",
        type: "presentation",
        description: "Walkthrough of the recommended workflow and live demo flow.",
      },
      {
        name: "UBS Source Pack Checklist.pdf",
        type: "document",
        description: "Checklist for source-pack setup, citations, and export caveats.",
      },
    ],
    lastUpdated: "8 Jun 2026",
  },
  "user-churn": {
    role: "EM",
    prompt: "Which users churned in the last week?",
    answer: [
      {
        kind: "paragraph",
        text: "Three users churned in the last 7 days across your managed accounts. Their last recorded activity is below.",
        sources: [
          {
            label: "Product analytics",
            url: "https://notion.so",
            provider: "notion",
          },
        ],
      },
      {
        kind: "table",
        caption: "Users who churned in the last week:",
        headers: ["User", "Account", "Last recorded activity"],
        rows: [
          ["Sarah Chen", "Northshore Capital", "Exported 2 memos · 4 Jun 2026"],
          ["James Okonkwo", "Helios Partners", "Used Note-Taker · 3 Jun 2026"],
          ["Priya Mehta", "Cedar Ridge AM", "Viewed onboarding brief · 2 Jun 2026"],
        ],
        sources: [
          {
            label: "Usage dashboard",
            url: "https://linear.app",
            provider: "linear",
          },
        ],
      },
      {
        kind: "followUp",
        text: "Would you like me to draft and send a follow-up email to these users?",
      },
    ],
    lastUpdated: "9 Jun 2026",
  },
  "field-feedback": {
    role: "Product",
    prompt: "What user feedback should I prioritise this week?",
    answer: [
      {
        kind: "paragraph",
        text: "Prioritise three items: Office Plugin readiness confusion, citation quality on messy PDFs, and Grids dashboard expectations.",
        sources: [
          {
            label: "Weekly User Sync",
            url: "https://notion.so",
            provider: "notion",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "Office Plugin confusion is the most urgent because Sales and EMs are unclear on whether it is sellable, demoable or pilot-only. Citation quality is showing up across document-heavy workflows, especially where source packs include messy PDFs. The Grids issue is mainly expectation-setting: older screenshots are still appearing in client-facing materials even though the current dashboard view remains internal-only.",
        sources: [
          {
            label: "Slack #product-user-questions",
            url: "https://slack.com",
            provider: "slack",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "I'd clarify sell/demo/deploy guidance for the Office Plugin, define source-pack quality thresholds for citation tracing, and remove outdated Grids dashboard assets from client-facing decks.",
        sources: [
          {
            label: "Linear ML-2310",
            url: "https://linear.app",
            provider: "linear",
          },
          {
            label: "Grids Pod notes",
            url: "https://notion.so",
            provider: "product",
          },
        ],
      },
    ],
    lastUpdated: "8 Jun 2026",
  },
  "roadmap-progress": {
    role: "Product",
    prompt: "How are we tracking against the roadmap this quarter?",
    answer: [
      {
        kind: "paragraph",
        text: "Q2 stock-take: three roadmap bets are on track, two are at risk, and one needs a scope reset before the next field sync.",
        sources: [
          {
            label: "Q2 Roadmap",
            url: "https://notion.so",
            provider: "notion",
          },
        ],
      },
      {
        kind: "table",
        caption: "Roadmap progress snapshot:",
        headers: ["Initiative", "Status", "Progress", "Risk"],
        rows: [
          ["Office Plugin GA readiness", "At risk", "62%", "Sell/demo guidance still unclear in field"],
          ["Citation quality uplift", "On track", "78%", "Pilot metrics improving on clean PDFs"],
          ["Grids dashboard v2", "On track", "81%", "External comms still using old screenshots"],
          ["Chat retrieval reliability", "On track", "74%", "Retry flow shipped; monitoring continues"],
          ["Enterprise admin controls", "Needs reset", "41%", "Scope broader than current pod capacity"],
          ["Workflow templates library", "On track", "69%", "EM adoption uneven across verticals"],
        ],
        sources: [
          {
            label: "Linear roadmap view",
            url: "https://linear.app",
            provider: "linear",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "Recommendation: re-baseline enterprise admin controls, publish clearer Office Plugin readiness guidance this week, and use the next product review to confirm whether Grids v2 can absorb the admin work in Q3.",
        sources: [
          {
            label: "Slack #product-leads",
            url: "https://slack.com",
            provider: "slack",
          },
        ],
      },
    ],
    lastUpdated: "9 Jun 2026",
  },
  "chat-bug-fix": {
    role: "Engineering",
    prompt: "What changed in the latest Chat product bug fix?",
    answer: [
      {
        kind: "paragraph",
        text: "The latest Chat bug fix improved source retrieval timeout handling. When large source packs take too long to retrieve, Chat now shows a retry state instead of failing silently.",
        sources: [
          {
            label: "Linear CHAT-1842",
            url: "https://linear.app",
            provider: "linear",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "This should reduce failed responses in large-document workflows, especially for banking and asset management pilots. The caveat stays in place for now: clean, structured source packs should perform better, but messy scanned PDFs may still reduce answer quality and citation reliability.",
        sources: [
          {
            label: "Slack #chat-product",
            url: "https://slack.com",
            provider: "slack",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "Engineering should monitor timeout rate, retry success rate and failed response rate over the next week before the field caveat is downgraded.",
        sources: [
          {
            label: "Engineering runbook",
            url: "https://notion.so",
            provider: "engineering",
          },
        ],
      },
    ],
    lastUpdated: "8 Jun 2026",
  },
  "pr-reviews": {
    role: "Engineering",
    prompt: "Summarise the open review comments on my PRs",
    answer: [
      {
        kind: "paragraph",
        text: "You have four PRs with open review comments across Chat and Platform. Two need action before merge, one is waiting on reviewer sign-off, and one is blocked on a dependency.",
        sources: [
          {
            label: "GitHub PR inbox",
            url: "https://github.com",
            provider: "github",
          },
        ],
      },
      {
        kind: "table",
        caption: "Open PR review summary:",
        headers: ["PR", "Status", "Action needed", "Deadline"],
        rows: [
          [
            "CHAT-1924 · Retry backoff tuning",
            "Changes requested",
            "Add integration test for timeout edge case",
            "11 Jun 2026",
          ],
          [
            "CHAT-1917 · Source pack size guard",
            "Approved with nits",
            "Rename helper + update runbook note",
            "10 Jun 2026",
          ],
          [
            "PLAT-884 · Admin role mapping",
            "Waiting on review",
            "Ping @platform-security for approval",
            "12 Jun 2026",
          ],
          [
            "CHAT-1902 · Retrieval cache layer",
            "Blocked",
            "Unblock after PLAT-872 lands",
            "13 Jun 2026",
          ],
        ],
        sources: [
          {
            label: "Linear CHAT sprint",
            url: "https://linear.app",
            provider: "linear",
          },
        ],
      },
      {
        kind: "followUp",
        text: "Would you like me to draft replies to the outstanding review comments on CHAT-1924 and CHAT-1917?",
      },
    ],
    lastUpdated: "9 Jun 2026",
  },
};

export const promptsByRole: Record<Role, PromptDefinition[]> = {
  EM: [
    {
      role: "EM",
      text: "UBS Asset Management onboarding",
      query: "What should I know before joining the UBS Asset Management account?",
      responseId: "ubs-onboarding",
      icon: "team",
    },
    {
      role: "EM",
      text: "Users who churned this week",
      query: "Which users churned in the last week?",
      responseId: "user-churn",
      icon: "chart-down",
    },
  ],
  Sales: [
    {
      role: "Sales",
      text: "Demo the Office Plugin",
      query: "Can I demo the Office Plugin to a client this week?",
      responseId: "office-plugin",
      icon: "presentation",
    },
    {
      role: "Sales",
      text: "Talk track for Goldman Sachs",
      query: "What's the talk track for Goldman Sachs?",
      responseId: "goldman-sachs",
      icon: "building",
    },
  ],
  Product: [
    {
      role: "Product",
      text: "User feedback priorities",
      query: "What user feedback should I prioritise this week?",
      responseId: "field-feedback",
      icon: "inbox",
    },
    {
      role: "Product",
      text: "Roadmap progress this quarter",
      query: "How are we tracking against the roadmap this quarter?",
      responseId: "roadmap-progress",
      icon: "roadmap",
    },
  ],
  Engineering: [
    {
      role: "Engineering",
      text: "Latest Chat bug fix",
      query: "What changed in the latest Chat product bug fix?",
      responseId: "chat-bug-fix",
      icon: "bug",
    },
    {
      role: "Engineering",
      text: "Open PR review comments",
      query: "Summarise the open review comments on my PRs",
      responseId: "pr-reviews",
      icon: "code-review",
    },
  ],
};

const queryToResponseId = Object.values(promptsByRole)
  .flat()
  .reduce<Record<string, string>>((lookup, prompt) => {
    lookup[prompt.query.toLowerCase()] = prompt.responseId;
    return lookup;
  }, {});

const fallbackResponse: DemoResponse = {
  role: "Sales",
  prompt: "",
  answer: [
    {
      kind: "paragraph",
      text: "This prototype supports two hardcoded prompts per role across Sales, EM, Product, and Engineering.",
      sources: [
        {
          label: "Case Jam notes",
          url: "#",
          provider: "casejam",
        },
      ],
    },
    {
      kind: "paragraph",
      text: "Try one of the suggested prompts for your current role, or ask about the Office Plugin, Goldman Sachs talk track, UBS onboarding, user churn, user feedback, roadmap progress, Chat bug fixes, or open PR reviews.",
      sources: [
        {
          label: "Slack #ops-agent-feedback",
          url: "https://slack.com",
          provider: "slack",
        },
      ],
    },
  ],
  lastUpdated: "9 Jun 2026",
};

const keywordMatchers: Array<{ match: (input: string) => boolean; responseId: string }> = [
  { match: (input) => input.includes("churn") || input.includes("churned"), responseId: "user-churn" },
  { match: (input) => input.includes("ubs") || input.includes("asset management"), responseId: "ubs-onboarding" },
  { match: (input) => input.includes("goldman") || input.includes("gs talk"), responseId: "goldman-sachs" },
  { match: (input) => input.includes("office plugin"), responseId: "office-plugin" },
  { match: (input) => input.includes("roadmap") || input.includes("stock-take") || input.includes("tracking against"), responseId: "roadmap-progress" },
  { match: (input) => input.includes("user feedback") || input.includes("prioritise") || input.includes("prioritize"), responseId: "field-feedback" },
  { match: (input) => input.includes("pr review") || input.includes("review comment") || input.includes("open pr"), responseId: "pr-reviews" },
  { match: (input) => input.includes("bug fix") || input.includes("chat product"), responseId: "chat-bug-fix" },
];

export function getResponseForInput(input: string): DemoResponse {
  const normalized = input.trim().toLowerCase();
  const exactId = queryToResponseId[normalized];
  if (exactId) {
    return responses[exactId];
  }

  const keywordId = keywordMatchers.find((entry) => entry.match(normalized))?.responseId;
  if (keywordId) {
    return responses[keywordId];
  }

  return fallbackResponse;
}
