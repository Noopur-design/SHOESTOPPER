"use client";

// Adapted from ReactBits "Shiny Text", a sweeping shine across text.
export default function ShinyText({ text, className = "", speed = 5 }) {
  return (
    <span
      className={`animate-shine bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgb(var(--fg-muted)) 40%, rgb(var(--fg)) 50%, rgb(var(--fg-muted)) 60%)",
        backgroundSize: "200% 100%",
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
}
