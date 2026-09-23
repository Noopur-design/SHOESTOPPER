"use client";

// Adapted from ReactBits "Click Spark", a burst of sparks radiates from every click.
import { useEffect, useRef } from "react";

export default function ClickSpark({
  sparkColor = "#f97316",
  sparkCount = 8,
  sparkRadius = 18,
  duration = 420,
}) {
  const canvasRef = useRef(null);
  const sparks = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onClick = (e) => {
      const now = performance.now();
      for (let i = 0; i < sparkCount; i++) {
        sparks.current.push({
          x: e.clientX,
          y: e.clientY,
          angle: (2 * Math.PI * i) / sparkCount,
          start: now,
        });
      }
    };
    window.addEventListener("click", onClick);

    let raf;
    const draw = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparks.current = sparks.current.filter((s) => now - s.start < duration);
      sparks.current.forEach((s) => {
        const t = (now - s.start) / duration;
        const eased = 1 - Math.pow(1 - t, 3);
        const dist = eased * sparkRadius;
        const x1 = s.x + Math.cos(s.angle) * dist;
        const y1 = s.y + Math.sin(s.angle) * dist;
        const x2 = s.x + Math.cos(s.angle) * (dist + 8);
        const y2 = s.y + Math.sin(s.angle) * (dist + 8);
        ctx.strokeStyle = sparkColor;
        ctx.globalAlpha = 1 - t;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
    };
  }, [sparkColor, sparkCount, sparkRadius, duration]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[100]"
    />
  );
}
