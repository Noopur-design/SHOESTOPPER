"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Stars from "./Stars";
import TiltedCard from "./reactbits/TiltedCard";
import { useWishlist } from "./WishlistProvider";
import { formatPrice } from "@/data/products";

const badgeStyles = {
  New: "bg-accent text-white",
  "Best Seller": "bg-brand-500 text-white",
  Sale: "bg-fg text-bg",
};

export default function ProductCard({ product, index = 0 }) {
  const { has, toggle } = useWishlist();
  const wished = has(product.id);

  const onHeart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: (index % 4) * 0.09,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <TiltedCard max={9}>
        <Link href={`/product/${product.id}`} className="group block">
          <motion.article
            whileHover={{ y: -10, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-sm transition-all duration-300 hover:border-brand-400/60 hover:shadow-[0_28px_70px_-24px_rgba(249,115,22,0.5)]"
          >
            {/* Image */}
            <div className="relative m-2 aspect-square overflow-hidden rounded-[1.4rem] bg-surface2">
              {/* Darken overlay on hover */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Diagonal shine sweep on hover */}
              <div className="pointer-events-none absolute inset-0 z-20 -translate-x-[120%] -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-[120%]" />

              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.14] group-hover:rotate-1"
              />

              {product.badge && (
                <motion.span
                  initial={{ scale: 0, rotate: -12 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 14,
                    delay: 0.25,
                  }}
                  className={`sticker absolute left-3 top-3 z-30 ${
                    badgeStyles[product.badge] || "bg-fg text-bg"
                  }`}
                >
                  {product.badge}
                </motion.span>
              )}

              {/* Wishlist heart */}
              <button
                type="button"
                onClick={onHeart}
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                className="absolute right-3 top-3 z-30 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-fg backdrop-blur transition-all duration-300 hover:scale-110 active:scale-90"
              >
                <motion.svg
                  key={wished ? "on" : "off"}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  viewBox="0 0 24 24"
                  className={`h-4 w-4 ${wished ? "text-rose-500" : "text-zinc-700"}`}
                  fill={wished ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 21s-7.5-4.6-10-9.1C.4 8.8 1.9 5.5 5 5.1c1.9-.3 3.6.8 4.4 2.3.3.5 1 .5 1.3 0C11.4 5.9 13.1 4.8 15 5.1c3.1.4 4.6 3.7 3 6.8C19.5 16.4 12 21 12 21z" />
                </motion.svg>
              </button>

              {/* Quick-add pill */}
              <div className="absolute inset-x-4 bottom-4 z-30 translate-y-8 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                <span className="btn-accent w-full">
                  View Details <span aria-hidden>→</span>
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="px-5 pb-5 pt-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {product.category}
                </p>
                <Stars rating={product.rating} />
              </div>
              <h3 className="mt-1 font-display text-lg font-bold text-fg transition-colors duration-300 group-hover:text-brand-500">
                {product.name}
              </h3>
              <p className="text-sm text-muted">{product.color}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="font-display text-xl font-extrabold text-fg">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-muted line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>
          </motion.article>
        </Link>
      </TiltedCard>
    </motion.div>
  );
}
