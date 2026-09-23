import Link from "next/link";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import GradientText from "@/components/reactbits/GradientText";
import SplitText from "@/components/reactbits/SplitText";

export const metadata = {
  title: "FAQ & Help",
  description:
    "Answers to common questions about shipping, returns, sizing, and orders.",
};

const groups = [
  {
    title: "Shipping & Delivery",
    items: [
      {
        q: "How much does shipping cost?",
        a: "Shipping is free on every order across India, no minimum, no fine print. Express upgrades are available at checkout.",
      },
      {
        q: "How long will my order take?",
        a: "Standard orders arrive in 2–3 business days. You'll get a tracking link by email the moment your pair ships.",
      },
      {
        q: "Do you ship internationally?",
        a: "We deliver to every pincode across India, with international shipping to 38 countries calculated at checkout.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      {
        q: "What is your return policy?",
        a: "Wear them for up to 60 days. If they're not perfect, send them back for a full refund or a free exchange, returns are always free.",
      },
      {
        q: "How do I start a return?",
        a: "Head to your order confirmation email and tap 'Start a return,' or contact us and we'll email you a prepaid label.",
      },
    ],
  },
  {
    title: "Sizing & Fit",
    items: [
      {
        q: "How do ShoeStopper shoes fit?",
        a: "Most of our styles fit true to size. Running models run about a half size small, if you're between sizes, we recommend sizing up.",
      },
      {
        q: "Is there a size guide?",
        a: "Every product page includes a size selector with UK/India sizing. Measure your foot in the afternoon for the most accurate fit.",
      },
      {
        q: "What if my size is out of stock?",
        a: "Tap the size on the product page to join the restock list, and we'll email you the moment it's back.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="pt-28 md:pt-36">
      <section className="container-x max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">
          Help Center
        </p>
        <h1 className="mt-2 font-display text-[clamp(2rem,8vw,3rem)] font-extrabold leading-[1.05] tracking-tight">
          <SplitText text="Questions?" />{" "}
          <GradientText>Answered.</GradientText>
        </h1>
        <p className="mt-3 text-muted">
          Everything you need to know about ordering, shipping, and finding your
          fit. Still stuck? We're one message away.
        </p>
      </section>

      <section className="container-x max-w-3xl space-y-12 py-12">
        {groups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.05}>
            <div>
              <h2 className="mb-4 font-display text-xl font-bold text-fg">
                {group.title}
              </h2>
              <Accordion items={group.items} />
            </div>
          </Reveal>
        ))}
      </section>

      <section className="container-x max-w-3xl pb-24">
        <div className="rounded-3xl border border-line bg-gradient-to-br from-brand-500/15 via-surface to-surface p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">
            Still have questions?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-muted">
            Our support team replies within 24 hours, Monday through Saturday.
          </p>
          <Link href="/contact" className="btn-primary mt-6">
            Contact support
          </Link>
        </div>
      </section>
    </div>
  );
}
