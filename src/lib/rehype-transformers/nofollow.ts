/* eslint-disable no-param-reassign */
import type { Root } from 'hast';
import { visit } from 'unist-util-visit';

export function transformLinksToNoFollow(tree: Root) {
  visit(tree, { tagName: 'a' }, (node, _) => {
    const href = (node.properties?.href as string) ?? '';

    if (href.match(/http[^"]+/))
      node.properties = { ...node.properties, rel: 'nofollow' };
  });
}
