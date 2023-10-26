import type { Options as ServerOptions } from 'browser-sync'
import { TaskOptions, TaskType, CompilerType, MinifyOptions } from './task'

export interface ConfigEnv {
  mode: string
  command: 'build' | 'serve'
}

export interface UserConfig {
  /**
   * 显式地在创建的 Vinyl 对象上设置 base 属性。具体请参见`gulp.src`的 options
   * 
   * Explicitly set the base property on created Vinyl objects. 
   * 
   * @default './src'
   */
  base?: string

  /**
   * 作为静态资源服务的文件夹
   * 
   * Folders for static resource services.
   * 
   * @default 'public'
   */
  publicDir?: string

  /**
   * 用于加载`.env`文件的目录
   * 
   * Environment variable file directory.
   */
  envDir?: string

  /**
   * 字符串别名，构建时会被静态替换
   * 
   * alias replacement.
   */
  alias?: {
    [key: string]: string
  }

  /**
   * 构建选项
   * 
   * Build Options.
   */
  build?: BuildOptions

  /**
   * 开发服务器选项
   * 
   * Development Server Options.
   */
  server?: ServerOptions

  /**
   * 任务列表
   * 
   * Task List.
   */
  tasks?: TaskOptions<TaskType, CompilerType<TaskType>>[]
}

interface BuildOptions {
  /**
   * 指定输出路径（相对于项目根目录)
   * 
   * Specify output path.
   */
  outDir?: string

  /**
   * 使用文件哈希作为资源文件的版本控制
   * 
   * Use file hash as version control.
   */
  fileHash?: boolean | '?' | '-'

  /**
   * 最小化混淆/压缩
   * 
   * Minimize/compression.
   */
  minify?: boolean
  
  /**
   * html文件压缩配置
   * 
   * html Compression Configuration.
   */
  htmlMinify?: boolean | MinifyOptions<'html'>

  /**
   * JS文件最小化混淆配置
   * 
   * Javascript Minimization Configuration.
   */
  jsMinify?: boolean | MinifyOptions<'script'>

  /**
   * CSS文件最小化压缩配置
   * 
   * CSS Minimization Compression Configuration.
   */
  cssMinify?: boolean | MinifyOptions<'style'>

  /**
   * 图片文件压缩配置
   * 
   * Image Compression Configuration.
   */
  imageMinify?: boolean | MinifyOptions<'image'>

  /**
   * 构建后是否生成 source map 文件
   * 
   * Whether to generate source map.
   */
  sourcemap?: boolean | 'inline'
}
