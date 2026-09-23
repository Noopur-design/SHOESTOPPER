"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./auth/AuthProvider";
import { useToast } from "./ToastProvider";

const WishlistContext = createContext(null);

export function useWishlist() {
  return useContext(WishlistContext) || { ids: [], has: () => false, toggle: () => {}, count: 0 };
}

export default function WishlistProvider({ children }) {
  const { user } = useAuth();
  const toast = useToast();
  const [ids, setIds] = useState([]);

  useEffect(() => {
    if (!user) {
      setIds([]);
      return;
    }
    fetch("/api/wishlist", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setIds(d.wishlist || []))
      .catch(() => {});
  }, [user]);

  const has = useCallback((id) => ids.includes(id), [ids]);

  const toggle = useCallback(
    async (id) => {
      if (!user) {
        toast.error("Log in to save items to your wishlist.");
        return false;
      }
      const wasIn = ids.includes(id);
      setIds((prev) => (wasIn ? prev.filter((x) => x !== id) : [...prev, id]));
      try {
        const r = await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: id }),
        });
        const d = await r.json();
        if (r.ok) {
          setIds(d.wishlist);
          toast.success(
            d.wishlist.includes(id)
              ? "Added to your wishlist ❤️"
              : "Removed from wishlist"
          );
        }
      } catch {
        setIds((prev) => (wasIn ? [...prev, id] : prev.filter((x) => x !== id)));
      }
      return true;
    },
    [user, ids, toast]
  );

  return (
    <WishlistContext.Provider value={{ ids, has, toggle, count: ids.length }}>
      {children}
    </WishlistContext.Provider>
  );
}
