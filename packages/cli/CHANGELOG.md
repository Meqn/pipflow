# @pipflow/cli

## 1.1.2

### Patch Changes 🌟

- refactor: Imports `pathe` modules from `@pipflow/utils` ([0483d81](https://github.com/Meqn/pipflow/commit/0483d81a1d9ad9869d7ff8472ff4968034861173))

- Updated dependencies []:
  - @pipflow/utils@1.1.2

## 1.1.1

### Minor Changes 🚀

- refactor: Rename .eslintrc.js to eslint.config.js for consistency ([e81f734](https://github.com/Meqn/pipflow/commit/e81f734c6c262f4d7a21fe858724b0ddc9d7208f))
- perf: Add option of specify configuration file path for Task-CMD ([49845cc](https://github.com/Meqn/pipflow/commit/49845cc590fa1f1adc8962d7907d7c18b29f760d))

- Updated dependencies []:
  - @pipflow/utils@1.1.1

## 1.1.0

### Minor Changes 🚀

- feat: Cache variables for improved debugging ([2fabc57](https://github.com/Meqn/pipflow/commit/2fabc57cd7a474436ed2eca4e0a69d5879e5f281))

### Patch Changes

- Updated dependencies []:
  - @pipflow/utils@1.1.0

## 1.0.6

### Patch Changes 🌟

- refactor: Replace execa with execWithSign for better SIGINT handling ([d9acb96](https://github.com/Meqn/pipflow/commit/d9acb961beb881874f6e3af233f3be8edfb593e9))
- fix: The `CWD` path processing issue ([268d518](https://github.com/Meqn/pipflow/commit/268d518a2ce227c6407367aab5c46636aa62f376))

- Updated dependencies []:
  - @pipflow/utils@1.0.4

## 1.0.5

### Patch Changes 🌟

- fix: 修复不同平台下 path 模块路径处理问题 ([15e3ff3](https://github.com/Meqn/pipflow/commit/15e3ff342dfc97b1da81ae179d9862de88026667))
- fix: 处理 server 命令进程 window 下正常中断 ([a68a5cd](https://github.com/Meqn/pipflow/commit/a68a5cd3b7824faa8889981238eabd83efc3cac0))
- fix: 在调试模式下正确解析环境变量 ([2da090e](https://github.com/Meqn/pipflow/commit/2da090e13c50263ff25584576b2e2b8ed0c71dc3))

## 1.0.4

### Patch Changes 🌟

- Updated dependencies []:
  - @pipflow/utils@1.0.3

## 1.0.3

### Patch Changes 🌟

- build: Add browser-sync deps ([ba2c78b](https://github.com/Meqn/pipflow/commit/ba2c78bc1f3d40cefb412329dd8e26a2ed4bc3bd))

## 1.0.2

### Patch Changes 🌟

- perf: Optimize import modules ([cef6812](https://github.com/Meqn/pipflow/commit/cef68122ede3c2e014254b77516755c1a21abc55))
- perf: Remove waiting loading ([56be7bd](https://github.com/Meqn/pipflow/commit/56be7bd95f11082e30ce66f8a81c18dac1aa8c47))

- Updated dependencies []:
  - @pipflow/utils@1.0.2

## 1.0.1

### Patch Changes 🌟

- perf: Add waiting loading for require modules ([a5c6c7c](https://github.com/Meqn/pipflow/commit/a5c6c7c4cc6acfbbf6fec0fd9c70085e7e470ed0))

- Updated dependencies []:
  - @pipflow/utils@1.0.1

## 1.0.0

### Major Changes 🎉

- perf: Change the preset template directory ([45aff6f](https://github.com/Meqn/pipflow/commit/45aff6f43c0225ab598701251e6146622441eb69))
- perf: Update npm package infomation for info-cli ([e9d7e2f](https://github.com/Meqn/pipflow/commit/e9d7e2fc4e00488f1acf618e0a0cdaffc53dbcf4)

### Patch Changes 🌟

- Updated dependencies []:
  - @pipflow/utils@1.0.0

## 0.10.5

### Patch Changes 🌟

- perf: Optimize server-command args ([1225166](https://github.com/Meqn/pipflow/commit/12251661c4c70dd46d400451d228159f9b4b6668))
- perf: Improve template.json configuration ([97f0487](https://github.com/Meqn/pipflow/commit/97f048790dc3cca6723c44209e99b1a5286431a0))
- Updated dependencies []:
  - @pipflow/utils@0.11.2

## 0.10.4

### Patch Changes 🌟

- Updated dependencies []:
  - @pipflow/utils@0.11.1

## 0.10.3

### Patch Changes 🌟

- perf: Increase local template caching time limit ([e26bedb](https://github.com/Meqn/pipflow/commit/e26bedbb7895ce6b79184866b67142658369a069))

- Updated dependencies []:
  - @pipflow/utils@0.11.0

## 0.10.2

### Patch Changes 🌟

- Updated dependencies []:
  - @pipflow/utils@0.10.1

## 0.10.1

### Patch Changes 🌟

- fix: Update on changes to template project ([84cb103](https://github.com/Meqn/pipflow/commit/84cb1033096aad7a4ce63d9071ab4b7df4a886f1))

## 0.10.0

### Minor Changes 🚀

- feat: Optimize server command (not base-on gulp)
- fix: Update repository url
- fix: Set task's name to optional
- perf: Optimize server command arguments
- perf: Optimize dev/task command arguments
- perf: Remove `pack-cli` (use `task archive`)

### Patch Changes 🌟

- Updated dependencies []:
  - @pipflow/utils@0.10.0

## 0.9.0

### Minor Changes 🚀

- feat: Add server command & Optimize dev/pack/task
- perf: Optimize debug mode

### Patch Changes 🌟

- Updated dependencies []:
  - @pipflow/utils@0.9.0

## 0.8.2

### Patch Changes 🌟

- feat: Change the display order of CLI

## 0.8.1

### Patch Changes 🌟

- Migration from stand-alone(pipflow-cli) to internal(pipflow/cli)

## [0.5.0](https://github.com/Meqn/pipflow-cli/compare/v0.4.0...v0.5.0) (2023-08-17)

### 🚀 Features

- Add eslint preset ([07713d4](https://github.com/Meqn/pipflow-cli/commit/07713d4d47b16956724737b1e0f191cdf3cf298c))
- Upgrade @pipflow/utils to 0.8 ([203386c](https://github.com/Meqn/pipflow-cli/commit/203386c7cf1f5eedd0d99a049044466bb0574efb))

### 🌟 Performance

- Move JSON file read&write to Utils ([5e90d8f](https://github.com/Meqn/pipflow-cli/commit/5e90d8f7c3ef5524a66103f5b8833c6fe2364184))
- Optimize generateTemplate & stringify ([dc1ce16](https://github.com/Meqn/pipflow-cli/commit/dc1ce1687b7694ef1b2185bb89b5afb0f3687fbf))
- Optimize pipflow.config content writing ([23fa2dc](https://github.com/Meqn/pipflow-cli/commit/23fa2dc42ab96f3d6ae48137d8e98d9bd21e7647))

## [0.4.0](https://github.com/Meqn/pipflow-cli/compare/v0.3.1...v0.4.0) (2023-08-11)

### 🚀 Features

- add Compress-Image preset ([a45b314](https://github.com/Meqn/pipflow-cli/commit/a45b3149a34d6306b464bbe91a253bbe92d98960))
- uitls upgrade 0.6.0 ([259aea9](https://github.com/Meqn/pipflow-cli/commit/259aea9a66f2c849645f94b15a975a57a6808a13))

### 🌟 Performance

- Add pack-CLI argument's description ([5e13249](https://github.com/Meqn/pipflow-cli/commit/5e132499857ef5ea79ba4e7b766cb97b94414d4f))

## [0.3.1](https://github.com/Meqn/pipflow-cli/compare/v0.3.0...v0.3.1) (2023-08-07)

### 🐛 Bug Fixes

- Cache version error ([370d93e](https://github.com/Meqn/pipflow-cli/commit/370d93e2fed11486c36adf69428edf9f367ae16e))
- Detect and prompt the upgrade version ([975813b](https://github.com/Meqn/pipflow-cli/commit/975813bed8385f7b2bcbc02ea8d035a3b441db82))

### 🌟 Performance

- Optimize command options&description ([281f620](https://github.com/Meqn/pipflow-cli/commit/281f6201ca301a184ecdf7a729dc6baaf50c8db4))
- Optimize read & write template cache ([5603e51](https://github.com/Meqn/pipflow-cli/commit/5603e51a28a35798d7f4b6b6de615d7281e36f5d))

## [0.3.0](https://github.com/Meqn/pipflow-cli/compare/v0.2.1...v0.3.0) (2023-08-06)

### 🚀 Features

- add pack command (zip archive) ([eb8f9b3](https://github.com/Meqn/pipflow-cli/commit/eb8f9b394873509d6a011162b8388d9ef8421962))
- Support for fetch preset from github & gitee ([8ea10bd](https://github.com/Meqn/pipflow-cli/commit/8ea10bde59d2c29f2617e7e16ef5a420c97724bb))

### 🐛 Bug Fixes

- Useless-params Error in CLI ([203fd9a](https://github.com/Meqn/pipflow-cli/commit/203fd9a4ad901936929a9468e6d18518e04d69fd))

### 🌟 Performance

- import babel.config on demand ([ccfa489](https://github.com/Meqn/pipflow-cli/commit/ccfa489ae305dd46de7df57dba8ca71a923caac6))
- Optimizing CLI-options&add git-option ([051e1e3](https://github.com/Meqn/pipflow-cli/commit/051e1e39f485d983979a11e1bd6fd5d7aea21dea))

## [0.2.1](https://github.com/Meqn/pipflow-cli/compare/v0.2.0...v0.2.1) (2023-08-01)

### 🐛 Bug Fixes

- remove .vitepress/cache ([34b71a5](https://github.com/Meqn/pipflow-cli/commit/34b71a5eec54cf7d649da65be9704fdfa58963dd))

### 🚚 Miscellaneous

- ignore vitepress/cache ([aee6288](https://github.com/Meqn/pipflow-cli/commit/aee62889978207f8ab0d992f65524f1a1dd71ede))

## [0.2.0](https://github.com/Meqn/pipflow-cli/compare/v0.1.1...v0.2.0) (2023-08-01)

### 🚀 Features

- add documents(vitepress) ([1c48ca9](https://github.com/Meqn/pipflow-cli/commit/1c48ca973e144f9758ab6a232d47080a1f844e76))
- Save current command ([6c290e4](https://github.com/Meqn/pipflow-cli/commit/6c290e40f41bfe6d1ceacf21d4f2671d634d251c))

### 🐛 Bug Fixes

- CLI adds --config options ([bacc411](https://github.com/Meqn/pipflow-cli/commit/bacc4111558611d9579515444e78986fbd42c74f))

### 🌟 Performance

- info-command add the display npmPackages ([491f165](https://github.com/Meqn/pipflow-cli/commit/491f1654cd1e5c7d6091cd2ad599bed9c781e2c5))
- update CLI-description ([4e7227c](https://github.com/Meqn/pipflow-cli/commit/4e7227c6c7a36460550599a59822f2e490e7842f))

## [0.1.1](https://github.com/Meqn/pipflow-cli/compare/v0.1.0...v0.1.1) (2023-07-27)

### 🐛 Bug Fixes

- Changing file templates such as babel.config ([067fc86](https://github.com/Meqn/pipflow-cli/commit/067fc86ecbe7f958de3788f4aeaf1171ecadbd07))

## [0.1.0](https://github.com/Meqn/pipflow-cli/compare/v0.0.2...v0.1.0) (2023-07-27)

### 🚀 Features

- add tasks/preview commands ([7daacd2](https://github.com/Meqn/pipflow-cli/commit/7daacd283d03e9c5646e5217a4601fac5c34461f))

### 🚚 Miscellaneous

- change ppw-cli to `pw-cli` ([4d836fb](https://github.com/Meqn/pipflow-cli/commit/4d836fb2ed6a9e21f92133e906062e58b10c48fc))

## [0.0.2](https://github.com/Meqn/pipflow-cli/compare/v0.0.1...v0.0.2) (2023-07-26)

### 🚀 Features

- updating create/serve/build CLI help Infos ([70730f1](https://github.com/Meqn/pipflow-cli/commit/70730f15b52b22a12bbed42c0f7fbfd4e020acbf))
