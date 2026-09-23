"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/components/ToastProvider";

export default function LoginPage() {
  const { user, login, loading } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace("/account");
  }, [loading, user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const u = await login(email, password);
      toast.success(`Welcome back, ${u.name.split(" ")[0]}! 🎉`);
      router.push("/account");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden pt-28 md:pt-36">
      <div className="pointer-events-none absolute -left-24 top-24 -z-10 h-[380px] w-[380px] blob bg-brand-300/40 blur-[90px]" />
      <div className="pointer-events-none absolute -right-24 top-40 -z-10 h-[340px] w-[340px] blob bg-accent/20 blur-[100px]" />

      <div className="container-x flex justify-center">
        <div className="w-full max-w-md">
          <div className="text-center">
            <h1 className="font-display text-4xl font-extrabold tracking-tight">
              Welcome <span className="serif-accent text-brand-500">back</span>
            </h1>
            <p className="mt-2 text-muted">
              Log in to track orders and check out faster.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-4 rounded-3xl border border-line bg-surface p-7 shadow-sm sm:p-9"
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-fg">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg placeholder-muted outline-none transition-colors focus:border-brand-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-fg">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg placeholder-muted outline-none transition-colors focus:border-brand-500"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn-accent w-full disabled:opacity-60"
            >
              {submitting ? "Logging in…" : "Log in"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-muted">
            New to ShoeStopper?{" "}
            <Link
              href="/register"
              className="font-semibold text-brand-500 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
