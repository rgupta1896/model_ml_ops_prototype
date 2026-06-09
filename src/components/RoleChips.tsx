import type { Role } from "../types";

type RoleChipsProps = {
  activeRole: Role;
  roles: Role[];
  onSelect: (role: Role) => void;
};

export function RoleChips({ activeRole, roles, onSelect }: RoleChipsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {roles.map((role) => {
        const isActive = role === activeRole;
        return (
          <button
            key={role}
            type="button"
            onClick={() => onSelect(role)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "border-accentStrong bg-accentStrong text-mist"
                : "border-sand bg-accent text-[#4b4742] hover:bg-white/65 hover:text-ink"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentStrong/20 focus-visible:ring-offset-2`}
          >
            {role}
          </button>
        );
      })}
    </div>
  );
}
