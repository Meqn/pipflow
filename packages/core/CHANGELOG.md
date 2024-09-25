# @pipflow/core

## 1.2.3

### Patch Changes 🌟

- refactor: Rewrite the Batch Replacement plugin ([f866bc6](https://github.com/Meqn/pipflow/commit/f866bc684bb6eae23290eefcc31b0dd698db404b))
- chore: Update Sass dependency version ([8a5be04](https://github.com/Meqn/pipflow/commit/8a5be0468fff06d375db5b8ddf13dc2f6277f770))

## 1.2.2

### Patch Changes 🌟

- chore: Upgrade PostCSS-related deps ([6d72cfa](https://github.com/Meqn/pipflow/commit/6d72cfa066d81a53a303a64b51500964d1e604d6))
- refactor: Update PostCSS plugin option handling for improved modularity ([b05d148](https://github.com/Meqn/pipflow/commit/b05d148906bac716a5226875e11d796a0890aa29))
- perf: Update task option handling for improved modularity ([1eed1eb](https://github.com/Meqn/pipflow/commit/1eed1eb4b02e27a52b25581de6917527554bfc66))

- Updated dependencies []:
  - @pipflow/utils@1.1.1

## 1.2.1

### Patch Changes 🌟

- refactor: Update 'gulp-eslint' to 'gulp-eslint-new' for improved linting ([f4a759b](https://github.com/Meqn/pipflow/commit/f4a759b8bb10e4016e80010690f3f003dbaf1595))
- refactor: Remove unnecessary 'name' field from task options ([ab5f6a1](https://github.com/Meqn/pipflow/commit/ab5f6a19a60cf71f617c16989e794e1c02b4cbba))
- refactor: Change alias replacement processing timing ([1cc5da4](https://github.com/Meqn/pipflow/commit/1cc5da4a42fef98bfa0c4366168c81980e9f2571))
- docs: Update README ([b75f6e7](https://github.com/Meqn/pipflow/commit/b75f6e72701782efa604e41a0128b7b7f1f85f91))

## 1.2.0

### Minor Changes 🚀

- feat: Add JSDOC for each task method ([78129ab](https://github.com/Meqn/pipflow/commit/78129ab318a35bbc11ebe4704bd7809fa6555405))
- perf: Replace direct requires with gulp plugins for consistency ([e1b445e](https://github.com/Meqn/pipflow/commit/e1b445ec5c8076c60ffe50a883794ce0334aede9))
- refactor: Add error handling for image minification ([49c2930](https://github.com/Meqn/pipflow/commit/49c2930d8c67278a7220a254e532f186c1612e70))
- test: Replace gulp with direct require ([38b9268](https://github.com/Meqn/pipflow/commit/38b926844af47646fb91566edf6f65fcea8745d8))

### Patch Changes

- Updated dependencies []:
  - @pipflow/utils@1.1.0

## 1.1.4

### Patch Changes 🌟

- refactor: Replace gulp with direct require ([bd82fe6](https://github.com/Meqn/pipflow/commit/bd82fe612fa47a8d229f2d217f66e0cfd03888de))

- Updated dependencies []:
  - @pipflow/utils@1.0.4

## 1.1.3

### Patch Changes 🌟

- perf: 暴露 browserSync 实例以改进开发工具集成 ([fba3747](https://github.com/Meqn/pipflow/commit/fba37476c83b8b3af720ad21f284a95343ca3a4e))

## 1.1.2

### Patch Changes 🌟

- Updated dependencies []:
  - @pipflow/utils@1.0.3

## 1.1.1

### Patch Changes 🌟

- perf: Optimize import modules ([8d26d57](https://github.com/Meqn/pipflow/commit/8d26d57c43e0a5e1110e2053a79a8387b30c3671))

- Updated dependencies []:
  - @pipflow/utils@1.0.2

## 1.1.0

### Minor Changes 🚀

- feat: Replace resource hash files in style ([072679f](https://github.com/Meqn/pipflow/commit/072679fca1a91d4a56ccc2a9fd3832304c87d94c))
- fix: Generate both source and hash files ([9951e43](https://github.com/Meqn/pipflow/commit/9951e438464fb9995dc3099833333199ad16f8d9))
- fix: Fix getting archive filenames ([7103045](https://github.com/Meqn/pipflow/commit/7103045b1def14af9d02088c43381f4e7f8b24eb))
- perf: Extract `readManifest()` & optimize `transformHash()` ([98f2b48](https://github.com/Meqn/pipflow/commit/98f2b481efa42719fb629d561dd9b53b6e32c005))
- perf: Update html-task styles ([9b0c006](https://github.com/Meqn/pipflow/commit/9b0c00673f2234f68f06115c2418ad75ec6d18ed))
- test: Add transformHash & readManifest test cases ([b8806ad](https://github.com/Meqn/pipflow/commit/b8806ad9b0461e882b61e32d28839fb79cd38cf3))
- test: Update test cases ([eb54f20](https://github.com/Meqn/pipflow/commit/eb54f20e308563f4f0390ecdb93b32092ba2fb5e))

### Patch Changes 🌟

- Updated dependencies []:
  - @pipflow/utils@1.0.1

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
