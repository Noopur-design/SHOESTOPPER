"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/components/ToastProvider";

const nav = [
  { href: "/account", label: "Dashboard", icon: "🏠", exact: true },
  { href: "/account/orders", label: "Orders", icon: "📦" },
  { href: "/account/wishlist", label: "Wishlist", icon: "❤️" },
  { href: "/account/addresses", label: "Addresses", icon: "📍" },
  { href: "/account/profile", label: "Profile", icon: "👤" },
];

export default function AccountLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="grid min-h-[60vh] place-items-center pt-20">
        <div className="h-10 w-10 animate-spin-slow rounded-full border-4 border-line border-t-brand-500" />
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    toast.success("You've been logged out. See you soon! 👋");
    router.push("/");
  };

  return (
    <div className="pt-28 md:pt-36">
      <div className="container-x grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="rounded-3xl border border-line bg-surface p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-fg text-lg font-extrabold uppercase text-bg">
                {user.name[0]}
              </span>
              <div className="min-w-0">
                <p className="truncate font-display font-bold text-fg">
                  {user.name}
                </p>
                <p className="truncate text-xs text-muted">{user.email}</p>
              </div>
            </div>

            <nav className="mt-5 flex gap-1 overflow-x-auto lg:flex-col">
              {nav.map((n) => {
                const active = n.exact
                  ? pathname === n.href
                  : pathname.startsWith(n.href);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-brand-500 text-white"
                        : "text-muted hover:bg-surface2 hover:text-fg"
                    }`}
                  >
                    <span>{n.icon}</span>
                    {n.label}
                  </Link>
                );
              })}
              <button
                onClick={handleLogout}
                className="flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-rose-500 transition-colors hover:bg-rose-500/10 lg:mt-1"
              >
                <span>↩</span>
                Log out
              </button>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0 pb-24">{children}</div>
      </div>
    </div>
  );
}
