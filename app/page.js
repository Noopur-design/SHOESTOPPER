import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import SplitText from "@/components/reactbits/SplitText";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import StarBorder from "@/components/reactbits/StarBorder";
import { products } from "@/data/products";

const features = [
  {
    icon: "🚀",
    title: "Free Express Shipping",
    text: "Delivered to your door in 2–3 days, on every order, no minimum.",
  },
  {
    icon: "♻️",
    title: "60-Day Free Returns",
    text: "Not in love? Send them back for free within 60 days, no questions.",
  },
  {
    icon: "🛡️",
    title: "2-Year Warranty",
    text: "Every pair is backed by our craftsmanship guarantee.",
  },
  {
    icon: "⚡",
    title: "Engineered Comfort",
    text: "Responsive foams and breathable knits built for all-day wear.",
  },
];

const categoryCards = [
  {
    name: "Running",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sneakers",
    img: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Basketball",
    img: "https://images.unsplash.com/photo-1552066344-2464c1135c32?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Hiking",
    img: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80",
  },
];

const testimonials = [
  {
    quote:
      "The Velocity Pro shaved two minutes off my 10k. Ridiculously light and springy.",
    name: "Ananya Iyer",
    role: "Marathon runner, Bengaluru",
  },
  {
    quote:
      "Best sneakers I've owned. The build quality is unreal for the price point.",
    name: "Rohan Mehta",
    role: "Designer, Mumbai",
  },
  {
    quote:
      "Wore the Trail Blazers through the monsoon in Coorg and my feet stayed bone dry.",
    name: "Sneha Nair",
    role: "Backpacker, Kochi",
  },
  {
    quote:
      "Delivery hit my doorstep in two days and the fit was spot on. Zero complaints.",
    name: "Arjun Kapoor",
    role: "Student, Delhi",
  },
  {
    quote:
      "The Cloud Striders feel like walking on a mattress. My gym days got a lot comfier.",
    name: "Priya Deshmukh",
    role: "Trainer, Pune",
  },
  {
    quote:
      "Ordered, tracked, delivered, loved. Easily the smoothest sneaker purchase I've made.",
    name: "Vikram Reddy",
    role: "Developer, Hyderabad",
  },
];

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Free express shipping reaches most Indian pincodes in 2 to 4 business days. You'll get a tracking link the moment your order ships.",
  },
  {
    q: "What is your return policy?",
    a: "Wear them for up to 60 days. If they're not perfect, return them free for a full refund or a hassle-free exchange.",
  },
  {
    q: "How do I know my size?",
    a: "Every product page has a size selector in UK/India sizing. If you're between sizes, we recommend sizing up for running styles.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "UPI, all major credit and debit cards, net banking, popular wallets, and Cash on Delivery across India.",
  },
  {
    q: "Are the shoes genuine and warranted?",
    a: "Every pair is 100% authentic and backed by a 2-year craftsmanship warranty against manufacturing defects.",
  },
];

export default function HomePage() {
  const featured = products.slice(0, 4);

  return (
    <>
      <Hero />

      {/* Features */}
      <section className="container-x py-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <SpotlightCard className="h-full p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="text-3xl transition-transform duration-300 hover:scale-110">
                  {f.icon}
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-fg">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {f.text}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="container-x py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">
              Handpicked
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              <SplitText text="Featured Kicks" />
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-semibold text-muted transition-colors hover:text-brand-500"
          >
            View all →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-x py-20">
        <Reveal>
          <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Shop by <span className="serif-accent text-brand-500">category</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categoryCards.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <Link
                href="/shop"
                className="group relative block aspect-[3/4] overflow-hidden rounded-3xl border border-line transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <Image
                  src={c.img}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Shine sweep */}
                <div className="pointer-events-none absolute inset-0 -translate-x-[120%] -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-[120%]" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-xl font-bold text-white">
                    {c.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-2 text-sm text-brand-300 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Explore <span aria-hidden>→</span>
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="container-x py-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-line">
            <Image
              src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1600&q=80"
              alt="Sale banner"
              fill
              sizes="100vw"
              className="absolute inset-0 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
            <div className="relative px-7 py-14 sm:px-12 sm:py-20 md:py-28">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white">
                Limited time
              </span>
              <h2 className="mt-4 max-w-md font-display text-3xl font-extrabold leading-[1.1] text-white sm:text-4xl md:text-5xl">
                Up to <span className="text-gradient">30% off</span> summer styles
              </h2>
              <p className="mt-3 max-w-sm text-sm text-zinc-200 sm:text-base">
                The season's favorites are marked down. Grab them before they lace
                up and leave.
              </p>
              <Link href="/shop" className="btn-primary mt-6">
                Shop the Sale
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section className="container-x py-20">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">
              Loved by thousands
            </p>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              What runners are <span className="serif-accent text-brand-500">saying</span>
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <SpotlightCard className="h-full p-7">
                <div className="text-brand-500">★★★★★</div>
                <blockquote className="mt-4 text-fg">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-500/15 font-bold text-brand-500">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-fg">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </figcaption>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28 lg:h-fit">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">
                Good to know
              </p>
              <h2 className="mt-2 font-display text-[clamp(2rem,8vw,3rem)] font-extrabold leading-[1.05] tracking-tight">
                <span className="whitespace-nowrap">Frequently</span>{" "}
                <span className="serif-accent text-brand-500">asked</span>
              </h2>
              <p className="mt-4 max-w-sm text-muted">
                Everything you need to know before you check out. Still curious?
              </p>
              <Link href="/contact" className="btn-ghost mt-6">
                Talk to us
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-x pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-gradient-to-br from-brand-500/15 via-surface to-surface px-6 py-10 text-center sm:p-12 md:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
            <h2 className="font-display text-[clamp(1.75rem,7vw,3rem)] font-extrabold tracking-tight">
              Join the <span className="whitespace-nowrap">ShoeStopper</span>{" "}
              <span className="serif-accent">club</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Get early access to drops, exclusive discounts, and 10% off your
              first order.
            </p>
            <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="w-full rounded-full border border-line bg-bg px-5 py-3 text-sm text-fg placeholder-muted outline-none transition-colors focus:border-brand-500"
              />
              <StarBorder as="button" type="submit" className="shrink-0">
                Subscribe
              </StarBorder>
            </form>
          </div>
        </Reveal>
      </section>
    </>
  );
}
