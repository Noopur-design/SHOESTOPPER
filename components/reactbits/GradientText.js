"use client";

// Adapted from ReactBits "Gradient Text", animated flowing gradient text.
export default function GradientText({
  children,
  className = "",
  colors = ["#fb923c", "#f97316", "#ea580c", "#fdba74", "#fb923c"],
}) {
  return (
    <span
      className={`animate-gradient-x bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
        backgroundSize: "200% 100%",
      }}
    >
      {children}
    </span>
  );
}
