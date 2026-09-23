import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
  description: "Get in touch with the ShoeStopper team. We're here to help.",
};

const details = [
  { icon: "📍", label: "Visit us", value: "42 Linking Road, Bandra West, Mumbai 400050" },
  { icon: "✉️", label: "Email", value: "hello@shoestopper.in" },
  { icon: "📞", label: "Phone", value: "+91 98765 43210" },
  { icon: "🕘", label: "Hours", value: "Mon–Sat · 9am – 7pm IST" },
];

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Free express shipping arrives in 2–4 business days across India.",
  },
  {
    q: "What's your return policy?",
    a: "Wear them for 60 days. If they're not perfect, return them free.",
  },
  {
    q: "Do you ship internationally?",
    a: "We deliver across India, plus 38 countries internationally with rates at checkout.",
  },
];

export default function ContactPage() {
  return (
    <div className="pt-28 md:pt-36">
      <section className="container-x">
        <Reveal>
          <div className="max-w-2xl">
            <span className="chip">We'd love to hear from you</span>
            <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              Get in <span className="text-gradient">touch</span>
            </h1>
            <p className="mt-4 text-lg text-muted">
              Questions about sizing, orders, or just want to say hi? Drop us a
              line and our team will get back within 24 hours.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <div className="rounded-3xl border border-line bg-surface p-7 sm:p-9">
              <ContactForm />
            </div>
          </Reveal>

          {/* Details */}
          <Reveal delay={0.12} className="lg:col-span-2">
            <div className="space-y-4">
              {details.map((d) => (
                <div
                  key={d.label}
                  className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-brand-500/40"
                >
                  <span className="text-2xl">{d.icon}</span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted">
                      {d.label}
                    </p>
                    <p className="mt-1 font-medium text-fg">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x py-20">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Frequently asked
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-display font-bold text-fg">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {f.a}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
