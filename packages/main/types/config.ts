import type { Options as ServerOptions } from 'browser-sync'
import { TaskOptions, TaskType, CompilerType, MinifyOptions } from './task'

export interface ConfigEnv {
  mode: string
  command: 'build' | 'serve'
}

export interface UserConfig {
  /**
   * 显式地在创建的 Vinyl 对象上设置 base 属性
   * 
   * Explicitly set the base property on created Vinyl objects. 
   * 
   * @default './src'
   */
  base?: string

  /**
   * 静态资源服务的文件夹
   * 
   * Folders for static resource services.
   * 
   * @default 'public'
   */
  publicDir?: string

  /**
   * 环境变量文件目录
   * 
   * Environment variable file directory.
   */
  envDir?: string

  /**
   * 字符串别名替换
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
   * 文件哈希和版本控制
   * 
   * File hashing and version control.
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
   * 是否生成 source map 文件
   * 
   * Whether to generate source map.
   */
  sourcemap?: boolean
}
