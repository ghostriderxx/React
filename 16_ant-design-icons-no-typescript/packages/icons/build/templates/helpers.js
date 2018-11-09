export function renderIconDefinitionToSVGElement(icon, options = {}) {
    if (typeof icon.icon === 'function') {
        // two-tone
        const placeholders = options.placeholders || {};
        return renderAbstractNodeToSVGElement(
            icon.icon(placeholders.primaryColor || '#333', placeholders.secondaryColor || '#E6E6E6'),
            options
        );
    }
    // fill, outline
    return renderAbstractNodeToSVGElement(icon.icon, options);
}

function renderAbstractNodeToSVGElement(node, options) {
    const targetAttrs =
        node.tag === 'svg'
            ? {
                  ...node.attrs,
                  ...(options.extraSVGAttrs || {})
              }
            : node.attrs;
    const attrs = Object.keys(targetAttrs).reduce((acc, nextKey) => {
        const key = nextKey;
        const value = targetAttrs[key];
        const token = `${key}="${value}"`;
        acc.push(token);
        return acc;
    }, []);
    const attrsToken = attrs.length ? ' ' + attrs.join(' ') : '';
    const container = [`<${node.tag}${attrsToken}>`, `</${node.tag}>`];
    const children = (node.children || []).map((child) => renderAbstractNodeToSVGElement(child, options)).join('');
    return `${container[0]}${children}${container[1]}`;
}
