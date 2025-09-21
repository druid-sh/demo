# Druid SDK Demo

This is a [Next.js](https://nextjs.org) project demonstrating the integration of the [@druid-sh/sdk](https://www.npmjs.com/package/@druid-sh/sdk) for building a blog application. The SDK provides a simple way to manage blog posts, tags, and metadata generation for SEO.

## SDK Overview

The @druid-sh/sdk is a TypeScript SDK designed for integrating blog functionality into Next.js applications. It handles API interactions with a backend service, provides pre-built React components, and generates metadata for optimal SEO.

Key features:

- Fetch blog posts and individual posts
- Filter posts by tags
- Generate SEO-friendly metadata
- Pre-built components for blog lists and posts

## Installation

Install the SDK via npm, yarn, or pnpm:

```bash
npm install @druid-sh/sdk
# or
yarn add @druid-sh/sdk
# or
pnpm add @druid-sh/sdk
```

## Setup

### 1. Create a Client Instance

Create a `client.ts` file in your blog directory (e.g., `src/app/blog/client.ts`) to initialize the DruidClient:

```typescript
import { DruidClient } from "@druid-sh/sdk";

export const druid = new DruidClient({
  apiKey: "your-api-key-here", // Replace with your actual API key
  basePath: "/blog", // Base path for your blog routes
  siteName: "Your Site Name", // Your website's name
  projectId: "your-project-id", // Your project ID
});
```

**Parameters:**

- `apiKey`: Your API key for authentication with the Druid service.
- `basePath`: The base path for blog routes (e.g., `/blog`).
- `siteName`: The name of your site, used in metadata generation.
- `projectId`: Your unique project identifier.

### 2. Configure Next.js App Router

The SDK is designed to work with Next.js App Router. Create the following page files in `src/app/blog/`:

#### Blog List Page (`src/app/blog/page.tsx`)

```typescript
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
```

This page displays a paginated list of blog posts.

#### Individual Blog Post Page (`src/app/blog/[slug]/page.tsx`)

```typescript
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
```

This page renders individual blog posts and generates static params for all posts.

#### Tag-Specific Blog Page (`src/app/blog/tag/[tag]/page.tsx`)

```typescript
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
  const pageNum = parseInt(page || "1");

  const blogData = await druid.getPostsByTag(params.tag, pageNum);

  if (blogData.posts.length === 0) {
    return notFound();
  }

  return <BlogList blogData={blogData} />;
}
```

This page displays posts filtered by a specific tag.

## API Methods

The DruidClient provides the following methods:

- `getPosts(page: number, limit?: number)`: Fetch a paginated list of posts.
- `getPost(slug: string)`: Fetch a single post by slug.
- `getPostsByTag(tag: string, page: number)`: Fetch posts filtered by tag.
- `getTag(slug: string)`: Fetch tag details by slug.
- `getTags()`: Fetch all available tags.

## Components

- `BlogList`: Renders a list of blog posts with pagination.
- `BlogPost`: Renders an individual blog post (imported but not shown in the demo; ensure it's imported from the SDK).

## Metadata Generation

- `generateBlogListMetadata(title: string)`: Generates metadata for blog list pages.
- `generateBlogPostMetadata(post: Post, title: string)`: Generates metadata for individual post pages.

## Getting Started with This Demo

1. Clone this repository.
2. Install dependencies: `pnpm install`
3. Update `src/app/blog/client.ts` with your API key and project details.
4. Run the development server: `pnpm dev`
5. Visit [http://localhost:3000/blog](http://localhost:3000/blog) to see the blog.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features.
- [@druid-sh/sdk Documentation](https://github.com/druid-sh/sdk) - SDK-specific docs (if available).

## Deploy on Vercel

Deploy your Next.js app with the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
