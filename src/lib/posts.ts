import fs from "fs";
import path from "path";
import matter from "gray-matter";
import orderBy from "lodash.orderby";
import { generateHtmlFromMarkdown } from "./markdown";

export interface IPostData {
  id: string;
  title: string;
  excerpt: string;
  publishTimeMs: number;
  publishedAt: string;
  publishYear: number;
  relativeUrl: string;
  contentHtml?: string;
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

export async function getPostData(
  id: string,
  postsDirectory: PostsDirectory,
  processMarkdownContent?: boolean
): Promise<IPostData> {
  const fullPath = path.join(pathFor(postsDirectory), `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const publishedAt = new Date(data.date);

  let contentHtml = processMarkdownContent
    ? await generateHtmlFromMarkdown(content)
    : "";

  return {
    id,
    contentHtml,
    title: data.title,
    excerpt: data.excerpt,
    relativeUrl: `/${postsDirectory}/${id}`,
    publishTimeMs: publishedAt.getTime(),
    publishYear: publishedAt.getFullYear(),
    publishedAt: publishedAt.toLocaleDateString("en-CA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
}
