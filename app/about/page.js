import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/reactbits/SplitText";
import GradientText from "@/components/reactbits/GradientText";
import CountUp from "@/components/reactbits/CountUp";
import SpotlightCard from "@/components/reactbits/SpotlightCard";

export const metadata = {
  title: "About | ShoeStopper",
  description:
    "The story behind ShoeStopper, obsessed with comfort, performance, and design since day one.",
};

const values = [
  {
    title: "Comfort first",
    text: "Every last, foam, and stitch is tuned for how a shoe actually feels after mile ten.",
  },
  {
    title: "Built to last",
    text: "Premium materials and honest construction so your pair keeps up for seasons, not weeks.",
  },
  {
    title: "Design that moves",
    text: "Silhouettes that look as good on the street as they perform on the track.",
  },
  {
    title: "Planet-minded",
    text: "Recycled knits, reduced-waste packaging, and a take-back program for old pairs.",
  },
];

const stats = [
  { to: 2018, label: "Founded", format: (v) => v.toFixed(0) },
  { to: 50, suffix: "k+", label: "Pairs shipped" },
  { to: 4.9, decimals: 1, suffix: "★", label: "Avg. rating" },
  { to: 38, label: "Countries" },
];

const team = [
  {
    name: "Ava Chen",
    role: "Founder & CEO",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Marcus Bell",
    role: "Head of Design",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Priya Nair",
    role: "Materials Lead",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-28 md:pt-36">
      {/* Hero */}
      <section className="container-x">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="chip">Our story</span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
              <SplitText text="We build shoes for" />{" "}
              <GradientText>people who move.</GradientText>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              ShoeStopper started in a tiny workshop with one stubborn goal:
              make footwear that feels incredible without compromising on how it
              looks. Years later, that obsession still drives every pair we make.
            </p>
            <Link href="/shop" className="btn-primary mt-8">
              Shop the collection
            </Link>
          </div>
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=900&q=80"
                alt="Shoe craftsmanship"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="container-x py-20">
        <div className="grid grid-cols-2 gap-6 rounded-3xl border border-line bg-surface p-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center">
                <p className="font-display text-3xl font-extrabold text-fg sm:text-4xl">
                  <CountUp
                    to={s.to}
                    decimals={s.decimals || 0}
                    suffix={s.suffix || ""}
                  />
                </p>
                <p className="mt-1 text-sm text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container-x pb-8">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            What we stand for
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <SpotlightCard className="h-full p-7 transition-transform duration-300 hover:-translate-y-1">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/15 font-display font-bold text-brand-500">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-fg">
                  {v.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{v.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="container-x py-20">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            The people behind the pairs
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <div className="group overflow-hidden rounded-3xl border border-line bg-surface">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={m.img}
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-fg">
                    {m.name}
                  </h3>
                  <p className="text-sm text-brand-500">{m.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
