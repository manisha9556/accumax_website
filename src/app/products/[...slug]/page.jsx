import { notFound } from "next/navigation";
import { headers } from "next/headers";
import DynamicProductDetail from "@/components/product/DynamicProductDetail";

export const dynamic = "force-dynamic";

const getBaseUrl = async () => {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") || "http";

  return host
    ? `${protocol}://${host}`
    : `http://localhost:${process.env.PORT || 3000}`;
};

const fetchProduct = async (slugPath) => {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/products/${slugPath}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const result = await res.json();
  return result.data || null;
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const slugPath = Array.isArray(slug) ? slug.join("/") : slug;
  const product = await fetchProduct(slugPath);

  if (!product) {
    return {
      title: "Product Not Found | Accumax India",
    };
  }

  return {
    title: product.metaTitle || `${product.title} | Accumax India`,
    description:
      product.metaDescription ||
      product.lead ||
      product.description ||
      "Explore cleanroom equipment from Accumax India.",
  };
}

export default async function ProductDetail({ params }) {
  const { slug } = await params;
  const slugPath = Array.isArray(slug) ? slug.join("/") : slug;
  const product = await fetchProduct(slugPath);

  if (!product) {
    notFound();
  }

  return <DynamicProductDetail product={product} />;
}
