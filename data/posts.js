// Blog/journal content for ShoeStopper.

export const posts = [
  {
    slug: "how-to-pick-running-shoes",
    title: "How to Pick the Right Running Shoe",
    excerpt:
      "Gait, cushioning, drop, and fit, a plain-English guide to finding the pair your feet have been waiting for.",
    category: "Guides",
    date: "2026-09-12",
    readtime: "6 min read",
    author: "Maya R.",
    cover:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=80",
    body: [
      "Choosing a running shoe isn't about grabbing the flashiest pair on the wall. It starts with understanding how your foot moves. Watch how your old shoes wear down, even wear across the sole usually means a neutral gait, while heavy wear on the inner edge points to overpronation.",
      "Cushioning is personal. Max-cushion shoes soak up impact for long, easy miles, while lower-stack racers keep you connected to the ground for speed. Neither is 'better', they're built for different days.",
      "Then there's drop: the height difference between heel and toe. A higher drop (10–12mm) suits heel strikers, while a lower drop (0–6mm) encourages a midfoot landing. If you're switching, do it gradually.",
      "Finally, fit trumps everything. Shop in the afternoon when your feet are slightly swollen, leave a thumb's width at the toe, and never trust a shoe to 'break in.' The right pair feels right on step one.",
    ],
  },
  {
    slug: "care-guide-make-them-last",
    title: "Sneaker Care 101: Make Them Last",
    excerpt:
      "Five minutes of maintenance a week can double the life of your favorite pair. Here's the routine that works.",
    category: "Care",
    date: "2026-08-28",
    readtime: "4 min read",
    author: "Priya Nair",
    cover:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1400&q=80",
    body: [
      "Great shoes deserve a little love. The single best habit is rotating between two pairs, giving the foam 24 hours to decompress between wears keeps the cushioning springy far longer.",
      "For cleaning, skip the washing machine. A soft brush, lukewarm water, and a drop of mild soap lift most dirt. Work in small circles, then wipe with a damp cloth and let them air dry away from direct heat.",
      "Stuff damp shoes with newspaper or a cedar shoe tree to hold their shape and pull moisture out. Never dry them on a radiator, heat warps the midsole and cracks glue lines.",
      "Store them somewhere cool and dry, out of the sun. A quick protector spray on suede and knit uppers repels stains before they set. Small effort, seasons of extra life.",
    ],
  },
  {
    slug: "trends-fall-2026",
    title: "The 5 Sneaker Trends Defining Fall '26",
    excerpt:
      "Chunky soles are cooling off and earthy tones are heating up. Here's what's lacing up this season.",
    category: "Trends",
    date: "2026-09-01",
    readtime: "5 min read",
    author: "Marcus Bell",
    cover:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1400&q=80",
    body: [
      "This season is all about restraint. The maximalist chunky sole is giving way to slimmer, retro-inspired silhouettes that borrow from the running archives of the '80s and '90s.",
      "Color-wise, expect earthy neutrals, moss, clay, sand, and faded terracotta, punctuated by a single pop of saturated orange or electric blue. It's warm, grounded, and easy to style.",
      "Materials are getting greener too. Recycled knits and bio-based foams are moving from marketing bullet points to genuine performance features, and shoppers are noticing.",
      "The throughline? Shoes that look considered, not loud. Fall '26 rewards the quiet flex.",
    ],
  },
  {
    slug: "trail-vs-road",
    title: "Trail vs. Road: Which Shoe Do You Need?",
    excerpt:
      "Lugs, protection, and grip, when the terrain changes, your shoe should too. A quick decision guide.",
    category: "Guides",
    date: "2026-07-19",
    readtime: "5 min read",
    author: "Sofia L.",
    cover:
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1400&q=80",
    body: [
      "Road shoes are built for smooth, predictable surfaces. They're lighter, more cushioned, and use flatter outsoles tuned for repetitive, efficient strides on pavement.",
      "Trail shoes trade some of that plush for protection. Aggressive lugs bite into loose dirt and mud, rock plates shield your soles, and reinforced uppers guard against roots and debris.",
      "If more than a third of your miles are off-road, invest in a dedicated trail pair. For the occasional gravel path, a sturdy road shoe will do just fine.",
      "When in doubt, match the shoe to where you spend most of your time, and keep the other pair ready for the days you wander.",
    ],
  },
];

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}
