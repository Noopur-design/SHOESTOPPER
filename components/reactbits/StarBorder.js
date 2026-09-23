"use client";

// Adapted from ReactBits "Star Border", a glowing star sweeps around the border.
export default function StarBorder({
  children,
  className = "",
  color = "#f97316",
  speed = "5s",
  as = "button",
  ...rest
}) {
  const Tag = as;
  return (
    <Tag
      className={`relative inline-block overflow-hidden rounded-full p-[1.5px] ${className}`}
      {...rest}
    >
      <span
        className="absolute bottom-[-11px] right-[-250%] z-0 h-[50%] w-[300%] animate-star-movement-bottom rounded-full opacity-70"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed,
        }}
      />
      <span
        className="absolute left-[-250%] top-[-11px] z-0 h-[50%] w-[300%] animate-star-movement-top rounded-full opacity-70"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed,
        }}
      />
      <span className="relative z-10 block rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-fg">
        {children}
      </span>
    </Tag>
  );
}
