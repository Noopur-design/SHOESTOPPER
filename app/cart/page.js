"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, formatPrice } from "@/data/products";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/components/ToastProvider";

const initialItems = [
  { ...products[7], size: 10, qty: 1 }, // Velocity Pro
  { ...products[2], size: 9, qty: 1 }, // Cloud Strider
];

export default function CartPage() {
  const [items, setItems] = useState(initialItems);
  const [promo, setPromo] = useState("");
  const { user } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const setQty = (id, delta) =>
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it
      )
    );

  const remove = (id) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );
  const shipping = subtotal > 0 ? 0 : 0;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const applyPromo = () => {
    if (!promo.trim()) return;
    toast.error(`"${promo.toUpperCase()}" isn't a valid promo code.`);
    setPromo("");
  };

  const [placing, setPlacing] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please log in to complete your checkout.");
      router.push("/login");
      return;
    }
    setPlacing(true);
    try {
      // Use the default saved address, if any.
      let address = null;
      try {
        const ar = await fetch("/api/addresses", { cache: "no-store" });
        const ad = await ar.json();
        address = (ad.addresses || []).find((a) => a.isDefault) || null;
      } catch {}

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((it) => ({
            id: it.id,
            name: it.name,
            image: it.image,
            color: it.color,
            size: it.size,
            price: it.price,
            qty: it.qty,
          })),
          subtotal,
          tax,
          shipping,
          total,
          address,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not place order.");
      setItems([]);
      toast.success(`🎉 Order ${data.order.id} placed! Track it anytime.`);
      router.push(`/account/orders/${data.order.id}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="pt-28 md:pt-36">
      <section className="container-x">
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Your Bag
        </h1>
        <p className="mt-2 text-muted">
          {items.length} item{items.length !== 1 && "s"} ready to lace up.
        </p>
      </section>

      {items.length === 0 ? (
        <section className="container-x py-16">
          <div className="rounded-3xl border border-line bg-surface py-24 text-center">
            <p className="text-5xl">🛍️</p>
            <p className="mt-4 font-display text-lg font-bold">
              Your bag is empty
            </p>
            <p className="mt-1 text-muted">Time to find your next favorite pair.</p>
            <Link href="/shop" className="btn-primary mt-6">
              Start shopping
            </Link>
          </div>
        </section>
      ) : (
        <section className="container-x grid gap-10 py-12 lg:grid-cols-3">
          {/* Items */}
          <div className="space-y-4 lg:col-span-2">
            <AnimatePresence mode="popLayout">
              {items.map((it) => (
                <motion.div
                  key={it.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35 }}
                  className="flex gap-4 rounded-2xl border border-line bg-surface p-4"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surface2">
                    <Image
                      src={it.image}
                      alt={it.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/product/${it.id}`}
                          className="font-display font-bold text-fg hover:text-brand-500"
                        >
                          {it.name}
                        </Link>
                        <p className="text-sm text-muted">
                          {it.color} · Size {it.size}
                        </p>
                      </div>
                      <button
                        onClick={() => remove(it.id)}
                        className="text-sm text-muted transition-colors hover:text-rose-500"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center rounded-full border border-line">
                        <button
                          onClick={() => setQty(it.id, -1)}
                          className="grid h-9 w-9 place-items-center text-muted hover:text-fg"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">
                          {it.qty}
                        </span>
                        <button
                          onClick={() => setQty(it.id, 1)}
                          className="grid h-9 w-9 place-items-center text-muted hover:text-fg"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-bold text-fg">
                        {formatPrice(it.price * it.qty)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div>
            <div className="sticky top-28 rounded-3xl border border-line bg-surface p-7">
              <h2 className="font-display text-lg font-bold text-fg">
                Order Summary
              </h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Subtotal</dt>
                  <dd className="font-medium text-fg">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Shipping</dt>
                  <dd className="font-medium text-emerald-500">Free</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">GST (18%)</dt>
                  <dd className="font-medium text-fg">{formatPrice(tax)}</dd>
                </div>
                <div className="my-2 border-t border-line" />
                <div className="flex justify-between text-base">
                  <dt className="font-bold text-fg">Total</dt>
                  <dd className="font-bold text-fg">{formatPrice(total)}</dd>
                </div>
              </dl>

              <div className="mt-6 flex overflow-hidden rounded-full border border-line">
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Promo code"
                  className="w-full bg-transparent px-4 py-2.5 text-sm text-fg placeholder-muted outline-none"
                />
                <button
                  onClick={applyPromo}
                  className="shrink-0 px-4 text-sm font-semibold text-brand-500"
                >
                  Apply
                </button>
              </div>

              <button
                onClick={handleCheckout}
                disabled={placing}
                className="btn-accent mt-4 w-full disabled:opacity-60"
              >
                {placing
                  ? "Placing order…"
                  : user
                  ? `Checkout · ${formatPrice(total)}`
                  : `Log in to checkout · ${formatPrice(total)}`}
              </button>
              <Link
                href="/shop"
                className="mt-3 block text-center text-sm text-muted hover:text-fg"
              >
                or continue shopping
              </Link>

              <div className="mt-6 flex items-center justify-center gap-4 border-t border-line pt-5 text-xs text-muted">
                <span>🔒 Secure</span>
                <span>🚚 Free returns</span>
                <span>🛡️ Warranty</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
