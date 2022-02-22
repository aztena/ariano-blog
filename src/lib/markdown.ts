import rehypeFormat from 'rehype-format';
import rehypePrism from 'rehype-prism-plus';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import { figureTransformer } from './rehype-plugins/figure';

export async function generateHtmlFromMarkdown(content: string) {
  const vFile = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(() => figureTransformer)
    .use(rehypeStringify)
    .use(rehypePrism)
    .process(content);

  return vFile.toString();
}
