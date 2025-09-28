import { druid } from "@/lib/client";
import { BlogPost, generateBlogPostMetadata } from "@druid-sh/sdk";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  const postData = await druid.getPost(slug);

  if (!postData.post) {
    return {
      title: "Post Not Found",
    };
  }

  return generateBlogPostMetadata(
    postData.post,
    `${postData.post.title} - ${druid.siteName}`
  );
}

export async function generateStaticParams() {
  const slugs = await druid.getSlugs();

  return slugs;
}

export const revalidate = druid.revalidate;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const data = await druid.getPost(slug);

  if (!data.post) {
    notFound();
  }

  return <BlogPost data={data} />;
}
