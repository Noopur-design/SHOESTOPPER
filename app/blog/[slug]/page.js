import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { posts, getPost } from "@/data/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return { title: "Not found" };
  return { title: post.title, description: post.excerpt };
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function PostPage({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="pt-28 md:pt-36">
      <div className="container-x max-w-3xl">
        <nav className="flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-fg">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-fg">
            Journal
          </Link>
        </nav>

        <div className="mt-6 flex items-center gap-3 text-xs text-muted">
          <span className="chip">{post.category}</span>
          <span>{formatDate(post.date)}</span>
          <span>· {post.readtime}</span>
        </div>

        <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-5 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-500/15 font-bold text-brand-500">
            {post.author[0]}
          </div>
          <div>
            <p className="text-sm font-semibold text-fg">{post.author}</p>
            <p className="text-xs text-muted">ShoeStopper team</p>
          </div>
        </div>
      </div>

      <div className="container-x mt-10 max-w-4xl">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-line">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="container-x mt-12 max-w-3xl">
        <div className="space-y-6">
          {post.body.map((para, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-lg leading-relaxed text-fg/90">{para}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between rounded-2xl border border-line bg-surface p-6">
          <p className="font-medium text-fg">Enjoyed this read?</p>
          <Link href="/shop" className="btn-primary">
            Shop the collection
          </Link>
        </div>
      </div>

      {/* More posts */}
      <section className="container-x max-w-5xl py-20">
        <h2 className="font-display text-2xl font-extrabold tracking-tight">
          Keep reading
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {more.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group block overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <p className="text-xs text-muted">{p.category}</p>
                <h3 className="mt-1 font-display font-bold text-fg">
                  {p.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
