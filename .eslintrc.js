module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'prettier',
    'plugin:prettier/recommended'
  ],
  plugins: ['react', 'import', 'prettier'],
  env: {
    browser: true,
    jasmine: true,
    jest: true,
    browser: true,
    amd: true,
    node: true
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }]
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    },
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: {
          src: './src'
        },
        extensions: ['.js', '.jsx']
      }
    }
  },
  parser: 'babel-eslint',
  rules: {
    'no-unused-vars': 1,
    'comma-dangle': ['error', 'never'],
    'react-hooks/exhaustive-deps': 0,
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true
      }
    ],
    'react/prop-types': 0,
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true
      }
    ]
  }
}
