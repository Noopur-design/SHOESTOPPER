"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice } from "@/data/products";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80";
const safeImg = (src) => (typeof src === "string" && src.startsWith("http") ? src : FALLBACK_IMG);

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function OrdersPage() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    fetch("/api/orders", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setOrders(d.orders || []))
      .catch(() => setOrders([]));
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold tracking-tight">
        My Orders
      </h1>
      <p className="mt-1 text-muted">Track and review everything you've bought.</p>

      {orders === null ? (
        <div className="mt-10 grid place-items-center py-16">
          <div className="h-8 w-8 animate-spin-slow rounded-full border-4 border-line border-t-brand-500" />
        </div>
      ) : orders.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-line bg-surface py-16 text-center">
          <p className="text-4xl">📦</p>
          <p className="mt-4 font-display text-lg font-bold">No orders yet</p>
          <p className="mt-1 text-muted">Your future kicks will show up here.</p>
          <Link href="/shop" className="btn-primary mt-6">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((o) => (
            <Link
              key={o.id}
              href={`/account/orders/${o.id}`}
              className="block rounded-3xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display font-bold text-fg">{o.id}</p>
                  <p className="text-xs text-muted">
                    Placed {formatDate(o.placedAt)}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    o.delivered
                      ? "bg-emerald-500/15 text-emerald-600"
                      : "bg-brand-500/15 text-brand-600"
                  }`}
                >
                  {o.status}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex -space-x-3">
                  {o.items.slice(0, 4).map((it, i) => (
                    <div
                      key={i}
                      className="relative h-12 w-12 overflow-hidden rounded-xl border-2 border-surface bg-surface2"
                    >
                      <Image
                        src={safeImg(it.image)}
                        alt={it.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                  {o.items.length > 4 && (
                    <div className="grid h-12 w-12 place-items-center rounded-xl border-2 border-surface bg-surface2 text-xs font-bold text-muted">
                      +{o.items.length - 4}
                    </div>
                  )}
                </div>
                <p className="font-display text-lg font-extrabold text-fg">
                  {formatPrice(o.total)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
