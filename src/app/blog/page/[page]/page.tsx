import { druid } from "@/lib/client";
import { BlogList, generateBlogListMetadata } from "@druid-sh/sdk";
import type { Metadata } from "next";

export const metadata: Metadata = generateBlogListMetadata(
  `Blog - ${druid.siteName}`
);

interface BlogPageProps {
  params: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  const data = await druid.getPosts(1);

  const { totalPages } = data.pagination;

  return Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => ({
    page: String(page),
  }));
}

export const revalidate = 60;

export default async function BlogPage({ params }: BlogPageProps) {
  const { page } = await params;

  const data = await druid.getPosts(parseInt(page || "1"));

  return <BlogList data={data} />;
}
