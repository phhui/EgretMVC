# egret-pqMVC
- 基于egret的MVC开发框架
- 多人协同开发框架，参考puremvc
- 功能模块化，面向对象
- 每个模块使用自己独立的json配置文件，避免所有资源集中在default.res.json而无法灵活管理
- 通过解析JSON实现界面渲染
- 具体参考DEMO

- 流程(新建shop模块)：
- 1、(使用一键创建模块工具自动生成或者：)参考src/module/maps并复制更名为shop，同时更新MapsMgr.ts,MapsController.ts...等文件名为ShopMgr.ts......
- 2、default.res.json中参考Maps_module添加模块json配置文件Shop_module
- 3、config中添加 shop.json，配置方法参考maps.json，详细支持的配置可查看PqView.ts
- 4、assets中添加shop.json中配置的资源
- 5、在main.ts中或其它地方添加call(ShopCmd.SHOW_WINDOW);
- 6、编译运行，没有错误的话应该就能看到shop.json中配置的界面了。
- 7、shop.json中所有配置的内容在showView.ts中通过this.uiDict["name"]获得对应的对象
