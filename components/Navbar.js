"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Magnet from "./reactbits/Magnet";
import { useAuth } from "./auth/AuthProvider";
import { useToast } from "./ToastProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const toast = useToast();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleLogout = async () => {
    await logout();
    setAccountOpen(false);
    setOpen(false);
    toast.success("You've been logged out. See you soon! 👋");
    router.push("/");
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-line bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="group flex min-w-0 items-center gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-brand-500 text-base font-black text-white transition-transform duration-300 group-hover:-rotate-12 sm:h-9 sm:w-9 sm:text-lg">
            S
          </span>
          <span className="truncate font-display text-base font-extrabold tracking-tight sm:text-lg">
            Shoe<span className="text-gradient">Stopper</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    active ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-500 transition-all duration-300 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-line bg-surface2 text-fg transition-colors duration-300 hover:border-brand-400"
          >
            🛍️
            <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-brand-500 text-[10px] font-bold text-white">
              2
            </span>
          </Link>

          {/* Account */}
          {!loading && user ? (
            <div className="relative hidden sm:block" ref={accountRef}>
              <button
                onClick={() => setAccountOpen((v) => !v)}
                className="grid h-10 w-10 place-items-center rounded-full bg-fg text-sm font-bold uppercase text-bg transition-transform hover:scale-105"
                aria-label="Account menu"
              >
                {user.name?.[0] || "U"}
              </button>
              <AnimatePresence>
                {accountOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-xl"
                  >
                    <div className="px-3 py-2">
                      <p className="text-sm font-bold text-fg">{user.name}</p>
                      <p className="truncate text-xs text-muted">{user.email}</p>
                    </div>
                    <div className="my-1 border-t border-line" />
                    <Link
                      href="/account"
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-fg hover:bg-surface2"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/account/orders"
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-fg hover:bg-surface2"
                    >
                      My orders
                    </Link>
                    <Link
                      href="/account/wishlist"
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-fg hover:bg-surface2"
                    >
                      Wishlist
                    </Link>
                    <Link
                      href="/account/addresses"
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-fg hover:bg-surface2"
                    >
                      Addresses
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="mt-1 block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-rose-500 hover:bg-rose-500/10"
                    >
                      Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            !loading && (
              <Magnet className="hidden sm:block">
                <Link href="/login" className="btn-primary">
                  Log in
                </Link>
              </Magnet>
            )
          )}

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line lg:hidden"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 bg-fg transition-all ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-fg transition-all ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-fg transition-all ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-y-auto overscroll-contain border-t border-line bg-bg shadow-lg transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-[calc(100dvh-4rem)]" : "max-h-0 border-transparent"
        }`}
      >
        <ul className="container-x flex flex-col gap-1 py-4">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`block rounded-lg px-4 py-3 text-sm font-medium ${
                  pathname === l.href ? "bg-surface2 text-fg" : "text-muted"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}

          <li className="mt-2 border-t border-line pt-3">
            {!loading && user ? (
              <div className="space-y-1">
                <div className="flex items-center gap-3 px-4 py-2">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-fg text-sm font-bold uppercase text-bg">
                    {user.name?.[0] || "U"}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-fg">{user.name}</p>
                    <p className="text-xs text-muted">{user.email}</p>
                  </div>
                </div>
                <Link
                  href="/account"
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-fg"
                >
                  My account
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold text-rose-500"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex gap-3 px-1">
                <Link href="/login" className="btn-ghost flex-1">
                  Log in
                </Link>
                <Link href="/register" className="btn-primary flex-1">
                  Sign up
                </Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
