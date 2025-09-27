import { BlogList, generateBlogListMetadata } from "@druid-sh/sdk";
import type { Metadata } from "next";
import { druid } from "./client";

export const metadata: Metadata = generateBlogListMetadata(
  `Blog - ${druid.siteName}`
);

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  return [{ page: "1" }, { page: "2" }, { page: "3" }];
}

export const revalidate = 60;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page } = await searchParams;

  const data = await druid.getPosts(parseInt(page || "1"), 10);

  return <BlogList data={data} />;
}
