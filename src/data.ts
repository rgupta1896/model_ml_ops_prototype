import type { DemoResponse, PromptDefinition, Role } from "./types";

export const roles: Role[] = ["Sales", "EM", "Product", "Engineering"];

export const promptsByRole: Record<Role, PromptDefinition[]> = {
  Sales: [
    {
      role: "Sales",
      text: "Can I demo the Office Plugin to a client this week?",
      primary: true,
    },
    {
      role: "Sales",
      text: "What is the current talk track for document-heavy clients?",
    },
    {
      role: "Sales",
      text: "What should I avoid promising in client conversations?",
    },
  ],
  EM: [
    {
      role: "EM",
      text: "What should I know before joining the UBS Asset Management account?",
      primary: true,
    },
    {
      role: "EM",
      text: "Which workflow should I start with for this account?",
    },
    {
      role: "EM",
      text: "What caveats should I know before deployment?",
    },
  ],
  Product: [
    {
      role: "Product",
      text: "What field feedback should I prioritise this week?",
      primary: true,
    },
    {
      role: "Product",
      text: "Where are teams confused about product readiness?",
    },
    {
      role: "Product",
      text: "Which caveats need clearer field guidance?",
    },
  ],
  Engineering: [
    {
      role: "Engineering",
      text: "What changed in the latest Chat product bug fix?",
      primary: true,
    },
    {
      role: "Engineering",
      text: "Which field issues are linked to recent Chat failures?",
    },
    {
      role: "Engineering",
      text: "What should we monitor after the bug fix?",
    },
  ],
};

export const demoResponses: DemoResponse[] = [
  {
    role: "Sales",
    prompt: "Can I demo the Office Plugin to a client this week?",
    answer: [
      "Yes — you can demo the Office Plugin this week, but only as a controlled demo using the approved Demo v3 flow.",
      "Position it as a workflow accelerator for document-heavy teams. Avoid describing it as generally available for full enterprise rollout. The main caveat is formatting: complex templates, tables and client-specific layouts may still need manual review.",
    ],
    sources: [
      "Product · Workflows Pod · Linear ML-2481 ↗",
      "Slack #office-plugin-demo ↗",
    ],
    lastUpdated: "8 Jun 2026",
  },
  {
    role: "EM",
    prompt: "What should I know before joining the UBS Asset Management account?",
    answer: [
      "Start with the investment memo workflow. UBS Asset Management is using Model ML around research synthesis and memo drafting, so the highest-leverage context is source-pack setup, source-backed answers, citation tracing and document export.",
      "Before joining, review the current asset management demo deck, the investment memo workflow, and the Office Plugin caveats. The main pitfalls are relying on messy scanned PDFs for citation-heavy outputs, using old Office Plugin demo scripts, or showing the Grids dashboard externally before it is approved.",
    ],
    sources: [
      "EM · Document Review Pod · UBS onboarding brief ↗",
      "Case Jam: Investment Memo Workflow ↗",
    ],
    lastUpdated: "8 Jun 2026",
  },
  {
    role: "Product",
    prompt: "What field feedback should I prioritise this week?",
    answer: [
      "Prioritise three items: Office Plugin readiness confusion, citation quality on messy PDFs, and Grids dashboard expectations.",
      "Office Plugin confusion is the most urgent because Sales and EMs are unclear on whether it is sellable, demoable or pilot-only. Citation quality is showing up across document-heavy workflows, especially where source packs include messy PDFs. The Grids issue is mainly expectation-setting: older screenshots are still appearing in client-facing materials even though the current dashboard view remains internal-only.",
      "I’d clarify sell/demo/deploy guidance for the Office Plugin, define source-pack quality thresholds for citation tracing, and remove outdated Grids dashboard assets from client-facing decks.",
    ],
    sources: [
      "Product · Grids Pod · Weekly Field Sync notes ↗",
      "Slack #product-field-questions ↗",
    ],
    lastUpdated: "8 Jun 2026",
  },
  {
    role: "Engineering",
    prompt: "What changed in the latest Chat product bug fix?",
    answer: [
      "The latest Chat bug fix improved source retrieval timeout handling. When large source packs take too long to retrieve, Chat now shows a retry state instead of failing silently.",
      "This should reduce failed responses in large-document workflows, especially for banking and asset management pilots. The caveat stays in place for now: clean, structured source packs should perform better, but messy scanned PDFs may still reduce answer quality and citation reliability.",
      "Engineering should monitor timeout rate, retry success rate and failed response rate over the next week before the field caveat is downgraded.",
    ],
    sources: [
      "Engineering · Chat Pod · Linear CHAT-1842 ↗",
      "Slack #chat-product ↗",
    ],
    lastUpdated: "8 Jun 2026",
  },
];

export const fallbackResponse: DemoResponse = {
  role: "Sales",
  prompt: "",
  answer: [
    "This prototype currently supports role-specific demo workflows across Sales, EM, Product, and Engineering.",
    "Try asking about the Office Plugin demo, the UBS Asset Management account, field feedback priorities, or the latest Chat bug fix to see one of the tailored readiness answers.",
  ],
  sources: [
    "Product · Note-taker Pod · Case Jam notes ↗",
    "Slack #ops-agent-feedback ↗",
  ],
  lastUpdated: "8 Jun 2026",
};

const keywordMatchers: Array<{ match: (input: string) => boolean; response: DemoResponse }> = [
  {
    match: (input) => input.includes("office plugin") || input.includes("demo"),
    response: demoResponses[0],
  },
  {
    match: (input) =>
      input.includes("ubs") || input.includes("asset management account"),
    response: demoResponses[1],
  },
  {
    match: (input) =>
      input.includes("field feedback") ||
      input.includes("prioritise") ||
      input.includes("prioritize"),
    response: demoResponses[2],
  },
  {
    match: (input) =>
      input.includes("bug fix") ||
      input.includes("chat product") ||
      input.includes("chat"),
    response: demoResponses[3],
  },
];

export function getResponseForInput(input: string): DemoResponse {
  const normalized = input.toLowerCase();
  return (
    keywordMatchers.find((entry) => entry.match(normalized))?.response ??
    fallbackResponse
  );
}
