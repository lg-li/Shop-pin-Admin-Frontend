# Shop-Pin! Admin. Dashboard Front-end

Pin! 开源拼团电商平台，完整的移动端电商平台，附带简单的推荐系统。此项目为其管理端后台前端部分。

基于 Vue + element UI 构建。

## 系统功能

此后台系统包括包含以下模块

- 登录、退出、用户权限验证
- 根据用户权限动态生成路由表、动态加载侧边栏菜单项
- 显示交易信息和图表、切换店铺
- 切换店铺、店铺信息管理、收团时间设置
- 商品、SKU查询、新增、分类、上架等管理
- 订单、团单按条件查询、发货、退款、备注等管理
- 按商品查看、回复评论

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

## Contributors

Niu Cheng, and other memebers of Pin! dev. team.

## License

[MIT] license.
