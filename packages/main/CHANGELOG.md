# pipflow

## 0.8.1

### Patch Changes

- types: Optimize CssPreprocessorOptions type ([c07b4a5](https://github.com/Meqn/pipflow/commit/c07b4a5098317a939173722c1e55c1510fcbe763))

- Updated dependencies []:
  - @pipflow/core@0.12.0
  - @pipflow/utils@0.11.1

## 0.8.0

### Minor Changes

- feat: Added built-in environment variables ([d8658a9](https://github.com/Meqn/pipflow/commit/d8658a9ddcb0f60a0d0e38b5286e9eaf139d127e))
- fix: Task execution sequence error (caused by async function) ([42f91f7](https://github.com/Meqn/pipflow/commit/42f91f7d35651b370971a9c3dd24a40c3afa4e93))
- perf: Optimize env loading and setting ([edf2370](https://github.com/Meqn/pipflow/commit/edf2370825fc3eb04961a959daf1e8614a64db2b))
- types: Add inline to the sourcemap of build configuration ([8992a36](https://github.com/Meqn/pipflow/commit/8992a361ea71fed9e389bcd6dc71b3fba45a8d6f))

### Patch Changes

- Updated dependencies []:
  - @pipflow/core@0.11.0
  - @pipflow/utils@0.11.0

## 0.7.1

### Patch Changes

- perf: Remove the task's module option ([d67fbf8](https://github.com/Meqn/pipflow/commit/d67fbf8bf4b77ce9febacfed6300d2177681e6a7))

- Updated dependencies []:
  - @pipflow/core@0.10.0
  - @pipflow/utils@0.10.1

## 0.7.0

### Minor Changes

- feat: Added custom composite tasks ([ce5a1e9](https://github.com/Meqn/pipflow/commit/ce5a1e9f4e20c1a42947388b89b2fde48a35f72d))
- fix: Fixed Compiler type of user-task ([f785458](https://github.com/Meqn/pipflow/commit/f78545896b6b227471ae1f32b97172ecf257a17a))

### Patch Changes

- Updated dependencies []:
  - @pipflow/core@0.9.3

## 0.6.3

### Patch Changes

- Updated dependencies []:
  - @pipflow/core@0.9.2

## 0.6.2

### Patch Changes

- fix: minify/sourcemap/fileHash only works under the build ([a8374d8](https://github.com/Meqn/pipflow/commit/a8374d83da454c02231a15278c5c94f7f9435291))
- fix: Fix fileHash type error ([8a9e485](https://github.com/Meqn/pipflow/commit/8a9e485aa2f7126d12aa0c1d58f00cb56fbf1d5a))
- perf: Optimize defineConfig type hints ([df09379](https://github.com/Meqn/pipflow/commit/df093797900a05a8ac40ab9dff17d1378820d019))

## 0.6.1

### Patch Changes

- perf: Merge server-task

- Updated dependencies []:
  - @pipflow/utils@0.10.0
  - @pipflow/core@0.9.1

## 0.6.0

### Minor Changes

- feat: Add server-task & CLI-Args
- feat: Support no `pipflow.config` file

### Patch Changes

- Updated dependencies []:
  - @pipflow/core@0.9.0
  - @pipflow/utils@0.9.0

## 0.5.0

### Minor Changes

- Add Image-task

### Patch Changes

- Updated dependencies
  - @pipflow/core@0.8.0
  - @pipflow/utils@0.8.0

## 0.4.2

### Patch Changes

- Updated dependencies
  - @pipflow/utils@0.7.2
  - @pipflow/core@0.7.2

## 0.4.1

### Patch Changes

- Updated dependencies
  - @pipflow/utils@0.7.1
  - @pipflow/core@0.7.1

## 0.4.0

### Minor Changes

- feat: Add Lint-task & Optimize gulp-task callback

### Patch Changes

- Updated dependencies
  - @pipflow/core@0.7.0
  - @pipflow/utils@0.7.0

## 0.3.3

### Patch Changes

- fix: Change types directory

## 0.3.2

### Patch Changes

- fix: update types

## 0.3.1

### Patch Changes

- docs: update README

## 0.3.0

### Minor Changes

- feat: Add defineConfig
- feat: Add pipflow.config types
- feat: Add gulp default-task
- perf: Change NODE_ENV when in build

### Patch Changes

- Updated dependencies
  - @pipflow/core@0.6.0
  - @pipflow/utils@0.6.0

## 0.2.0

### Minor Changes

- built-in archiveTask & support CLI-options

### Patch Changes

- Updated dependencies
  - @pipflow/core@0.5.1
  - @pipflow/utils@0.5.1

## 0.1.3

### Patch Changes

- fix: Reading local ENV-vars file
- Updated dependencies
  - @pipflow/utils@0.5.0
  - @pipflow/core@0.5.0

## 0.1.2

### Patch Changes

- docs: Update README
- Updated dependencies
  - @pipflow/utils@0.4.1
  - @pipflow/core@0.4.1

## 0.1.1

### Patch Changes

- perf: Update CLI-server params(dir->base)

## 0.1.0

### Minor Changes

- perf: 优化 preview 服务&移除 archive 任务;

### Patch Changes

- Updated dependencies
  - @pipflow/core@0.4.0
  - @pipflow/utils@0.4.0

## 0.0.5

### Patch Changes

- Updated dependencies
  - @pipflow/utils@0.3.1
  - @pipflow/core@0.3.1

## 0.0.4

### Patch Changes

- feat: Merge common-packages into utils;
- fix: Uncheck the gulp-rev merge option;
- Updated dependencies
  - @pipflow/utils@0.3.0
  - @pipflow/core@0.3.0

## 0.0.3

### Patch Changes

- perf: remove console.log
- build: Updated dependencies
  - @pipflow/utils@0.2.1
  - @pipflow/core@0.2.1

## 0.0.2

### Patch Changes

- Updated dependencies
  - @pipflow/utils@0.2.0

## 0.0.1

### Patch Changes

- update
- Updated dependencies
  - @pipflow/utils@0.1.1
  - @pipflow/core@0.1.1
