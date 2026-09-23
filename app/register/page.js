"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/components/ToastProvider";

export default function RegisterPage() {
  const { user, register, loading } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace("/account");
  }, [loading, user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setSubmitting(true);
    try {
      const u = await register(name, email, password);
      toast.success(`Welcome to the club, ${u.name.split(" ")[0]}! 🎉`);
      router.push("/account");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden pt-28 md:pt-36">
      <div className="pointer-events-none absolute -left-24 top-24 -z-10 h-[380px] w-[380px] blob bg-accent/25 blur-[90px]" />
      <div className="pointer-events-none absolute -right-24 top-40 -z-10 h-[340px] w-[340px] blob bg-brand-300/40 blur-[100px]" />

      <div className="container-x flex justify-center">
        <div className="w-full max-w-md">
          <div className="text-center">
            <h1 className="font-display text-4xl font-extrabold tracking-tight">
              Join the <span className="serif-accent text-brand-500">club</span>
            </h1>
            <p className="mt-2 text-muted">
              Create an account for 10% off your first order.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-4 rounded-3xl border border-line bg-surface p-7 shadow-sm sm:p-9"
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-fg">
                Full name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg placeholder-muted outline-none transition-colors focus:border-brand-500"
              />
            </div>
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
                placeholder="At least 6 characters"
                className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg placeholder-muted outline-none transition-colors focus:border-brand-500"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn-accent w-full disabled:opacity-60"
            >
              {submitting ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-brand-500 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
