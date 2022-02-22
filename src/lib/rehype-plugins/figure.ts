/* eslint-disable no-param-reassign */
import type { Root } from 'hast';
import { h } from 'hastscript';
import { visit } from 'unist-util-visit';

interface HtmlImage {
  src: string;
  loading?: string;
  alt: string;
  className?: string;
}

function buildFigure(caption: string, ...imgs: HtmlImage[]) {
  return h('figure', [
    ...imgs.map((img) =>
      h('img', {
        src: img.src,
        alt: caption,
        loading: 'lazy',
        class: img.className || '',
      })
    ),
    h('figcaption', caption),
  ]);
}

export function figureTransformer(tree: Root) {
  visit(tree, { tagName: 'p' }, (node, index) => {
    if (
      node.children.length !== 1 ||
      node.children[0]?.type !== 'text' ||
      index === null
    )
      return;

    const textNode = node.children[0];
    const matches = textNode.value.match(
      /{{(Figure|FigureSingle|FigureSingleWithClass) ("[^"]+"\s?)+}}/gi
    );

    if (!matches) return;

    const figureType = textNode.value
      .match(/{{(Figure|FigureSingle|FigureSingleWithClass)\s/)
      ?.at(1)!;

    const parameters = (textNode.value.match(/("[^"]+)"\s?/gi) as string[]).map(
      (value) => value.trim().replaceAll('"', '')
    );

    const caption = parameters[0]!;
    switch (figureType) {
      case 'FigureSingle':
        tree.children[index] = buildFigure(caption, {
          src: parameters[1] || '',
          alt: caption,
        });
        break;
      case 'FigureSingleWithClass':
        tree.children[index] = buildFigure(caption, {
          src: parameters[1] || '',
          className: parameters[2] || '',
          alt: caption,
        });
        break;
      default:
        buildFigure(
          caption,
          ...parameters.slice(1).map((src) => ({
            src,
            className: '',
            alt: caption,
          }))
        );
    }
  });
}
