"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useWishlist } from "@/components/WishlistProvider";
import { formatPrice } from "@/data/products";

export default function AccountDashboard() {
  const { user } = useAuth();
  const { count: wishlistCount } = useWishlist();
  const [orders, setOrders] = useState([]);
  const [addressCount, setAddressCount] = useState(0);

  useEffect(() => {
    fetch("/api/orders", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setOrders(d.orders || []))
      .catch(() => {});
    fetch("/api/addresses", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setAddressCount((d.addresses || []).length))
      .catch(() => {});
  }, []);

  const recent = orders[0];

  const stats = [
    { label: "Orders", value: orders.length, href: "/account/orders", icon: "📦" },
    { label: "Wishlist", value: wishlistCount, href: "/account/wishlist", icon: "❤️" },
    { label: "Addresses", value: addressCount, href: "/account/addresses", icon: "📍" },
  ];

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">
        My Account
      </p>
      <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight">
        Hey, {user.name.split(" ")[0]} 👋
      </h1>
      <p className="mt-1 text-muted">Here's what's happening with your account.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400"
          >
            <div className="text-2xl">{s.icon}</div>
            <p className="mt-3 font-display text-3xl font-extrabold text-fg">
              {s.value}
            </p>
            <p className="text-sm text-muted">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent order */}
      <div className="mt-8 rounded-3xl border border-line bg-surface p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-fg">Latest order</h2>
          <Link
            href="/account/orders"
            className="text-sm font-semibold text-brand-500 hover:underline"
          >
            View all
          </Link>
        </div>

        {recent ? (
          <Link
            href={`/account/orders/${recent.id}`}
            className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line p-4 transition-colors hover:border-brand-400"
          >
            <div>
              <p className="font-semibold text-fg">{recent.id}</p>
              <p className="text-sm text-muted">
                {recent.items.length} item{recent.items.length !== 1 && "s"} ·{" "}
                {formatPrice(recent.total)}
              </p>
            </div>
            <span className="rounded-full bg-brand-500/15 px-3 py-1 text-xs font-bold text-brand-600">
              {recent.status}
            </span>
          </Link>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed border-line p-8 text-center">
            <p className="text-muted">You haven't placed any orders yet.</p>
            <Link href="/shop" className="btn-primary mt-4">
              Start shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
