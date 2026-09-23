"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/components/ToastProvider";

export default function ProfilePage() {
  const { user, refresh } = useAuth();
  const toast = useToast();

  const [name, setName] = useState("");
  const [savingName, setSavingName] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [savingPw, setSavingPw] = useState(false);

  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  const field =
    "w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg placeholder-muted outline-none transition-colors focus:border-brand-500";

  const saveName = async (e) => {
    e.preventDefault();
    setSavingName(true);
    try {
      const r = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      await refresh();
      toast.success("Profile updated ✅");
    } catch (err) {
      toast.error(err.message || "Could not update profile.");
    } finally {
      setSavingName(false);
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    setSavingPw(true);
    try {
      const r = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      setCurrentPassword("");
      setNewPassword("");
      toast.success("Password changed 🔒");
    } catch (err) {
      toast.error(err.message || "Could not change password.");
    } finally {
      setSavingPw(false);
    }
  };

  if (!user) return null;

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold tracking-tight">
        Profile
      </h1>
      <p className="mt-1 text-muted">Update your personal details.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Details */}
        <form
          onSubmit={saveName}
          className="rounded-3xl border border-line bg-surface p-6 sm:p-8"
        >
          <h2 className="font-display text-lg font-bold text-fg">Details</h2>
          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-fg">
                Full name
              </label>
              <input
                className={field}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-fg">
                Email
              </label>
              <input
                className={`${field} cursor-not-allowed opacity-70`}
                value={user.email}
                disabled
              />
              <p className="mt-1 text-xs text-muted">Email can't be changed.</p>
            </div>
            <button
              type="submit"
              disabled={savingName}
              className="btn-accent disabled:opacity-60"
            >
              {savingName ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>

        {/* Password */}
        <form
          onSubmit={savePassword}
          className="rounded-3xl border border-line bg-surface p-6 sm:p-8"
        >
          <h2 className="font-display text-lg font-bold text-fg">Password</h2>
          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-fg">
                Current password
              </label>
              <input
                type="password"
                className={field}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-fg">
                New password
              </label>
              <input
                type="password"
                className={field}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
              />
            </div>
            <button
              type="submit"
              disabled={savingPw}
              className="btn-primary disabled:opacity-60"
            >
              {savingPw ? "Updating…" : "Change password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
