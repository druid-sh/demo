import { Metadata } from "next";
import { druid } from "../../client";
import { notFound } from "next/navigation";
import { BlogList, generateBlogListMetadata } from "@druid-sh/sdk";

interface BlogTagPageProps {
  params: { tag: string };
  searchParams: { page?: string };
}

export async function generateMetadata({
  params,
}: BlogTagPageProps): Promise<Metadata> {
  const tagData = await druid.getTag(params.tag);
  return generateBlogListMetadata(`${tagData.name} - Blog - ${druid.siteName}`);
}

export async function generateStaticParams() {
  const tags = await druid.getTags();

  return tags.map((tag) => ({
    tag: tag.slug,
  }));
}

export default async function BlogTagPage({
  params,
  searchParams,
}: BlogTagPageProps) {
  const { page } = await searchParams;

  const data = await druid.getPostsByTag(params.tag, Number(page));

  if (data.posts.length === 0) {
    return notFound();
  }

  return <BlogList data={data} />;
}
