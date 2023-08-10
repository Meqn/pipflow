/// <reference types="node" />

import type {
  ConfigEnv,
  UserConfig
} from './config'

// export declare type UserConfigExport = UserConfig | Promise<UserConfig> | UserConfigFn
// export declare type UserConfigFn = (env: ConfigEnv) => UserConfig | Promise<UserConfig>

export declare type UserConfigExport = UserConfig | ((env: ConfigEnv) => UserConfig)
export declare function defineConfig(config: UserConfigExport): UserConfigExport
export {
  UserConfig
}
