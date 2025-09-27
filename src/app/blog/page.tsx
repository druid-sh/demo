import { druid } from "@/lib/client";
import { BlogList, generateBlogListMetadata } from "@druid-sh/sdk";
import type { Metadata } from "next";

export const metadata: Metadata = generateBlogListMetadata(
  `Blog - ${druid.siteName}`
);

interface BlogHomeProps {
  params: Promise<{ page?: string }>;
}

export const dynamic = "force-static";
export const revalidate = 60;

export default async function BlogHome({ params }: BlogHomeProps) {
  const { page } = await params;

  const data = await druid.getPosts(parseInt(page || "1"));

  return <BlogList data={data} />;
}
