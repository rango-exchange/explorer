module.exports = {
  jsx: {
    babelConfig: {
      plugins: [
        [
          '@svgr/babel-plugin-remove-jsx-attribute',
          {
            elements: ['svg'],
            attributes: ['id', 'width', 'height', 'class', 'title', 'fill'],
          },
        ],
      ],
    },
  },
  icon: false,
  plugins: ['@svgr/plugin-jsx', '@svgr/plugin-prettier'],
  typescript: true,
  outDir: 'components/icons',
  expandProps: false,
  prettier: true,
  filenameCase: 'pascal',
  jsxRuntime: 'automatic',
  replaceAttrValues: {
    '#373737': 'currentColor',
    '#010101': 'currentColor',
    '#469BF5': 'currentColor',
    '#727272': 'currentColor',
    '#B8B8B8': 'currentColor',
  },
  template: require('./template/react.cjs'),
  indexTemplate: require('./template/index.cjs'),
};
