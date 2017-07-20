module.exports = [
  {
    transformers: [
      {name: 'babel', options: {presets: ['es2015', 'stage-0', 'react']}}
    ],
    builds: {'olay-react.es6': 'olay-react.js'}
  },
  {
    transformers: [
      {
        name: 'replace',
        options: {
          flags: 'g',
          patterns: {'process.env.NODE_ENV': "'development'"}
        }
      },
      {name: 'babel', options: {presets: ['es2015', 'stage-0', 'react']}},
      {
        name: 'concat-commonjs',
        options: {entry: 'examples/index.es6', extensions: ['.es6', '.js']}
      }
    ],
    builds: {'examples/index.es6': 'examples/index.js'}
  }
];
