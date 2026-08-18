import logoUrl from "@/assets/apexgrowth-logo.svg";

type Props = {
  className?: string;
  /** Approximate height in px; width scales with the artwork's aspect ratio. */
  size?: number;
};

/**
 * Official ApexGrowth wordmark logo (transparent SVG).
 * Royal-blue mountain mark + navy/royal-blue "ApexGrowth" wordmark.
 */
export function Logo({ className, size = 40 }: Props) {
  return (
    <img
      src={logoUrl}
      alt="ApexGrowth"
      className={className}
      style={{ height: size, width: "auto", display: "block" }}
      decoding="async"
    />
  );
}

export default Logo;
