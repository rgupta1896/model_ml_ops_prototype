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
    <img
      src="/brand/model-ml.png"
      alt=""
      className={`flex-none object-contain ${sizeClasses[size]} ${className}`}
      aria-hidden="true"
    />
  );
}
