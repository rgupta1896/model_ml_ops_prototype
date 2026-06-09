import {
  GithubIcon,
  LinearIcon,
  NotionIcon,
  SlackIcon,
} from "./icons/IntegrationIcons";
import type { WorkspaceTab } from "../types";

type SidebarProps = {
  activeItem: WorkspaceTab;
  onSelect: (item: WorkspaceTab) => void;
};

const navigationItems = [
  {
    label: "Agent",
    description: "Customised AI agent with user context-awareness",
  },
  {
    label: "The Hub",
    description:
      "Central repository for client learnings, best practices, product updates, and cross-team knowledge-sharing",
  },
  {
    label: "Daily Brief",
    description: "Agent-generated daily digests relevant to each role or pod",
  },
] as const;

const integrations = [
  { label: "Slack", icon: SlackIcon, connected: true },
  { label: "Linear", icon: LinearIcon, connected: true },
  { label: "Notion", icon: NotionIcon, connected: true },
  { label: "GitHub", icon: GithubIcon, connected: true },
] as const;

export function Sidebar({ activeItem, onSelect }: SidebarProps) {
  return (
    <aside className="flex min-h-screen self-stretch w-[248px] flex-none flex-col bg-navy px-5 py-7 text-mist">
      <div className="font-sans text-[1.65rem] font-medium leading-none tracking-[-0.03em] text-mist">
        Model ML
      </div>

      <div className="mt-10">
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#7d8698]">
          Workspace
        </p>
        <nav className="mt-4 space-y-1">
          {navigationItems.map((item) => {
            const isActive = item.label === activeItem;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onSelect(item.label)}
                className={`relative flex w-full items-start justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                  isActive
                    ? "bg-navyLight text-mist shadow-[0_14px_30px_rgba(7,12,24,0.28)] ring-1 ring-[#2a3347]"
                    : "text-[#9aa3b2] hover:bg-navyLight/60 hover:text-mist"
                }`}
              >
                {isActive ? (
                  <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-gold" />
                ) : null}
                <span className="min-w-0">
                  <span className={`block text-sm font-medium leading-5 ${isActive ? "text-mist" : ""}`}>
                    {item.label}
                  </span>
                  {item.description ? (
                    <span className={`mt-0.5 block text-xs leading-4 ${isActive ? "text-[#aeb7c7]" : "text-[#7d8698]"}`}>
                      {item.description}
                    </span>
                  ) : null}
                </span>
                {isActive ? (
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-gold" />
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-10">
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#7d8698]">
          Integrations
        </p>
        <div className="mt-4 space-y-2">
          {integrations.map(({ label, icon: Icon, connected }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 rounded-lg border border-[#2a3347] bg-[#121b2e] px-3 py-2.5 text-sm text-[#c5ccd8]"
            >
              <Icon className="h-[18px] w-[18px] flex-none" />
              <span className="flex-1">{label}</span>
              <span
                className={`h-1.5 w-1.5 rounded-full ${connected ? "bg-[#4ade80]" : "bg-[#6b7280]"}`}
              />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
