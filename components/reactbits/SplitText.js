"use client";

// Adapted from ReactBits "Split Text", animates each word in on view.
import { motion } from "framer-motion";

export default function SplitText({
  text = "",
  className = "",
  delay = 0.04,
  as = "span",
}) {
  const words = text.split(" ");
  const MotionTag = motion[as] || motion.span;

  return (
    <MotionTag
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ staggerChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: "0.6em", rotateX: -40 },
              visible: {
                opacity: 1,
                y: "0em",
                rotateX: 0,
                transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </MotionTag>
  );
}
