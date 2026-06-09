import {
  GithubIcon,
  LinearIcon,
  NotionIcon,
  SlackIcon,
} from "./icons/IntegrationIcons";

type SidebarProps = {
  activeItem: string;
};

const navigationItems = [
  { label: "Agent", active: true },
  { label: "Knowledge Hub", active: false },
  { label: "Updates", active: false },
  { label: "Saved Briefs", active: false },
];

const integrations = [
  { label: "Slack", icon: SlackIcon, connected: true },
  { label: "Linear", icon: LinearIcon, connected: true },
  { label: "Notion", icon: NotionIcon, connected: true },
  { label: "GitHub", icon: GithubIcon, connected: true },
] as const;

export function Sidebar({ activeItem }: SidebarProps) {
  return (
    <aside className="flex h-full w-[248px] flex-none flex-col bg-navy px-5 py-7 text-mist">
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
                disabled={!item.active}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  isActive
                    ? "bg-navyLight text-mist"
                    : "text-[#9aa3b2] hover:bg-navyLight/60 hover:text-mist"
                } ${item.active ? "" : "cursor-not-allowed opacity-60"}`}
              >
                <span>{item.label}</span>
                {isActive ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
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
