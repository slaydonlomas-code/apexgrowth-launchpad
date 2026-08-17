type Props = {
  className?: string;
  /** Approximate height in px; scales the icon and wordmark together. */
  size?: number;
};

/**
 * ApexGrowth wordmark logo.
 * - Transparent background (pure SVG + text)
 * - "Apex" in deep navy, "Growth" in gold
 * - Stylized mountain peak icon in gold on the left
 */
export function Logo({ className, size = 40 }: Props) {
  const iconSize = size;
  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: Math.round(size * 0.28),
        lineHeight: 1,
      }}
      aria-label="ApexGrowth"
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="apexGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E6C878" />
            <stop offset="50%" stopColor="#C69A46" />
            <stop offset="100%" stopColor="#B0822E" />
          </linearGradient>
        </defs>
        {/* Main peak */}
        <path d="M6 54 L28 14 L42 40 L36 40 L28 26 L14 54 Z" fill="url(#apexGold)" />
        {/* Secondary smaller peak */}
        <path d="M32 54 L44 32 L58 54 Z" fill="url(#apexGold)" opacity="0.9" />
      </svg>
      <span
        style={{
          fontFamily: "'Fraunces', ui-serif, Georgia, 'Times New Roman', serif",
          fontWeight: 600,
          fontSize: Math.round(size * 0.62),
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: "var(--ink)" }}>Apex</span>
        <span
          style={{
            background: "linear-gradient(135deg, #E6C878 0%, #C69A46 50%, #B0822E 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Growth
        </span>
      </span>
    </div>
  );
}

export default Logo;
