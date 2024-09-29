/// <reference types="node" />

interface IOptions {
  /**
   * A value indicating whether binary files should be skipped.
   */
  skipBinary?: boolean
}

interface ReplacerContext {
  file: File
}

type Replacer = (this: ReplacerContext, match: string, ...args: any[]) => string

type Replacements =
  | Array<{ search: string | RegExp; replacement: string | Replacer }>
  | [string | RegExp, string | Replacer][]
  | Record<string, string>

declare function renew(replacements: Replacements, options: IOptions): NodeJS.ReadWriteStream

export = renew
