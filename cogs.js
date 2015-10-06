module.exports = {
  in: {
    es6: {
      out: 'js',
      transformers: [
        {name: 'babel', options: {modules: 'umd', stage: 0}},
        {
          name: 'replace',
          only: 'olay-react.es6',
          options: {patterns: {olayReact: 'OlayReact'}}}
      ]
    }
  },
  builds: {
    'olay-react.es6': '.',
    'examples/index.es6': 'examples'
  }
};
