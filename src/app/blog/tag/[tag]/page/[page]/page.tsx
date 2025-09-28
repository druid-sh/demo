import { druid } from "@/lib/client";
import { BlogList, generateBlogListMetadata } from "@druid-sh/sdk";
import type { Metadata } from "next";

export const metadata: Metadata = generateBlogListMetadata(
  `Blog - ${druid.siteName}`
);

interface BlogTagPageProps {
  params: Promise<{ tag: string; page?: string }>;
}

export async function generateStaticParams() {
  const pages = await druid.getTagPages();

  return pages;
}

export const revalidate = druid.revalidate;

export default async function BlogTagPage({ params }: BlogTagPageProps) {
  const { tag, page } = await params;

  const data = await druid.getPostsByTag(tag, parseInt(page || "1"));

  return <BlogList data={data} />;
}
