"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatPrice } from "@/data/products";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80";
const safeImg = (src) => (typeof src === "string" && src.startsWith("http") ? src : FALLBACK_IMG);

const STEPS = [
  { label: "Order placed", icon: "🧾" },
  { label: "Packed", icon: "📦" },
  { label: "Shipped", icon: "🚚" },
  { label: "Out for delivery", icon: "🛵" },
  { label: "Delivered", icon: "🎉" },
];

export default function OrderDetailPage({ params }) {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(false);

  const load = () => {
    fetch(`/api/orders/${params.id}`, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d) => setOrder(d.order))
      .catch(() => setError(true));
  };

  useEffect(() => {
    load();
    // Re-check tracking status periodically so progress updates live.
    const t = setInterval(load, 20000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  if (error) {
    return (
      <div className="rounded-3xl border border-line bg-surface py-16 text-center">
        <p className="text-4xl">🔍</p>
        <p className="mt-4 font-display text-lg font-bold">Order not found</p>
        <Link href="/account/orders" className="btn-primary mt-6">
          Back to orders
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="grid place-items-center py-20">
        <div className="h-8 w-8 animate-spin-slow rounded-full border-4 border-line border-t-brand-500" />
      </div>
    );
  }

  const placed = new Date(order.placedAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div>
      <Link
        href="/account/orders"
        className="text-sm font-semibold text-muted hover:text-fg"
      >
        ← All orders
      </Link>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight">
            {order.id}
          </h1>
          <p className="text-sm text-muted">Placed {placed}</p>
        </div>
        <span
          className={`rounded-full px-4 py-1.5 text-sm font-bold ${
            order.delivered
              ? "bg-emerald-500/15 text-emerald-600"
              : "bg-brand-500/15 text-brand-600"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* Tracking timeline */}
      <div className="mt-6 rounded-3xl border border-line bg-surface p-6 sm:p-8">
        <h2 className="font-display text-lg font-bold text-fg">Tracking</h2>
        <div className="mt-6">
          {/* Progress bar */}
          <div className="relative mb-8 hidden sm:block">
            <div className="absolute left-0 top-5 h-1 w-full rounded-full bg-surface2" />
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${(order.stage / (STEPS.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-5 h-1 rounded-full bg-brand-500"
            />
            <div className="relative flex justify-between">
              {STEPS.map((s, i) => {
                const done = i <= order.stage;
                return (
                  <div key={s.label} className="flex flex-col items-center">
                    <div
                      className={`grid h-10 w-10 place-items-center rounded-full border-2 text-sm transition-colors ${
                        done
                          ? "border-brand-500 bg-brand-500 text-white"
                          : "border-line bg-surface text-muted"
                      }`}
                    >
                      {s.icon}
                    </div>
                    <p
                      className={`mt-2 max-w-[80px] text-center text-xs font-medium ${
                        done ? "text-fg" : "text-muted"
                      }`}
                    >
                      {s.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile vertical steps */}
          <div className="space-y-4 sm:hidden">
            {STEPS.map((s, i) => {
              const done = i <= order.stage;
              return (
                <div key={s.label} className="flex items-center gap-3">
                  <div
                    className={`grid h-9 w-9 place-items-center rounded-full border-2 text-sm ${
                      done
                        ? "border-brand-500 bg-brand-500 text-white"
                        : "border-line text-muted"
                    }`}
                  >
                    {s.icon}
                  </div>
                  <p className={done ? "font-semibold text-fg" : "text-muted"}>
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Items */}
        <div className="space-y-3 lg:col-span-2">
          {order.items.map((it, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-surface2">
                <Image
                  src={safeImg(it.image)}
                  alt={it.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-fg">{it.name}</p>
                <p className="text-sm text-muted">
                  {it.color ? `${it.color} · ` : ""}
                  {it.size ? `Size ${it.size} · ` : ""}Qty {it.qty}
                </p>
              </div>
              <p className="font-bold text-fg">{formatPrice(it.price * it.qty)}</p>
            </div>
          ))}
        </div>

        {/* Summary + address */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <h3 className="font-display font-bold text-fg">Summary</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="font-medium text-fg">
                  {formatPrice(order.subtotal)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd className="font-medium text-emerald-500">Free</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">GST (18%)</dt>
                <dd className="font-medium text-fg">{formatPrice(order.tax)}</dd>
              </div>
              <div className="my-2 border-t border-line" />
              <div className="flex justify-between text-base">
                <dt className="font-bold text-fg">Total</dt>
                <dd className="font-bold text-fg">{formatPrice(order.total)}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6">
            <h3 className="font-display font-bold text-fg">Delivery address</h3>
            {order.address ? (
              <div className="mt-3 text-sm text-muted">
                <p className="font-semibold text-fg">{order.address.name}</p>
                <p>{order.address.line1}</p>
                {order.address.line2 && <p>{order.address.line2}</p>}
                <p>
                  {order.address.city}, {order.address.state}{" "}
                  {order.address.pincode}
                </p>
                <p className="mt-1">📞 {order.address.phone}</p>
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted">
                No saved address was attached to this order.{" "}
                <Link
                  href="/account/addresses"
                  className="font-semibold text-brand-500 hover:underline"
                >
                  Add one
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
