import { toHtml } from 'hast-util-to-html';

import { n } from './hast-node';

const headerRegExp =
  /<h([0-9]).* id="([^"]*)".*?>(<a.*?>)?(.*?)(<\/a>)?<\/h[0-9]>/gm;

interface Header {
  level: number;
  id: string;
  title: string;
}

function buildTree(headers: Header[]) {
  if (headers.length < 1) return null;

  let listNode = n('ol');

  const topNode = listNode;
  let listItemNode = n('li');
  listNode.appendChild(listItemNode);

  let needNewListNode = false;

  let { level } = headers[0]!;

  for (let i = 0; i < headers.length; i += 1) {
    const header = headers[i]!;

    if (header.level > level) {
      // Indent: Create new nested list for each level indented
      for (let j = 0; j < header.level - level; j += 1) {
        listNode = n('ol');
        listItemNode.appendChild(listNode);
      }

      needNewListNode = true;
      level = header.level;
    } else if (header.level < level) {
      // Dedent
      for (let j = 0; j < level - header.level; j += 1) {
        listItemNode = listNode.parent!;
        listNode = listItemNode.parent!;
      }

      level = header.level;
    }

    if (needNewListNode) {
      listItemNode = n('li');
      listNode.appendChild(listItemNode);
    }

    const linkNode = n(
      'a',
      {
        href: header.id,
      },
      [header.title]
    );
    listItemNode.appendChild(linkNode);

    needNewListNode = true;
  }

  return topNode.element;
}

export function generateTableOfContents(htmlContent: string) {
  const headers = Array.from(htmlContent.matchAll(headerRegExp), (match) => ({
    level: Number(match[1]),
    id: `#${match[2]}`,
    title: match[4] ?? '',
  }));

  const tocNode = buildTree(headers);
  return tocNode ? toHtml(tocNode) : '';
}
