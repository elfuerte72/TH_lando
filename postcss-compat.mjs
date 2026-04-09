/**
 * PostCSS plugin for older browser compatibility.
 *
 * 1. Removes ::backdrop and ::file-selector-button from comma-separated
 *    selector lists (they cause the entire rule to be dropped in old browsers).
 * 2. Converts :where(X) → X (removes the :where() wrapper, keeps inner selector).
 * 3. Removes @property at-rules (unsupported in Safari <15.4, Chrome <85).
 */
const plugin = () => ({
  postcssPlugin: 'postcss-compat',

  AtRule: {
    property(atRule) {
      atRule.remove();
    },
  },

  Rule(rule) {
    const original = rule.selector;
    let sel = original;

    // Remove ::backdrop and ::file-selector-button from selector lists.
    // Split by comma, filter out selectors containing these pseudo-elements,
    // then rejoin.
    if (sel.includes('::backdrop') || sel.includes('::file-selector-button')) {
      const parts = sel.split(',').filter((s) => {
        const trimmed = s.trim();
        return !trimmed.includes('::backdrop') && !trimmed.includes('::file-selector-button');
      });
      if (parts.length === 0) {
        rule.remove();
        return;
      }
      sel = parts.join(',');
    }

    // Convert :where(X) → X
    // Handle nested parens: :where(.foo:not(.bar)) → .foo:not(.bar)
    if (sel.includes(':where(')) {
      sel = unwrapWhere(sel);
    }

    if (sel !== original) {
      rule.selector = sel;
    }
  },
});

/**
 * Unwrap all :where(...) occurrences in a selector string,
 * handling nested parentheses correctly.
 */
function unwrapWhere(sel) {
  let result = '';
  let i = 0;
  const marker = ':where(';

  while (i < sel.length) {
    const pos = sel.indexOf(marker, i);
    if (pos === -1) {
      result += sel.slice(i);
      break;
    }
    result += sel.slice(i, pos);
    // Find matching closing paren
    let depth = 1;
    let j = pos + marker.length;
    while (j < sel.length && depth > 0) {
      if (sel[j] === '(') depth++;
      if (sel[j] === ')') depth--;
      j++;
    }
    // Extract inner content (without the outer parens)
    result += sel.slice(pos + marker.length, j - 1);
    i = j;
  }
  return result;
}

plugin.postcss = true;
export default plugin;
