import rehypeFormat from 'rehype-format';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import { transformFigures } from './rehype-transformers/figure';
import { transformFootnotes } from './rehype-transformers/footnotes';
import { transformLinksToNoFollow } from './rehype-transformers/nofollow';

export async function generateHtmlFromMarkdown(content: string) {
  const vFile = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .use(rehypePrism)
    .use(() => transformFigures)
    .use(() => transformFootnotes)
    .use(() => transformLinksToNoFollow)
    .process(content);

  return vFile.toString();
}
