import { Metadata } from "next";
import { notFound } from "next/navigation";
import { druid } from "../client";
import { generateBlogPostMetadata } from "@druid-sh/sdk";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const postData = await druid.getPost(params.slug);

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
  const { posts } = await druid.getPosts(1, 100);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const postData = await druid.getPost(params.slug);

  if (!postData.post) {
    notFound();
  }

  return <BlogPost postData={postData} />;
}
