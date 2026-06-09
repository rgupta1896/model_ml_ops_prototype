import type { SourceProvider } from "../../types";
import { GithubIcon, LinearIcon, NotionIcon, SlackIcon } from "./IntegrationIcons";

type IconProps = {
  className?: string;
};

function ProductIcon({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#C4A574" />
      <path
        d="M8 12h8M8 9h5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EngineeringIcon({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#6B7280" />
      <path
        d="M9 9l6 6M15 9l-6 6"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SourceProviderIcon({
  provider,
  className = "h-3.5 w-3.5",
}: {
  provider: SourceProvider;
  className?: string;
}) {
  switch (provider) {
    case "slack":
      return <SlackIcon className={className} />;
    case "linear":
      return <LinearIcon className={className} />;
    case "notion":
      return <NotionIcon className={className} />;
    case "github":
      return <GithubIcon className={className} />;
    case "product":
      return <ProductIcon className={className} />;
    case "casejam":
      return (
        <img
          src="/brand/casejam.png"
          alt=""
          className={`${className} rounded-sm object-cover`}
          aria-hidden="true"
        />
      );
    case "engineering":
      return <EngineeringIcon className={className} />;
    default:
      return <ProductIcon className={className} />;
  }
}
