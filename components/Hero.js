"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SplitText from "./reactbits/SplitText";
import ShinyText from "./reactbits/ShinyText";
import CountUp from "./reactbits/CountUp";
import Magnet from "./reactbits/Magnet";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-36">
      {/* Dotted backdrop + soft color blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 dot-bg" />
      <div className="pointer-events-none absolute -left-24 top-24 -z-10 h-[380px] w-[380px] blob bg-brand-300/40 blur-[90px]" />
      <div className="pointer-events-none absolute -right-24 top-40 -z-10 h-[340px] w-[340px] blob bg-accent/20 blur-[100px]" />

      <div className="container-x grid items-center gap-12 pb-16 lg:grid-cols-2 lg:pb-24">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="chip"
          >
            <span className="mr-2">🔥</span>
            <ShinyText text="New Fall '26 Collection is live" speed={4} />
          </motion.span>

          <h1 className="mt-6 font-display text-[clamp(1.9rem,8.5vw,2.6rem)] font-extrabold leading-[1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <SplitText text="Step into" />
            <br />
            <span className="text-brand-500">something</span>
            <br />
            <span className="serif-accent text-fg">legendary.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-7 max-w-md text-lg leading-relaxed text-muted"
          >
            Performance running, street-ready sneakers, and trail-crushing boots.
            Engineered for comfort, designed to turn heads.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Magnet>
              <Link href="/shop" className="btn-accent">
                Shop the Collection
                <span aria-hidden>→</span>
              </Link>
            </Magnet>
            <Link href="/about" className="btn-ghost">
              Our Story
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-12 flex items-center gap-5 sm:gap-8"
          >
            {[
              { to: 50, suffix: "k+", l: "Happy runners" },
              { to: 4.9, decimals: 1, suffix: "★", l: "Average rating" },
              { to: 60, suffix: "d", l: "Free returns" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-2xl font-extrabold text-fg sm:text-3xl">
                  <CountUp to={s.to} decimals={s.decimals || 0} suffix={s.suffix} />
                </p>
                <p className="text-xs font-medium text-muted">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Accent blob behind the shoe */}
          <div className="absolute inset-6 -z-10 blob bg-gradient-to-br from-brand-400 to-accent opacity-90" />
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] border-4 border-fg/5 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80"
              alt="Featured sneaker"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
            />
          </div>

          {/* Rotating sticker seal */}
          <div className="absolute -left-4 top-4 hidden animate-spin-slow sm:block">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-fg text-center">
              <span className="text-[10px] font-extrabold uppercase leading-tight text-bg">
                Free
                <br />
                Shipping
              </span>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute left-2 top-32 hidden rounded-2xl p-4 sm:-left-8 sm:block"
          >
            <span className="sticker bg-brand-500 text-white">Best Seller</span>
            <p className="mt-2 font-display font-bold text-fg">Velocity Pro</p>
            <p className="text-sm font-semibold text-brand-500">₹17,999</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute right-2 bottom-10 hidden rounded-2xl p-4 sm:-right-6 sm:block"
          >
            <span className="sticker bg-accent text-white">4.9★</span>
            <p className="mt-2 font-display font-bold text-fg">50k+ reviews</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Brand marquee */}
      <div className="border-y-2 border-fg/10 bg-fg py-4">
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
            {[...Array(2)].flatMap((_, k) =>
              ["RUNNING", "•", "SNEAKERS", "•", "BASKETBALL", "•", "HIKING", "•", "CASUAL", "•", "PERFORMANCE", "•"].map(
                (w, idx) => (
                  <span
                    key={`${k}-${idx}`}
                    className={`font-display text-xl font-extrabold uppercase tracking-tight ${
                      w === "•" ? "text-brand-500" : "text-bg"
                    }`}
                  >
                    {w}
                  </span>
                )
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
