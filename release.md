
## 语义化版本
严格遵循 [semver](https://semver.org/) 规范。

```
2.0.0 , 2.0.0-rc.2 , 2.0.0-rc.1 , 1.0.0 , 1.0.0-beta
```

- `Major` - 主版本号：当你做了不兼容的 API 修改
- `Minor` - 次版本号：当你做了向下兼容的功能性新增
- `Patch` - 修订号：当你做了向下兼容的问题修正
先行版本号及版本编译信息可以加到“主版本号.次版本号.修订号”的后面，作为延伸。

> **Tag**
> - `alpha` - alpha 版本, 内部测试版，一般不向外部发布;
> - `beta` - beta 版本, 测试版，该版本会一直加入新的功能;
> - `rc` - rc 版本 (Release Candidate) 发行候选版本。不再加新功能,着重于除错。  
>
> 优先层级:  
> 例如：1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-alpha.beta < 1.0.0-beta < 1.0.0-beta.2 < 1.0.0-beta.11 < 1.0.0-rc.1 < 1.0.0。


## refs
- [pnpm构建monorepo工程](https://github.com/astonishqft/pnpm-monorepo-demo)
- [webpack5 的多页脚手架](https://github.com/kailong321200875/webpack-multi-page-cli)
- [pnpm-workspaces-example & changeset](https://github.com/DavidWells/pnpm-workspaces-example/)


