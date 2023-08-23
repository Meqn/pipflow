const { makeJSOnlyValue } = require('@pipflow/utils')

const DEPS_MAP = {
  base: {
    "eslint": "^8.47.0"
  },
  standard: {
    "eslint-config-standard": "^17.1.0",
    "eslint-plugin-import": "^2.25.4",
    "eslint-plugin-n": "^15.0.0 || ^16.0.0 ",
    "eslint-plugin-promise": "^6.0.0"
  },
  airbnb: {
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-plugin-import": "^2.25.4"
  },
  prettier: {
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "prettier": "^3.0.1"
  }
}

/**
 * `package.json` 的eslint依赖
 * @param {object} preset 用户预设
 */
exports.getDeps = (preset = {}) => {
  const deps = Object.assign({}, DEPS_MAP.base, DEPS_MAP[preset.eslintConfig])
  if (preset.babel) {
    Object.assign(deps, {
      "@babel/core": "^7.22.10",
      "@babel/eslint-parser": "^7.22.10"
    })
  }
  return deps
}

/**
 * `.eslintrc.js`
 * @param {object} preset 用户预设
 * @returns 
 */
exports.getConfig = (preset = {}) => {
  const config = {
    root: true,
    env: {
      browser: true,
      node: true
    },
    extends: [],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      'no-console': makeJSOnlyValue(`process.env.NODE_ENV === 'production' ? 'warn' : 'off'`),
      'no-debugger': makeJSOnlyValue(`process.env.NODE_ENV === 'production' ? 'warn' : 'off'`)
    }
  }

  if (preset.babel) {
    config.parserOptions.parser = '@babel/eslint-parser'
  }
  if (preset.eslintConfig === 'standard') {
    config.extends.push('standard')
  } else if (preset.eslintConfig === 'airbnb') {
    config.extends.push('airbnb-base')
  } else if (preset.eslintConfig === 'prettier') {
    config.extends.push('eslint:recommended', 'plugin:prettier/recommended')
    config.plugins = ['prettier']
  } else {
    config.extends.push('eslint:recommended')
  }

  return config
}
