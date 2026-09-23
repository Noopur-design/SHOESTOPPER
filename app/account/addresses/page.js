"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/components/ToastProvider";

const empty = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  phone: "",
};

export default function AddressesPage() {
  const toast = useToast();
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState(empty);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () =>
    fetch("/api/addresses", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setAddresses(d.addresses || []))
      .catch(() => {});

  useEffect(() => {
    load();
  }, []);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const r = await fetch("/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      toast.success("Address saved ✅");
      setForm(empty);
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err.message || "Could not save address.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    const r = await fetch(`/api/addresses/${id}`, { method: "DELETE" });
    const d = await r.json();
    setAddresses(d.addresses || []);
    toast.info("Address removed.");
  };

  const makeDefault = async (id) => {
    const r = await fetch(`/api/addresses/${id}`, { method: "PATCH" });
    const d = await r.json();
    setAddresses(d.addresses || []);
    toast.success("Default address updated.");
  };

  const field =
    "w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg placeholder-muted outline-none transition-colors focus:border-brand-500";

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight">
            Addresses
          </h1>
          <p className="mt-1 text-muted">Manage where your orders ship.</p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="btn-primary"
        >
          {showForm ? "Close" : "+ Add new"}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={submit}
            className="mt-6 overflow-hidden rounded-3xl border border-line bg-surface"
          >
            <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
              <input className={field} placeholder="Full name" value={form.name} onChange={(e) => update("name", e.target.value)} />
              <input className={field} placeholder="Phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              <input className={`${field} sm:col-span-2`} placeholder="Address line 1" value={form.line1} onChange={(e) => update("line1", e.target.value)} />
              <input className={`${field} sm:col-span-2`} placeholder="Address line 2 (optional)" value={form.line2} onChange={(e) => update("line2", e.target.value)} />
              <input className={field} placeholder="City" value={form.city} onChange={(e) => update("city", e.target.value)} />
              <input className={field} placeholder="State" value={form.state} onChange={(e) => update("state", e.target.value)} />
              <input className={field} placeholder="PIN code" value={form.pincode} onChange={(e) => update("pincode", e.target.value)} />
              <div className="sm:col-span-2">
                <button type="submit" disabled={saving} className="btn-accent disabled:opacity-60">
                  {saving ? "Saving…" : "Save address"}
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {addresses.length === 0 && !showForm && (
          <div className="rounded-3xl border border-dashed border-line bg-surface py-14 text-center sm:col-span-2">
            <p className="text-4xl">📍</p>
            <p className="mt-4 font-display text-lg font-bold">No addresses yet</p>
            <p className="mt-1 text-muted">Add one to speed up checkout.</p>
          </div>
        )}
        {addresses.map((a) => (
          <div
            key={a.id}
            className="relative rounded-3xl border border-line bg-surface p-6"
          >
            {a.isDefault && (
              <span className="sticker absolute right-4 top-4 bg-brand-500 text-white">
                Default
              </span>
            )}
            <p className="font-display font-bold text-fg">{a.name}</p>
            <p className="mt-2 text-sm text-muted">
              {a.line1}
              {a.line2 ? `, ${a.line2}` : ""}
              <br />
              {a.city}, {a.state} {a.pincode}
              <br />
              📞 {a.phone}
            </p>
            <div className="mt-4 flex gap-3 text-sm font-semibold">
              {!a.isDefault && (
                <button
                  onClick={() => makeDefault(a.id)}
                  className="text-brand-500 hover:underline"
                >
                  Set default
                </button>
              )}
              <button
                onClick={() => remove(a.id)}
                className="text-rose-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
