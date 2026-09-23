"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Stars from "./Stars";
import ProductCard from "./ProductCard";
import { formatPrice } from "@/data/products";

export default function ProductView({ product, related }) {
  const [activeImg, setActiveImg] = useState(product.gallery[0]);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!size) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="pt-28 md:pt-36">
      <div className="container-x">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-fg">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-fg">
            Shop
          </Link>
          <span>/</span>
          <span className="text-fg">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-surface2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImg}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeImg}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              {product.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {product.gallery.map((g) => (
                <button
                  key={g}
                  onClick={() => setActiveImg(g)}
                  className={`relative aspect-square overflow-hidden rounded-2xl border transition-all duration-300 ${
                    activeImg === g
                      ? "border-brand-500 ring-2 ring-brand-500/40"
                      : "border-line hover:border-brand-400"
                  }`}
                >
                  <Image src={g} alt="" fill sizes="20vw" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-brand-500">
              {product.brand}
            </p>
            <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight">
              {product.name}
            </h1>
            <div className="mt-3 flex items-center gap-3">
              <Stars rating={product.rating} showValue />
              <span className="text-sm text-muted">
                {product.reviews} reviews
              </span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span className="font-display text-3xl font-bold text-fg">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-lg text-muted line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                  <span className="rounded-full bg-rose-500/15 px-2 py-1 text-xs font-bold text-rose-500">
                    Save {formatPrice(product.oldPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            <p className="mt-6 leading-relaxed text-muted">
              {product.description}
            </p>

            <div className="mt-6">
              <span className="chip">Color: {product.color}</span>
            </div>

            {/* Sizes */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-fg">Select Size</h3>
                <span className="text-xs text-muted">UK / India</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-11 min-w-[3rem] rounded-xl border px-3 text-sm font-medium transition-all duration-200 ${
                      size === s
                        ? "border-brand-500 bg-brand-500 text-white"
                        : "border-line text-fg hover:border-brand-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-full border border-line">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-11 w-11 place-items-center text-lg text-muted hover:text-fg"
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="grid h-11 w-11 place-items-center text-lg text-muted hover:text-fg"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`btn-primary flex-1 transition-all ${
                  !size ? "opacity-60" : ""
                }`}
              >
                {added
                  ? "✓ Added to bag"
                  : size
                  ? `Add to bag · ${formatPrice(product.price * qty)}`
                  : "Select a size"}
              </button>
            </div>

            <AnimatePresence>
              {added && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 text-sm text-emerald-500"
                >
                  {qty} × {product.name} (size {size}) added to your bag.
                </motion.p>
              )}
            </AnimatePresence>

            {/* Perks */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-8 sm:grid-cols-3">
              {[
                ["🚚", "Free shipping"],
                ["↩️", "60-day returns"],
                ["🛡️", "2-yr warranty"],
              ].map(([icon, label]) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-sm text-muted"
                >
                  <span>{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        <section className="py-20">
          <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            You might also like
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
