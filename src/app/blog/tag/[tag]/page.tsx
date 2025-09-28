import { druid } from "@/lib/client";
import { BlogList, generateBlogListMetadata } from "@druid-sh/sdk";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogTagHomeProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({
  params,
}: BlogTagHomeProps): Promise<Metadata> {
  const { tag } = await params;
  const tagData = await druid.getTag(tag);
  return generateBlogListMetadata(`${tagData.name} - Blog - ${druid.siteName}`);
}

export async function generateStaticParams() {
  const tags = await druid.getTags();

  return tags.map((tag) => ({
    tag: tag.slug,
  }));
}

export const revalidate = 60;

export default async function BlogTagHome({ params }: BlogTagHomeProps) {
  const { tag } = await params;

  const data = await druid.getPostsByTag(tag, 1);

  if (data.posts.length === 0) {
    return notFound();
  }

  return <BlogList data={data} />;
}
