## 项目简介

### 项目工程搭建

1. 本项目基于 creact-react-app 进行搭建
1. 基于 react18x react-router-dom6x 开发
1. 基于 classnames less 进行样式编写
1. craco 进行项目配置 (creact-reaact-app 可使用 eject 进行 webpack 配置的暴露)
1. eslint prettier 代码校验
1. stylelint 样式校验
1. husky lint-staged git commit 校验
1. 基于 antd 进行 ui 开发
1. 基于 axios 进行网络请求
1. 基于 redux 进行状态管理

## 项目结构规范

    src/                    // 源代码
        apis/               // 接口定义
            UserApi.ts      // 具体定义
        assets/             // 静态支援
            imgs/
            styles/
        types/              // TS类型定义
            user.d.ts
        utils/              // 工具函数
        constants/          // 常量定义目录
        hooks/              // 自定义hooks
        components/         // 公共组件目录
        pages/              // 路由页面 与 业务组件
        router/             // 路由配置
        layouts/            // 布局组件
        Routes              // 路由组件

    craco.config.js         // 构建配置文件

## 项目基础建设

### 项目框架基础

1. 路由封装

基于 react-router-dom6x 进行开发，对路由进行配置注册，在 src/router/AuthRouter 组件中进行权限校验完善

    src/Routes.tsx  // 路由组件
    src/router/     // 路由配置及权限校验

2. less 支持

   craco 配置 （craco-less）
   react-app-env.d ts 引入声明

3. 异常处理

- 异常组件封装 componentDidCatch 捕获
- try catch 监听
- reject .then().catch().finally() 监听
- 非空校验 ?.

4. 日期处理

   - dayjs 更小，Day.js 是代替修改本地 Date.prototype，Day.js 对 Date 对象进行了封装，只需要调用 Dayjs()即可。
   - momentjs

### 基础方法封装

1. 请求封装 (请求 与 取消请求)

   src\apis\request\index.ts

2. 上传封装 （源文件上传 与 分片上穿）

### 基础组件封装

1. 功能组件

   - 权限组件

2. ui 组件

   - 滚动条组件

## 项目规范与建议

1. 路由

   - 路由组件：import { BrowserRouter, Routes，Route, Navigate,useNavigate, Link } from "react-router-dom";
   - 语法：<Route path="home/\*" element={<Index />} />
   - 路由配置 ： cconfig
   - 路由嵌套 ：children <Outlet />
   - 路由模式 : hash BrowserRouter
   - 路由传参 :
   - 路由钩子 ：校验，拦截，重定向
   - loading
   - 动态路由 配置存储与后端
   - 结合菜单进行路由切换
   - 防止闪屏
   - 菜单路由选择 缓存。matchRoutes

2. 全局状态

   - mobx @observale

     1. mobx 可以定义多个 store
     2. 统一管理 store,calss 统一初始化，存储在 context 中
     3. Provider 全局注入
     4. 组件 useStore 使用
     5. 更改 mobx action
     6. 异步流程

   - react.createContext Provider / Consumer 全局注入
   - mobx-react-lite(mobx-reaxct 的轻量化，支持 hooks 的支持)，组件监听

   1. 创建 store, --> models。创建 class 包含@observable @action @computed 等
   2. 统一管理 store,calss 统一初始化，存储在 context 中 。Provider 全局注入
   3. 组件使用 useStore
   4. 组件监听：import { observer } from "mobx-react-lite"; observer(Menus)

注意：何时使用 mobx?

4. 国际化

- i18n

      $ npm install react-i18next i18next --save
      # 如果需要检测当前浏览器的语言或者从服务器获取配置资源可以安装下面依赖
      $ npm install i18next-http-backend i18next-browser-languagedetector --save
      $ npm install i18next-xhr-backend 配置项

  1.  locales 配置不同的语言 json
  2.  i18n.js 初始化
  3.  app 映入
  4.  组件使用：

      import { useTranslation, withTranslation } from 'react-i18next';
      const { t，i18n } = useTranslation();

- react-intl

5. 主题

   1. - scss 通过 mixins 混入 实现
      - body 设置 data-theme 全局样式属性
      - 通过 mixins 混入器 实现 $theme-name 主题样式类名， $theme-map 样式
   2. css-in-js 开发 antd 默认 ConfigProvider.theme 支持主题切换

      支持动态切换主题；
      支持同时存在多个主题；
      支持针对某个/某些组件修改主题变量；

6. 路由权限动态配置（json）

   - json 配置管理

7. 权限管理

   1. 登录校验：token cookie ： 结合路由守卫实现用户登录
   2. 接口校验:
      - 校验登录
      - 校验接口权限
   3. 功能让校验：
      - 功能按钮权限校验
   4. 数据权限
      - 用户角色，数据处理
