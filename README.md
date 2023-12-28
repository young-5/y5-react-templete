## 初始化

```
安装依赖
npm install
```

## 启动

```
npm run start:dev (开发环境)
```

## 单元测试

```
npm run tet
```

## 编译

```
npm run build
```

## 模板项目简介

1. 基于 creact-react-app 搭建
2. webpack (craco) 配置构建打包，（后续将支持 vite 构建打包模板）
3. less 样式开发，基于 antd v5 进行组件开发和主题配置

## 项目结构

    src/                    // 源代码
        apis/               // 接口定义
            UserApi.ts      // 具体定义
        assets/             // 静态支援
            imgs/
            styles/
        typings/            // TS类型定义
            user.d.ts
        utils/              // 工具函数
        constants/          // 常量定义目录
        hooks/              // 自定义公共hooks
        components/         // 公共组件目录
        pages/              // 路由页面 与 业务组件
        routes/             // 路由配置
        layouts/            // 布局组件
        styles/             // 公共样式
        providers           // 公共 provider
    Routes.tsx              // 路由组件
    __tests__               // 单元测试
    craco.config.js         // 构建配置文件
    jest.config.js          // jest单元测试配置
    mock                    // mock数据
    config                  // 存放 ts 及 craco 相关配置
    public                  // 静态文件 html favicon static文件,其中react等静态资源可以内置在static中

```
    静态支援 html 引入
    <script src="%PUBLIC_URL%static/js/react.procuction.min.js"></script>
```

### 配置文件

1. package 项目依赖，项目命令，代码质量 格式化 等配置
2. craco.config webpack 构建打包配置
2. jest.config jest 单元测试
3. tsconfig typescript 配置
4. .eslintrc 代码质量校验配置
5. stylelint.config 样式质量校验配置
6. .prettierrc 代码格式化
7. commitlint.config git commit 校验
8. .husky git 钩子配置
9. .[xxx]ignore 相关忽略文件

## 开发生态

1. react-router-dom
2. react-redux
3. antd v5
4. classnames
5. dayjs
6. axios
7. typescript
8. jest

## 项目规范

1. eslint
2. ts
3. prittierrc
4. git commit 校验（husky + lint-staged + commitlint）
5. stylelint 样式校验

## 功能模板

1. axios 请求封装
2. 异常捕获
3.

## 内置组件

1. ErrorBoundary 异常捕获组件
2.

## 功能指引

### 路由配置

在 routes 中进行配置，如:

```
const routes: IRoute[] = [
  {
    path: '/login',
    title: '登录',
    component: <UserLayout />,
    menu: false,
    children: [
      {
        path: '/login',
        component: <Login />,
        title: '登录',
      },
    ],
  },
]
```

### 接口定义

在 apis 中定义相关路由的请求 api,如

```
import service from './request';

export function loginApi(data: { userId: string; name: string }) {
  return service.post('/api/v1/users/login', data)
}

```

### 状态管理

默认使用 context 作为状态管理，开发中可更加实际情况选择合适的状态管理器

context 使用实例

```
// 定义 context
// providers/index
const themeContext = createContext({
  theme: null,
  setTheme: null,
})
export { themeContext }


// app 注入
<themeContext.Provider value={{ theme, setTheme }}>

// 组件使用
const  {theme,setTheme} = useContext(themeContext)

```

### 环境变量配置

## 开发配置

#### 请求代理

craco.config 配置 devServer

```
devServer:(devServerConfig,{env,paths,proxy,allowedHost})=>{
return {
  ...devServerConfig,
  proxy:{
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: {
        '/api': '/api',
      },
    },
  }
}
```

## 生态建议

### 状态管理

1. redux + reduxjs/toolkit
2. mobx
3. uzstand
4. recoil

### 函数库

1. lodash
2. ahooks
