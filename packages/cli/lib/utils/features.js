module.exports = [
  {
    name: 'Babel',
    value: 'babel',
    short: 'Babel',
    description:
      'Transpile modern JavaScript to older versions (for compatibility)',
    link: 'https://babeljs.io/'
  },
  {
    name: 'HTML templater', // HTML(JS) templating engine
    value: 'templater',
    short: 'HTML templater',
    injectPrompt: {
      name: 'templater',
      type: 'list',
      message: 'Pick a HTML templater:',
      choices: [
        {
          name: 'art-template',
          value: 'artTemplate'
        },
        {
          name: 'EJS',
          value: 'ejs'
        },
        {
          name: 'Pug',
          value: 'pug'
        },
        {
          name: 'Handlebars',
          value: 'handlebars'
        },
        {
          name: 'Nunjucks',
          value: 'nunjucks'
        }
      ]
    },
    onPromptComplete(answer, options) {
      options['templater'] = answer['templater']
    }
  },
  {
    name: 'CSS Pre-processors',
    value: 'cssPreprocessor',
    short: 'CSS Pre-processors',
    description: 'Add support for CSS pre-processors like Sass, Less or Stylus',
    injectPrompt: {
      name: 'cssPreprocessor',
      type: 'list',
      message: 'Pick a CSS pre-processor:',
      choices: [
        {
          name: 'Sass/SCSS (with dart-sass)',
          value: 'sass'
        },
        {
          name: 'Less',
          value: 'less'
        },
        {
          name: 'Stylus',
          value: 'stylus'
        }
      ]
    },
    onPromptComplete(answer, options) {
      options['cssPreprocessor'] = answer['cssPreprocessor']
    }
  },
  {
    name: 'Compress Image & SVG',
    value: 'imagemin',
    short: 'Compress Image',
    description: 'Minify PNG, JPEG, GIF and SVG images'
  },
  {
    name: 'Linter / Formatter',
    value: 'linter',
    short: 'Linter',
    description: 'Check and enforce code quality with ESLint or Prettier',
    injectPrompt: {
      name: 'eslintConfig',
      type: 'list',
      message: 'Pick a linter / formatter config:',
      description: 'Checking code errors and enforcing an homogeoneous code style is recommended.',
      choices: [
        {
          name: 'ESLint with error prevention only',
          value: 'base',
          short: 'Basic'
        },
        {
          name: 'ESLint + Airbnb config',
          value: 'airbnb',
          short: 'Airbnb'
        },
        {
          name: 'ESLint + Standard config',
          value: 'standard',
          short: 'Standard'
        },
        {
          name: 'ESLint + Prettier',
          value: 'prettier',
          short: 'Prettier'
        }
      ]
    },
    onPromptComplete(answer, options) {
      options['eslintConfig'] = answer['eslintConfig']
    }
  }
]
