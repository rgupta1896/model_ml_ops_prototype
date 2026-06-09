type SidebarProps = {
  activeItem: string;
};

const navigationItems = [
  { label: "Agent", active: true },
  { label: "Knowledge Hub", active: false },
  { label: "Updates", active: false },
  { label: "Saved Briefs", active: false },
];

const integrations = ["Slack", "Linear", "Notion", "Case Jams"];

export function Sidebar({ activeItem }: SidebarProps) {
  return (
    <aside className="flex w-full flex-col py-3">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-faint">
          Workspace
        </p>
      </div>

      <nav className="mt-8 space-y-2">
        {navigationItems.map((item) => {
          const isActive = item.label === activeItem;
          return (
            <button
              key={item.label}
              type="button"
              disabled={!item.active}
              className={`flex w-full items-center justify-between rounded-full border px-4 py-2.5 text-left text-sm transition ${
                isActive
                  ? "border-accentStrong bg-accentStrong text-mist"
                  : "border-transparent bg-transparent text-muted"
              } ${item.active ? "hover:border-sand hover:bg-white/40" : "cursor-not-allowed opacity-70"} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentStrong/20 focus-visible:ring-offset-2`}
            >
              <span>{item.label}</span>
              {isActive ? (
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#d8d4cd]">
                  Open
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      <div className="mt-12 border-t border-sand pt-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-faint">
          Integrations
        </p>
        <div className="mt-4 space-y-2">
          {integrations.map((source) => (
            <div
              key={source}
              className="rounded-full border border-sand bg-white/32 px-4 py-2.5 text-sm text-muted"
            >
              {source}
            </div>
          ))}
        </div>
      </div>

    </aside>
  );
}
