/* eslint-disable no-param-reassign */
import type { Root } from 'hast';
import { h } from 'hastscript';
import { Element } from 'hastscript/lib/core';
import { visit } from 'unist-util-visit';

function buildFooter() {
  return h('div', {
    class: 'footnotes',
  });
}

function buildFootnoteAnchor(number: string, text: string) {
  return h(
    'p',
    h(
      'sup',
      {
        id: `footnote-${number}`,
      },
      h(
        'a',
        {
          href: `#footnote-${number}-source`,
        },
        number
      )
    ),
    text
  );
}

function buildFootnoteReference(number: string) {
  return h(
    'sup',
    {
      id: `footnote-${number}-source`,
    },
    h(
      'a',
      {
        href: `#footnote-${number}`,
      },
      number
    )
  );
}

export function transformFootnotes(tree: Root) {
  let footer: Element;
  let footerIndex: number;

  visit(tree, { tagName: 'p' }, (node, index) => {
    if (index === null) return;

    node.children.forEach((textNode) => {
      if (textNode.type !== 'text' || !textNode.value.match(/\[\d+\].*/))
        return;

      if (textNode.value.startsWith('[')) {
        // Process footnote anchor
        const matches = textNode.value.match(/\[(\d+)\](\s+.*)/)!;
        const number = matches[1]!;
        const footnote = matches[2]!;

        if (footer) {
          textNode.value = '';
        } else {
          footerIndex = index;
          footer = buildFooter();
        }

        footer.children.push(buildFootnoteAnchor(number, footnote));
      } else {
        // Process footnote reference
        // TODO: this needs to be updated for multiple references in the same text node
        const referenceRegex = /\s\[(\d+)\]/;
        const matches = textNode.value.match(referenceRegex)!;
        if (!matches) return;

        const number = matches[1]!;
        textNode.value = textNode.value.replace(referenceRegex, '');
        node.children.push(buildFootnoteReference(number));
      }
    });

    // Replace first footnote with wrapper if needed
    if (footerIndex) tree.children[footerIndex] = footer;
  });
}
