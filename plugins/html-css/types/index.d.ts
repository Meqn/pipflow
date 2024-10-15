/// <reference types="node" />

import { Transform } from 'stream'
import { Plugin } from 'postcss'

declare namespace gulpHtmlCss {
  interface CompilerOptions {
    [key: string]: any
  }

  interface PostCSSOptions {
    [key: string]: any
  }

  interface Options {
    postcss?: PostCSSOptions
    compiler?: {
      render?: Function
      renderSync?: Function
      compile?: Function
      compileAsync?: Function
      compileString?: Function
      compileStringAsync?: Function
    }
    compilerOptions?: CompilerOptions
  }

  interface ExtendedOptions {
    merge?: boolean
  }
}

declare function gulpHtmlCss(
  plugins?: Plugin[] | Plugin,
  options?: gulpHtmlCss.Options,
  ext?: boolean | gulpHtmlCss.ExtendedOptions
): Transform

export = gulpHtmlCss
