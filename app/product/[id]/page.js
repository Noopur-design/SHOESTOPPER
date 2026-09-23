import { notFound } from "next/navigation";
import ProductView from "@/components/ProductView";
import { products, getProduct, getRelated } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }) {
  const product = getProduct(params.id);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductPage({ params }) {
  const product = getProduct(params.id);
  if (!product) notFound();
  const related = getRelated(params.id, 3);
  return <ProductView product={product} related={related} />;
}
