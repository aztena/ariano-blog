import fs from "fs";
import path from "path";
import matter from "gray-matter";
import orderBy from "lodash.orderby";
import groupBy from "lodash.groupby";
import { generateHtmlFromMarkdown } from "./markdown";

export interface IPostData {
  slug: string;
  title: string;
  excerpt: string;
  publishTimeMs: number;
  publishedAt: string;
  publishYear: number;
  relativeUrl: string;
  contentHtml?: string;
  imageUrl?: string;
}

function pathFor(postsDirectory: PostsDirectory) {
  return path.join("posts", postsDirectory);
}
export type PostsDirectory = "articles" | "fragments";

export async function getAllPostsData(
  postsDirectory: PostsDirectory
): Promise<IPostData[]> {
  const fileNames = fs.readdirSync(pathFor(postsDirectory));
  let posts = [];

  for (const fileName of fileNames) {
    const post = await getPostData(
      fileName.replace(/\.md$/, ""),
      postsDirectory
    );
    posts.push(post);
  }

  return posts;
}

export async function getSortedPostsData(
  postsDirectory: PostsDirectory,
  limit?: number
): Promise<IPostData[]> {
  const postsData = await getAllPostsData(postsDirectory);
  const sortedData = orderBy(postsData, (data) => data.publishTimeMs, "desc");
  return limit ? sortedData.splice(0, limit) : sortedData;
}

export async function getGroupedPostsDataByYear(
  postsDirectory: PostsDirectory
): Promise<{ [Key: string]: IPostData[] }> {
  const postsData = await getAllPostsData(postsDirectory);
  return groupBy(postsData, (data) => data.publishYear);
}

export async function getAllPostSlugs(postsDirectory: PostsDirectory) {
  const postsData = await getAllPostsData(postsDirectory);
  return postsData.map((data) => ({
    params: {
      slug: data.slug,
    },
  }));
}

export async function getPostData(
  slug: string,
  postsDirectory: PostsDirectory,
  processMarkdownContent?: boolean
): Promise<IPostData> {
  const fullPath = path.join(pathFor(postsDirectory), `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const publishedAt = new Date(data.date);

  let contentHtml = processMarkdownContent
    ? await generateHtmlFromMarkdown(content)
    : "";

  return {
    slug,
    contentHtml,
    title: data.title,
    excerpt: data.excerpt,
    relativeUrl: `/${postsDirectory}/${slug}`,
    publishTimeMs: publishedAt.getTime(),
    publishYear: publishedAt.getFullYear(),
    publishedAt: publishedAt.toLocaleDateString("en-CA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
}
