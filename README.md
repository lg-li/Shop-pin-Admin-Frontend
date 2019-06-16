# Pin 后台



**Pin 拼团系统的管理端后台**

包含以下模块

## 运行项目
打开控制台，切换至项目根目录

```bash
# 安装依赖
npm install

# 运行
npm run dev
```

项目将会自动在 http://localhost:9528 打开

## 构建项目

```bash
# 测试环境下构建
将会保留javaScript文件中的变量名，方便调试
npm run build:stage

# 生产环境下构建
压缩JavaScript文件，减小生成体积
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```



## License

[MIT] license.

Copyright (c) 2019-present Niu Cheng
