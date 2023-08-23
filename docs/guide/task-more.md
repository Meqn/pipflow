# 其他任务



## ZIP压缩任务 (archive)

```bash
pipflow pack [options]

# example
pipflow pack dist/ dist.zip
# 将 `dist/` 目录打包, 压缩包 `dist.zip`在项目的根目录

pipflow pack public/favicon.ico src/ dist/source.zip
# 将 `ico`文件 和 `src/` 目录打包, 压缩包 `source.zip`在dist目录中
```

### options
最后一项是打包输出的路径，其他项目是打包的目标路径。





