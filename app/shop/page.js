"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import Dropdown from "@/components/Dropdown";
import GradientText from "@/components/reactbits/GradientText";
import { products, categories } from "@/data/products";

const sorts = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function ShopPage() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    let list = products.filter(
      (p) => category === "All" || p.category === category
    );
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case "price-low":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [category, sort, query]);

  return (
    <div className="pt-28 md:pt-36">
      {/* Header */}
      <section className="container-x">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">
          The Collection
        </p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Shop <GradientText>All Shoes</GradientText>
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          {products.length} styles engineered for performance and built to look
          good doing it.
        </p>
      </section>

      {/* Controls (full-bleed sticky bar) */}
      <div className="sticky top-16 z-30 mt-8 border-y border-line bg-bg/85 backdrop-blur-xl md:top-20">
        <div className="container-x py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    category === c
                      ? "bg-brand-500 text-white shadow-[0_8px_24px_-10px_rgba(249,115,22,0.7)]"
                      : "border border-line text-muted hover:border-brand-400 hover:text-fg"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="w-full rounded-full border border-line bg-surface px-4 py-2 text-sm text-fg placeholder-muted outline-none transition-colors focus:border-brand-500 sm:w-52"
              />
              <Dropdown
                options={sorts}
                value={sort}
                onChange={setSort}
                className="w-48 shrink-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="container-x py-12">
        <p className="mb-6 text-sm text-muted">
          Showing {visible.length} result{visible.length !== 1 && "s"}
        </p>

        {visible.length === 0 ? (
          <div className="rounded-3xl border border-line bg-surface py-24 text-center">
            <p className="text-4xl">🔍</p>
            <p className="mt-4 font-display text-lg font-bold">
              No shoes match your filters
            </p>
            <button
              onClick={() => {
                setCategory("All");
                setQuery("");
              }}
              className="btn-ghost mt-6"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((p, i) => (
                <motion.div key={p.id} layout>
                  <ProductCard product={p} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </div>
  );
}
