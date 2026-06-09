type ModelMLIconProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "h-8 w-8 rounded-lg text-[10px]",
  md: "h-10 w-10 rounded-xl text-xs",
  lg: "h-12 w-12 rounded-xl text-sm",
};

export function ModelMLIcon({ className = "", size = "md" }: ModelMLIconProps) {
  return (
    <div
      className={`flex flex-none items-center justify-center bg-navy font-serif font-semibold tracking-[-0.04em] text-gold shadow-[0_4px_14px_rgba(12,20,36,0.18)] ${sizeClasses[size]} ${className}`}
      aria-hidden="true"
    >
      ML
    </div>
  );
}
