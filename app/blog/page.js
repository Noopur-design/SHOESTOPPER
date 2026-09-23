import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/reactbits/SplitText";
import GradientText from "@/components/reactbits/GradientText";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { posts } from "@/data/posts";

export const metadata = {
  title: "Journal | ShoeStopper",
  description:
    "Guides, care tips, and sneaker culture from the ShoeStopper team.",
};

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <div className="pt-28 md:pt-36">
      <section className="container-x">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">
          The Journal
        </p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          <SplitText text="Stories from the" />{" "}
          <GradientText>studio.</GradientText>
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          Buying guides, care tips, and a look at what we're lacing up next.
        </p>
      </section>

      {/* Featured post */}
      <section className="container-x py-12">
        <Reveal>
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-[2rem] border border-line bg-surface lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
              <Image
                src={featured.cover}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <div className="flex items-center gap-3 text-xs text-muted">
                <span className="chip">{featured.category}</span>
                <span>{formatDate(featured.date)}</span>
                <span>· {featured.readtime}</span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 leading-relaxed text-muted">
                {featured.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-500">
                Read article
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Post grid */}
      <section className="container-x pb-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <SpotlightCard className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <span>{formatDate(post.date)}</span>
                      <span>· {post.readtime}</span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-bold text-fg">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 text-sm font-semibold text-brand-500">
                      Read more →
                    </span>
                  </div>
                </SpotlightCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
