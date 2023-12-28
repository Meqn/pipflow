# @pipflow/core

## 1.0.0

### Major Changes 🎉

- feat: Add inline image /files (base64) ([2d5d5f9](https://github.com/Meqn/pipflow/commit/2d5d5f9ad5e6bf265ffd4b5f16bc78d332960228))
- fix: Add empty file's path judgment ([78d4777](https://github.com/Meqn/pipflow/commit/78d4777f8672d4416e33ecabdf0408770a32e191))
- perf: Optimize archive-task parameters ([36c3d84](https://github.com/Meqn/pipflow/commit/36c3d8420f6a945dc8b064a7a577c8d0374afaad)
- test: Update unit test cases ([55a2615](https://github.com/Meqn/pipflow/commit/55a26157d280208998fffa2c4f50b942ddf4b2b5))
- test: Add unit test cases ([18b172d](https://github.com/Meqn/pipflow/commit/18b172dd73000ea89c4338d3e28a2d540f644fe1))

### Patch Changes 🌟

- Updated dependencies []:
  - @pipflow/utils@1.0.0

## 0.13.0

### Minor Changes 🚀

- feat: Add findUrlFromNpm() ([3f94c98](https://github.com/Meqn/pipflow/commit/3f94c98f2a5bf919a090e2ac8a729ca0f8a618b7))
- feat: User-task add input configuration item. ([4648990](https://github.com/Meqn/pipflow/commit/4648990a4d763e56a2a5bdcf598a3cbdb9792f34))
- fix: Remove duplicate require ([73d8a19](https://github.com/Meqn/pipflow/commit/73d8a195602c1be9acd485bf8dabce91f88b1075))
- perf: Add invalid parameter judgment ([2ce1640](https://github.com/Meqn/pipflow/commit/2ce1640c6dec8a5abed51ec0dd2c4c24f3eb6c74))
- perf: Standardize createServer-function name ([9eac55e](https://github.com/Meqn/pipflow/commit/9eac55e053fe81bc50f16dedb535d586c5268613))
- perf: Optimize package require order ([363b588](https://github.com/Meqn/pipflow/commit/363b588593e6bb0e4053113a8c4cb2013e6eada4))
- perf: Extract default configuration & Sass default configuration ([4ac1e7a](https://github.com/Meqn/pipflow/commit/4ac1e7a3e6cabd0f5b9b7385cd932dfbc2d7b495))
- test: Add test-cases(comm,utils) ([a4fec38](https://github.com/Meqn/pipflow/commit/a4fec38cd51cf678d24693f17c8aacf432e6c613))

### Patch Changes 🌟

- Updated dependencies []:
  - @pipflow/utils@0.11.2

## 0.12.0

### Minor Changes 🚀

- feat: CSS-Preprocessor adds additionalData configuration ([be84078](https://github.com/Meqn/pipflow/commit/be84078c26df95f1f1d4de48163cf61f0b0d737c))
- perf: Optimize naming issues ([dd613f9](https://github.com/Meqn/pipflow/commit/dd613f94505a033bec8e3627756a0439b4e12308))

### Patch Changes 🌟

- Updated dependencies []:
  - @pipflow/utils@0.11.1

## 0.11.0

### Minor Changes 🚀

- feat: Sourcemap supports inline ([08fe082](https://github.com/Meqn/pipflow/commit/08fe082aaa71931ecbd00cd104ac9853e9adac3f))
- feat: Add gulp-concat plugins ([a049b92](https://github.com/Meqn/pipflow/commit/a049b926958f69c9038aa6ab7f1a4801048cad8b))
- feat: Style-task input supports object structures ([95b2213](https://github.com/Meqn/pipflow/commit/95b221378f7801298048590eaad25a03df6ea5af))
- fix: Fixed sourcemap and hash file generation issues ([9d5942b](https://github.com/Meqn/pipflow/commit/9d5942bad904ea492336f966234e725800b28a6e))
- fix: Optimize & fix env loading and setting issues ([eb28be6](https://github.com/Meqn/pipflow/commit/eb28be6c239d8c6f6e5f82965c23f6aa511a4101))
- fix: Fixed `getCommonPath()` errors ([af5341b](https://github.com/Meqn/pipflow/commit/af5341b190e6e67e619c1919b917be612bf383be))
- fix: Fixed output path and base mismatch when merging files ([dade694](https://github.com/Meqn/pipflow/commit/dade694d46496253063394233f6ebd747672b4d9))
- perf: Optimize js file merge processing ([9c23c72](https://github.com/Meqn/pipflow/commit/9c23c72de4b418c40afcab8dcdfcb04679411379))
- perf: Optimize the task's done function ([823a3ee](https://github.com/Meqn/pipflow/commit/823a3eeb9e4f887a8e3dcaaad6cf7bab521e789f))
- build: Remove gulp-env-loader dep ([7591efb](https://github.com/Meqn/pipflow/commit/7591efb74598f4afcc5653dcb757b2636525d955))
- build: Add vinyl & gulp-if deps ([c28b45d](https://github.com/Meqn/pipflow/commit/c28b45d60370d3d7be42bd2a28f1bd839e198a09))

### Patch Changes 🌟

- Updated dependencies []:
  - @pipflow/utils@0.11.0

## 0.10.0

### Minor Changes 🚀

- perf: Remove autoprefixer dependence ([98a503a](https://github.com/Meqn/pipflow/commit/98a503a646d8333d2ce4ab61a84765e14c96e918))
- perf: Optimize babel configuration & removing dependencies ([c0ed8e0](https://github.com/Meqn/pipflow/commit/c0ed8e03354937078a949781f8b82f64de0d31bc))

### Patch Changes 🌟

- Updated dependencies []:
  - @pipflow/utils@0.10.1

## 0.9.3

### Patch Changes 🌟

- fix: Prevent user-task from reporting errors with no return ([6742eb1](https://github.com/Meqn/pipflow/commit/6742eb150b0b7bb64df7e04e060891b9d4f7a162))

## 0.9.2

### Patch Changes 🌟

- fix: Modify postcss to support configuration merging ([8a0f31f](https://github.com/Meqn/pipflow/commit/8a0f31f1d8248cd9fafd436f3f701a92643c4b01))

## 0.9.1

### Patch Changes 🌟

- perf: Import browserSync from utils

- Updated dependencies []:
  - @pipflow/utils@0.10.0

## 0.9.0

### Minor Changes 🚀

- feat: Server add no initial configuration
- perf: Server-task add ui-port configuration

### Patch Changes 🌟

- Updated dependencies []:
  - @pipflow/utils@0.9.0

## 0.8.0

### Minor Changes 🚀

- Add Image-task

### Patch Changes 🌟

- Updated dependencies
  - @pipflow/utils@0.8.0

## 0.7.2

### Patch Changes 🌟

- Updated dependencies
  - @pipflow/utils@0.7.2

## 0.7.1

### Patch Changes 🌟

- Updated dependencies
  - @pipflow/utils@0.7.1

## 0.7.0

### Minor Changes 🚀

- feat: Add ESlint-Task
- perf: Optimize archiveTask Exec & scriptTask filter

### Patch Changes 🌟

- Updated dependencies
  - @pipflow/utils@0.7.0

## 0.6.0

### Minor Changes 🚀

- feat: Add minify configuration
- feat: Add Image-Minify
- perf: Optimize Server-Task configration

### Patch Changes 🌟

- Updated dependencies
  - @pipflow/utils@0.6.0

## 0.5.1

### Patch Changes 🌟

- fix: Archive-task filename problem
- Updated dependencies
  - @pipflow/utils@0.5.1

## 0.5.0

### Patch Changes 🌟

- perf: Optimize reading local ENV-vars
- Updated dependencies
  - @pipflow/utils@0.5.0

## 0.4.1

### Patch Changes 🌟

- docs: update keywords
- Updated dependencies
  - @pipflow/utils@0.4.1

## 0.4.0

### Minor Changes 🚀

- feat: userTask params added comm-packages

### Patch Changes 🌟

- Updated dependencies
  - @pipflow/utils@0.4.0

## 0.3.1

### Patch Changes 🌟

- Updated dependencies
  - @pipflow/utils@0.3.1

## 0.3.0

### Minor Changes 🚀

- feat: Merge common-packages into utils;
- fix: Uncheck the gulp-rev merge option;

### Patch Changes 🌟

- Updated dependencies
  - @pipflow/utils@0.3.0

## 0.2.1

### Patch Changes 🌟

- perf: remove useless files
- perf: update process.env.PIPFLOW_MODE

## 0.1.1

### Patch Changes 🌟

- update
