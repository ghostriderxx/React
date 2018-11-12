import { generate as generateColor } from "ant-design-palettes";
import * as React from "react";

export function log(message) {
  if (!(process && process.env && process.env.NODE_ENV === "production")) {
    console.error(`[@ant-design/icons-react]: ${message}.`);
  }
}

export function isIconDefinition(target) {
  return (
    typeof target === "object" &&
    typeof target.name === "string" &&
    typeof target.theme === "string" &&
    (typeof target.icon === "object" || typeof target.icon === "function")
  );
}

export function normalizeAttrs(attrs) {
  return Object.keys(attrs).reduce((acc, key) => {
    const val = attrs[key];
    switch (key) {
      case "class":
        acc.className = val;
        delete acc.class;
        break;
      default:
        acc[key] = val;
    }
    return acc;
  }, {});
}

export class MiniMap {
  get size() {
    return Object.keys(this.collection).length;
  }

  collection = {};

  clear() {
    this.collection = {};
  }

  delete(key) {
    return delete this.collection[key];
  }

  get(key) {
    return this.collection[key];
  }

  has(key) {
    return Boolean(this.collection[key]);
  }

  set(key, value) {
    this.collection[key] = value;
    return this;
  }
}

export function generate(node, key, rootProps) {
  if (!rootProps) {
    return React.createElement(
      node.tag,
      { key, ...normalizeAttrs(node.attrs) },
      (node.children || []).map((child, index) =>
        generate(child, `${key}-${node.tag}-${index}`)
      )
    );
  }
  return React.createElement(
    node.tag,
    {
      key,
      ...normalizeAttrs(node.attrs),
      ...rootProps
    },
    (node.children || []).map((child, index) =>
      generate(child, `${key}-${node.tag}-${index}`)
    )
  );
}

export function getSecondaryColor(primaryColor) {
  // choose the second color
  return generateColor(primaryColor)[0];
}

export function withSuffix(name, theme) {
  switch (theme) {
    case "fill":
      return `${name}-fill`;
    case "outline":
      return `${name}-o`;
    case "twotone":
      return `${name}-twotone`;
    default:
      throw new TypeError(`Unknown theme type: ${theme}, name: ${name}`);
  }
}
