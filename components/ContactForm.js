"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    e.target.reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-fg">
            Name
          </label>
          <input
            required
            type="text"
            placeholder="Jane Doe"
            className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg placeholder-muted outline-none transition-colors focus:border-brand-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-fg">
            Email
          </label>
          <input
            required
            type="email"
            placeholder="you@email.com"
            className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg placeholder-muted outline-none transition-colors focus:border-brand-500"
          />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-fg">
          Subject
        </label>
        <input
          required
          type="text"
          placeholder="How can we help?"
          className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg placeholder-muted outline-none transition-colors focus:border-brand-500"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-fg">
          Message
        </label>
        <textarea
          required
          rows={5}
          placeholder="Tell us a little more…"
          className="w-full resize-none rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg placeholder-muted outline-none transition-colors focus:border-brand-500"
        />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        Send message
      </button>

      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-500"
          >
            ✓ Thanks! Your message has been sent. We'll reply within 24 hours.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
