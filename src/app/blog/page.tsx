import { Metadata } from "next";
import { druid } from "./client";
import { BlogList, generateBlogListMetadata } from "@druid-sh/sdk";

export const metadata: Metadata = generateBlogListMetadata(
  `Blog - ${druid.siteName}`
);

interface BlogPageProps {
  searchParams: { page?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page } = await searchParams;
  const pageNum = parseInt(page || "1");

  const blogData = await druid.getPosts(pageNum, 1);

  return <BlogList blogData={blogData} />;
}
