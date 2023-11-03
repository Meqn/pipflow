import { Options as HtmlMinifyOptions } from 'html-minifier-terser'
import { MinifyOptions as TerserMinifyOptions } from 'terser'

export type TaskType =
  | 'html'
  | 'style'
  | 'script'
  | 'static'
  | 'image'
  | 'server'
  | 'remove'
  | 'copy'
  | 'archive'
  | 'user'
  | 'compose'

type TaskEntryType = string | string[] | string[][] | { [key: string]: string | string[] }

//=== task compiler 配置项
export type HtmlCompiler = 'pug' | 'ejs' | 'handlebars' | 'nunjucks' | 'artTemplate'
export type CssCompiler = 'less' | 'sass' | 'stylus'
export type JsCompiler = 'babel'
export type CompilerType<T> = T extends 'html'
  ? HtmlCompiler
  : T extends 'style'
  ? CssCompiler
  : T extends 'script'
  ? JsCompiler
  : T extends 'user'
  ? (done: Function) => any
  : never
interface HtmlCompilerOptions {
  data?: { [key: string]: any }
  [key: keyof any]: any
}
interface SassCompilerOptions {
  file?: string | undefined
  data?: string | undefined
  includePaths?: string[] | undefined
  indentedSyntax?: boolean | undefined
  indentType?: string | undefined
  indentWidth?: number | undefined
  linefeed?: string | undefined
  omitSourceMapUrl?: boolean | undefined
  outFile?: string | undefined
  outputStyle?: 'compact' | 'compressed' | 'expanded' | 'nested' | undefined
  precision?: number | undefined
  sourceComments?: boolean | undefined
  sourceMap?: boolean | string | undefined
  sourceMapContents?: boolean | undefined
  sourceMapEmbed?: boolean | undefined
  sourceMapRoot?: string | undefined
  errLogToConsole?: boolean | undefined
  imagePaths?: string[] | undefined
  onSuccess?: ((css: string) => any) | undefined
  onError?: ((err: Error) => any) | undefined
  sync?: boolean | undefined
  [key: string]: any
}
interface LessCompilerOptions {
  modifyVars?: {} | undefined
  paths?: string[] | undefined
  plugins?: any[] | undefined
  relativeUrls?: boolean | undefined
}
interface StylusCompilerOptions {
  compress?: boolean | undefined
  linenos?: boolean | undefined
  'include css'?: boolean | undefined
  rawDefine?:
    | undefined
    | {
        [variableName: string]: any
      }
}
interface CssPreprocessorOptions<T extends CssCompiler> {
  preprocessorOptions?: T extends 'less' ? LessCompilerOptions : T extends 'stylus' ? StylusCompilerOptions : SassCompilerOptions
  additionalData?: string
}
type CompilerOptions<T, C> = T extends 'html'
  ? HtmlCompilerOptions
  : C extends CssCompiler
    ? CssPreprocessorOptions<C>
    : never

//=== task minify 配置项
// type MinifyTaskType = 'html' | 'style' | 'script' | 'static' | 'image'
type CSSNanoOptions = {
  preset?: any
  plugins?: any[]
  configFile?: string
}
type ImageMinifyPlugin = (options: object) => (input: Buffer) => Promise<Buffer>
interface ImageMinifyOptions {
  plugins?: ImageMinifyPlugin[]
  options?: {
    verbose?: boolean
    silent?: boolean
  }
}
export type MinifyOptions<T> = T extends 'html'
  ? HtmlMinifyOptions
  : T extends 'style'
  ? CSSNanoOptions
  : T extends 'script'
  ? TerserMinifyOptions
  : T extends 'static' | 'image'
  ? ImageMinifyOptions
  : never

export interface TaskOptions<T extends TaskType, C extends CompilerType<T>> {
  /**
   * 任务名称
   * Task name
   * @default '[type]:[index]'
   */
  name?: string

  /**
   * 任务类型
   * Task Type
   */
  type: T

  /**
   * 指定任务入口文件
   * 
   * Specify the task entry
   */
  input?: TaskEntryType

  /**
   * 指定任务输出路径
   * 
   * Specify output path.
   * @default 'dist/'
   */
  dest?: string

  /**
   * 显式地在创建的 Vinyl 对象上设置 base 属性
   * 
   * Explicitly set the base property on created Vinyl objects. 
   * @default './src'
   */
  base?: string

  /**
   * 转译工具
   * Compiler.
   */
  compiler?: C

  /**
   * 转译选项
   * Compiler Configuration.
   */
  compilerOptions?: CompilerOptions<T, C>

  /**
   * 是否开始最小化混淆/压缩 或 配置项
   * 
   * Whether Minimize/compression or Configuration.
   */
  minify?: boolean | MinifyOptions<T>

  /**
   * 自定义任务处理流程
   * 
   * Customize task processing flow
   */
  plugins?: ((...args: any[]) => NodeJS.ReadWriteStream)[]

  /**
   * 文件哈希和版本控制
   * 
   * File hashing and version control.
   */
  fileHash?: T extends 'style' | 'script' | 'static' | 'image' ? boolean | '?' | '-' : never

  /**
   * 生成 source map 文件
   * 
   * Whether to generate source map.
   */
  sourcemap?: boolean | 'inline'

  /**
   * 字符串别名替换
   * 
   * alias replacement.
   */
  alias?: { [key: string]: string }

  /**
   * 在 serve 阶段是否监视文件变动并重新编译、刷新页面
   * 
   * Monitor file changes and recompile, refresh.
   * 
   * @default false
   */
  watch?: boolean
  
  /**
   * 生成的文件名 (仅`archive`任务有效)
   * 
   * filename.
   */
  filename?: T extends 'archive' ? string : never
}
