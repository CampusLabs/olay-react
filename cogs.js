module.exports = {
  transformers: [
    {
      name: 'babel',
      options: {
        presets: ['es2015', 'stage-0', 'react'],
        plugins: [['transform-es2015-modules-umd', {
          globals: {
            'olay-react': 'OlayReact',
            'prop-types': 'PropTypes',
            'react-dom': 'ReactDOM',
            'react-transition-group/CSSTransitionGroup': 'CSSTransitionGroup',
            react: 'React'
          },
          moduleId: 'olay-react',
          exactGlobals: true
        }]]
      }
    }
  ],
  builds: {
    'olay-react.es6': 'olay-react.js',
    'examples/index.es6': 'examples/index.js'
  }
};
