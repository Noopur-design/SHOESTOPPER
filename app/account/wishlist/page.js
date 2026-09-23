"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/components/WishlistProvider";
import { products } from "@/data/products";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold tracking-tight">
        Wishlist
      </h1>
      <p className="mt-1 text-muted">
        {items.length} saved item{items.length !== 1 && "s"}.
      </p>

      {items.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-line bg-surface py-16 text-center">
          <p className="text-4xl">❤️</p>
          <p className="mt-4 font-display text-lg font-bold">
            Your wishlist is empty
          </p>
          <p className="mt-1 text-muted">
            Tap the heart on any shoe to save it here.
          </p>
          <Link href="/shop" className="btn-primary mt-6">
            Browse shoes
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
