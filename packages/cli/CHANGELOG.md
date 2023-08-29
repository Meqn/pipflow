# @pipflow/cli

## 0.9.0

### Minor Changes

- feat: Add server command & Optimize dev/pack/task
- perf: Optimize debug mode

### Patch Changes

- Updated dependencies []:
  - @pipflow/utils@0.9.0

## 0.8.2

### Patch Changes

- feat: Change the display order of CLI

## 0.8.1

### Patch Changes

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
