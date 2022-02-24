/* eslint-disable no-param-reassign */
import type { Element } from 'hast';
import { h, Properties } from 'hastscript';
import { HChild } from 'hastscript/lib/core';

export class Node {
  element: Element;

  parent?: Node;

  constructor(
    selector: string,
    properties?: Properties,
    ...children: HChild[]
  ) {
    this.element = h(selector, properties, ...children);
  }

  appendChild(child: Node) {
    child.parent = this;
    this.element.children.push(child.element);
  }
}

export function n(
  selector: string,
  properties?: Properties,
  ...children: HChild[]
): Node {
  return new Node(selector, properties, ...children);
}
