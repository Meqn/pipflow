# pipflow

## 1.1.1

### Patch Changes 🌟

- Updated dependencies []:
  - @pipflow/core@1.2.1

## 1.1.0

### Minor Changes 🚀

- feat: Add console feedback for task execution ([b9921ab](https://github.com/Meqn/pipflow/commit/b9921abbd0e554cc00ebeffb464770f5e55793d7))
- perf: Remove unused `filename` property from `TaskOptions` ([9cafb8e](https://github.com/Meqn/pipflow/commit/9cafb8e5f45b265a442aef5a0cab802ba870917d))

### Patch Changes

- Updated dependencies []:
  - @pipflow/cli@1.1.0
  - @pipflow/core@1.2.0
  - @pipflow/utils@1.1.0

## 1.0.6

### Patch Changes 🌟

- refactor: Refactor server task code to simplify logic ([412a7f7](https://github.com/Meqn/pipflow/commit/412a7f7b04159433e10b31b0ad9185fd988d1ee1))
- fix: Fix could not print gulp task list ([c80ba38](https://github.com/Meqn/pipflow/commit/c80ba3881a89edf211ddec281f64e2b7c1b55cde))

- Updated dependencies []:
  - @pipflow/cli@1.0.6
  - @pipflow/core@1.1.4
  - @pipflow/utils@1.0.4

## 1.0.5

### Patch Changes 🌟

- fix: 添加 SIGINT 信号（Ctrl+C）处理(进程正确终止) ([f0631db](https://github.com/Meqn/pipflow/commit/f0631db9b155c9ee9cd15f33fed6757cd6b95aa0))

- Updated dependencies []:
  - @pipflow/cli@1.0.5
  - @pipflow/core@1.1.3

## 1.0.4

### Patch Changes 🌟

- Updated dependencies []:
  - @pipflow/utils@1.0.3
  - @pipflow/cli@1.0.4
  - @pipflow/core@1.1.2

## 1.0.3

### Patch Changes 🌟

- Updated dependencies []:
  - @pipflow/cli@1.0.3

## 1.0.2

### Patch Changes 🌟

- perf: Optimize import modules ([806825e](https://github.com/Meqn/pipflow/commit/806825eb82086b85cf29e55df4ab5b397a8b8685))

- Updated dependencies []:
  - @pipflow/utils@1.0.2
  - @pipflow/core@1.1.1
  - @pipflow/cli@1.0.2

## 1.0.1

### Patch Changes 🌟

- fix: Filename matching problem for archive-task ([f9d0072](https://github.com/Meqn/pipflow/commit/f9d0072791729855a655b928b3bf2286ce84a73b))

- Updated dependencies []:
  - @pipflow/core@1.1.0
  - @pipflow/cli@1.0.1
  - @pipflow/utils@1.0.1

## 1.0.0

### Major Changes 🎉

- feat: Built-in pipflow command ([ebeabe5](https://github.com/Meqn/pipflow/commit/ebeabe56c2aec9a7d87186a427e9366f7c7979e6))
- perf: Optimize archive-task parameters ([be9b05b](https://github.com/Meqn/pipflow/commit/be9b05bc166c72b82126b823a9125d780dcad8e6))
- types: Add assetsInlineLimit & Remove useless props ([af091ec](https://github.com/Meqn/pipflow/commit/af091ec50319eba1e339df168f7691b06aa1709a)
- test: Update unit test cases ([75f186b](https://github.com/Meqn/pipflow/commit/75f186b76e40c13704d87c4e1159d8069ed0dc5a))

### Patch Changes 🌟

- Updated dependencies []:
  - @pipflow/cli@1.0.0
  - @pipflow/core@1.0.0
  - @pipflow/utils@1.0.0

## 0.8.2

### Patch Changes 🌟

- perf: Standardize createServer-function name ([30bad60](https://github.com/Meqn/pipflow/commit/30bad607d21d4c0db623b1a7dc871d928d8d8c7d))
- Updated dependencies []:
  - @pipflow/core@0.13.0
  - @pipflow/utils@0.11.2

## 0.8.1

### Patch Changes 🌟

- types: Optimize CssPreprocessorOptions type ([c07b4a5](https://github.com/Meqn/pipflow/commit/c07b4a5098317a939173722c1e55c1510fcbe763))

- Updated dependencies []:
  - @pipflow/core@0.12.0
  - @pipflow/utils@0.11.1

## 0.8.0

### Minor Changes 🚀

- feat: Added built-in environment variables ([d8658a9](https://github.com/Meqn/pipflow/commit/d8658a9ddcb0f60a0d0e38b5286e9eaf139d127e))
- fix: Task execution sequence error (caused by async function) ([42f91f7](https://github.com/Meqn/pipflow/commit/42f91f7d35651b370971a9c3dd24a40c3afa4e93))
- perf: Optimize env loading and setting ([edf2370](https://github.com/Meqn/pipflow/commit/edf2370825fc3eb04961a959daf1e8614a64db2b))
- types: Add inline to the sourcemap of build configuration ([8992a36](https://github.com/Meqn/pipflow/commit/8992a361ea71fed9e389bcd6dc71b3fba45a8d6f))

### Patch Changes 🌟

- Updated dependencies []:
  - @pipflow/core@0.11.0
  - @pipflow/utils@0.11.0

## 0.7.1

### Patch Changes 🌟

- perf: Remove the task's module option ([d67fbf8](https://github.com/Meqn/pipflow/commit/d67fbf8bf4b77ce9febacfed6300d2177681e6a7))

- Updated dependencies []:
  - @pipflow/core@0.10.0
  - @pipflow/utils@0.10.1

## 0.7.0

### Minor Changes 🚀

- feat: Added custom composite tasks ([ce5a1e9](https://github.com/Meqn/pipflow/commit/ce5a1e9f4e20c1a42947388b89b2fde48a35f72d))
- fix: Fixed Compiler type of user-task ([f785458](https://github.com/Meqn/pipflow/commit/f78545896b6b227471ae1f32b97172ecf257a17a))

### Patch Changes 🌟

- Updated dependencies []:
  - @pipflow/core@0.9.3

## 0.6.3

### Patch Changes 🌟

- Updated dependencies []:
  - @pipflow/core@0.9.2

## 0.6.2

### Patch Changes 🌟

- fix: minify/sourcemap/fileHash only works under the build ([a8374d8](https://github.com/Meqn/pipflow/commit/a8374d83da454c02231a15278c5c94f7f9435291))
- fix: Fix fileHash type error ([8a9e485](https://github.com/Meqn/pipflow/commit/8a9e485aa2f7126d12aa0c1d58f00cb56fbf1d5a))
- perf: Optimize defineConfig type hints ([df09379](https://github.com/Meqn/pipflow/commit/df093797900a05a8ac40ab9dff17d1378820d019))

## 0.6.1

### Patch Changes 🌟

- perf: Merge server-task

- Updated dependencies []:
  - @pipflow/utils@0.10.0
  - @pipflow/core@0.9.1

## 0.6.0

### Minor Changes 🚀

- feat: Add server-task & CLI-Args
- feat: Support no `pipflow.config` file

### Patch Changes 🌟

- Updated dependencies []:
  - @pipflow/core@0.9.0
  - @pipflow/utils@0.9.0

## 0.5.0

### Minor Changes 🚀

- Add Image-task

### Patch Changes 🌟

- Updated dependencies
  - @pipflow/core@0.8.0
  - @pipflow/utils@0.8.0

## 0.4.2

### Patch Changes 🌟

- Updated dependencies
  - @pipflow/utils@0.7.2
  - @pipflow/core@0.7.2

## 0.4.1

### Patch Changes 🌟

- Updated dependencies
  - @pipflow/utils@0.7.1
  - @pipflow/core@0.7.1

## 0.4.0

### Minor Changes 🚀

- feat: Add Lint-task & Optimize gulp-task callback

### Patch Changes 🌟

- Updated dependencies
  - @pipflow/core@0.7.0
  - @pipflow/utils@0.7.0

## 0.3.3

### Patch Changes 🌟

- fix: Change types directory

## 0.3.2

### Patch Changes 🌟

- fix: update types

## 0.3.1

### Patch Changes 🌟

- docs: update README

## 0.3.0

### Minor Changes 🚀

- feat: Add defineConfig
- feat: Add pipflow.config types
- feat: Add gulp default-task
- perf: Change NODE_ENV when in build

### Patch Changes 🌟

- Updated dependencies
  - @pipflow/core@0.6.0
  - @pipflow/utils@0.6.0

## 0.2.0

### Minor Changes 🚀

- built-in archiveTask & support CLI-options

### Patch Changes 🌟

- Updated dependencies
  - @pipflow/core@0.5.1
  - @pipflow/utils@0.5.1

## 0.1.3

### Patch Changes 🌟

- fix: Reading local ENV-vars file
- Updated dependencies
  - @pipflow/utils@0.5.0
  - @pipflow/core@0.5.0

## 0.1.2

### Patch Changes 🌟

- docs: Update README
- Updated dependencies
  - @pipflow/utils@0.4.1
  - @pipflow/core@0.4.1

## 0.1.1

### Patch Changes 🌟

- perf: Update CLI-server params(dir->base)

## 0.1.0

### Minor Changes 🚀

- perf: 优化 preview 服务&移除 archive 任务;

### Patch Changes 🌟

- Updated dependencies
  - @pipflow/core@0.4.0
  - @pipflow/utils@0.4.0

## 0.0.5

### Patch Changes 🌟

- Updated dependencies
  - @pipflow/utils@0.3.1
  - @pipflow/core@0.3.1

## 0.0.4

### Patch Changes 🌟

- feat: Merge common-packages into utils;
- fix: Uncheck the gulp-rev merge option;
- Updated dependencies
  - @pipflow/utils@0.3.0
  - @pipflow/core@0.3.0

## 0.0.3

### Patch Changes 🌟

- perf: remove console.log
- build: Updated dependencies
  - @pipflow/utils@0.2.1
  - @pipflow/core@0.2.1

## 0.0.2

### Patch Changes 🌟

- Updated dependencies
  - @pipflow/utils@0.2.0

## 0.0.1

### Patch Changes 🌟

- update
- Updated dependencies
  - @pipflow/utils@0.1.1
  - @pipflow/core@0.1.1
