/**
 * Simple PostCSS plugin that unwraps @layer rules.
 * Removes @layer wrappers but keeps all rules inside intact,
 * preserving media queries and source order.
 * Tailwind v4 already emits CSS in correct cascade order,
 * so simply removing @layer is safe for older browsers.
 */
const plugin = () => ({
  postcssPlugin: 'postcss-unwrap-layer',
  AtRule: {
    layer(atRule) {
      if (atRule.nodes && atRule.nodes.length > 0) {
        atRule.replaceWith(atRule.nodes);
      } else {
        atRule.remove();
      }
    },
  },
});

plugin.postcss = true;
export default plugin;
