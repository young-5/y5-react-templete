const Obj: any = {
  1: {
    title: '项目架构',
    process: 1,
    data: [
      {
        name: '基础架构',
        desc: [
          '基于creact-react-app 搭建',
          'antdui库, 5.x版本',
          'webpack构建打包, craco.config 配置',
          'react-router-dom 路由注册',
          'axios HTTP 请求',
          'redux状态管理: react-redux + @reduxjs/toolkit',
          'less 样式开发, .module.less样式隔离',
          'tyscript类型校验',
          'git版本控制',
          'eslint .prettierrc 格式校验',
        ],
      },
    ],
  },
  2: {
    title: '项目生态配置',
    process: 0.1,
    data: [
      {
        name: '项目基础配置',
        desc: [
          'webapck配置：craco.config配置webpack,包括：devServer proxy代理，plugins options 配置less',
        ],
      },
      {
        name: '路由',
        desc: [
          'react-router-dom: Router route  Outlet Link Navigate useNavigate useSearchParams useParams useLocation(页面刷新不消失 不在url上)',
          '路由传参：Navigate state，  useLocation',
        ],
      },
      {
        name: '请求',
        desc: ['axios', '鉴权验证', 'cancelToken'],
      },
      {
        name: '状态管理',
        desc: [
          'redux react-redux(react绑定库) + @reduxjs/toolkit(简化redux开发工具集，通过createSlice自动生成action和reducers)',
          'context + reducer:无法做到状态与ui的分离，这是个简易共享方案',
        ],
      },
      {
        name: '主题',
        desc: [],
      },
      {
        name: '国际化',
        desc: [],
      },
    ],
  },
  3: {
    title: '项目生态建设',
    data: [
      {
        name: '低代码-配置表单',
        desc: [
          '通过对表单生成逻辑及响应的基本业务逻辑封装，可配置 表单项配置数组，实现表单内部的表单项的动态生成，可 表单项类型，配置数据及来源，交互模式，操作模式与相互间的联动等等',
          '表单项封装：对基础的 input select checkbox ',
          '表单集成表单项：',
          '表单数据变换监听：',
        ],
      },
    ],
  },
  4: {
    title: '开发文档',
    data: [
      {
        name: '命名映射',
        desc: ['字段 - field'],
      },
    ],
  },
  5: {
    title: 'react汇总',
    data: [
      {
        name: 'react基础api',
        desc: [
          'state props:单向数据流 更新原理',
          'useState：初始化的时候可以传入一个函数',
          'useMemo',
          'useRef:字符串 回调 数据缓存 访问实例dom',
          'useCallback',
          'useEffect:监听依赖 副作用处理',
          'useContext',
          'useReducer',
          'useImperativeHandle: React.forwardRef() 注入 ref',
          'useLayoutEffect：同步',
          'useDebugValue',
          '生命周期：mounting updating(getDerivedStateFromProps,shouldComponentUpdate,getSnapshotBeforeUpdate) Unmounting',
          '通信：props,ref,context,reducer,redux/mobx 发布订阅 路由通信 浏览器缓存',
          "实现router免刷新：history.pushState('',null,window.location.origin)",
          '异常捕获：非空校验 默认值设置',
          'keep-alive缓存路由:react-activation 实现 路由 页面的的缓存（keepalive）',
          '函数组件 类组件 受控组件 非受控组件 高阶组件',
          '区分组件类型：xxx typeof ==== function && /^classs/.test(Function.prototype.toString.call(xxx))       或者 xxx.prototype instanceof React.Component',
          'ReactDom.createPortal:将子节点渲染到存在于父组件之外的dom节点。如:弹框 提示等',
          '组件子元素判断：React.Children.count(children):children中组件数量，/only(children):children是否只有一个节点 ，/map/foreach/toArray... ，React.isValidElement(children):判断children是不是 react element',
          'suspense:等待异步操作 结束后渲染',
        ],
      },
      {
        name: 'react设计原理',
        desc: [
          '不要再循环判断中使用：',
          '虚拟dom：js对象描述真实dom,统一高效同步更新,React.createElement',
          'diff算法，不跨层级操作 同类型比较 同层级的同类型下的节点，key，增删移',
          '事件机制:合成事件：屏蔽了不同浏览器的差异（SyntheticEvent）（onClcikCapture 捕获阶段的合成事件）,阻止原生事件冒泡，会阻止合成事件监听的执行（stopPropagation()），先原生 后合成',
          '异步流程:state的更新是异步的，并且更新会被合并,state 的个更新队列一一对应 ，链表形式存在 metoizeState, 条件判断 会导致 setState 出现偏差',
          'fiber架构:分片（任务分片分批 完成一部分 把控制权交给游览器），react组件调用栈，链表形式遍历（以前是递归）,调度任务优先级 （调度器 ：阶段一 调度，生成fiber树，得出更新节点信息   （可打断），阶段二 批量更新（不可打断））,js线程和页面绘制线程互斥，过多的同步计算 会阻塞页面绘制（setState更新页面，react 遍历应用节点 计算差异 更新UI 占用线程时间>16ms 掉帧）',
        ],
      },
      {
        name: '开发指南',
        desc: [
          'window加属性 三方库 外部映入的js等 ts会校验，可在 .d.ts 中定义',
          '样式定义，名称跟着组件走， .module.less 限定作用域',
          'npm install --force/--legacy-peer-deps 强制获取 覆盖之前/无视依赖冲突',
        ],
      },
      {
        name: '三方库',
        desc: [
          'dayjs：兼容monentjs，极简的日期处理',
          'ahooks',
          'react-sortable-hoc',
          'react-transition-group',
          'loadsh',
          'pubsub-js:发布订阅',
          '富文本：wangedit，UEditor',
          'cleave.js:格式化文本',
          'bignumber.js:算数库',
          'msk-lib-min.js:国密库',
          'dva(react+redux+redux-sage+react-router 约定式model组织方式) umin',
        ],
      },
      {
        name: '优化',
        desc: [
          '懒加载:页面 react-lazyload,路由懒加载 route.lazy',
          '避免重复声明渲染：useMemo useCallback react.memo，PureComponent/shouldComponentUpdate',
          '渲染优化:diff key',
        ],
      },
    ],
  },
  7: {
    title: 'Typescript',
    process: 1,
    data: [
      {
        name: '基本用法',
        desc: [
          '基本类型：string,number,boolen,any,undefind,null,void,unkonw,never,其中：Unkonw  与 any 的区别：任何类型可以赋值any,any可以赋值任何类型;Unkonw只可以赋值 unkonw和any, 任何类型可以赋值给unkonw;\n null 和undefined 可以赋值给任何类型的变量 ;\n 对象 成员多的可以赋值给成员少的; 参数少的函数可以赋值参数多的。',
          '复杂类型：enum枚举(enum 枚举 （0下标开始 相互访问 可设置字符串因映射 但是下一个需要手动设置映射  数字自增）数字或者字符串的映射)，  Tuple元组(元组  设置每一个成员的类型的数组)， 数组：array<> 或者 xxx[], 对象：定义具体interface 或 type 或 Record<key,type> 或者通过交叉& 联合& 类型处理',
          'interface:定义函数 类 对象等类型接口，通过extends实现继承，可重复定义（声明会合并）',
          'type:可定义类型别名 包括基本类型 联合类型 元组类型，其通过 &交叉类型实现继承,不可重复定义',
          '泛型：不依赖对象的实际类型 但是要对变量进行约束 <T>。',
          '联合类型：& ,联合类型 一般可以做相关的 类型守卫 进行类型处理 （通过typeof区分）对象联合 只能访问联合中的共同成员',
          '交叉类型：| ,',
          '类型断言：自动短断言  as   <Type>  非空断言 !.',
          '函数重载：函数名相同 多函数定义 实现函数重载，函数参数不同 （最精确的放在第一个，最后一个是函数处理 包括类型守卫处理）',
          '类型守卫：in typeof instanceof is',
          '继承：extends A , B , C',
          '装饰器：声明函数，对类 属性 方法进行封装',
          '修饰符：public private protected readonly static abstract get set  override:覆盖',
          '命名空间：namespace , declare 关键字声明  描述全局变量 函数 类 对象',
          '工具类型：Omit：剔除 Pick：提取  Partial:把定义好的对象中的类型全部转化为可选项  Required：必选  Readonly：只读  Extract：提取/包括  data : Extract<d1,d2> :如果的 是继承了d2 返回d1,否则返回nerver  Exclude：排除/不包括 与上面相反',
          'ts内置泛型：内置泛泛型：Array(T)  ReadonlyArry<T> Partial<T>  （可选）Required<T>（必填）  Record<k,T>  （定义键值集合）Pick<K,T>（提取指定T的对象定义属性定义） Omit(K,T)（排出T定义的属性）  Exclude/Extrct<T,u>  （排出/提取u再T返回之后剩余部分）NonNulllable<T>（去除null undefined）  ReturnType<T> （返回函数返回值类型） Parameter<F>  (返回函数参数类型)',
          'React内置类型：React.FC<P>：函数组件，Commonent<P,S> :类组件，ReactElement ： React元素 虚拟dom节点，ReactNode ：任何作为子元素传递给其他组件或者元素的内容，CSSProperties:css样式属性对象，HTMLprops<T>：描述Html元素上存在的所有属性和事件 T指定元素',
        ],
      },
      {
        name: '规范',
        desc: [
          '命名规范：大驼峰 小驼峰 不使用I前缀表示接口 不用_标识私有变量',
          '可以断言的 尽量不需要进行类型定义，如一些基本类型数据',
          '无返回值的函数定义void',
          '函数可选参数放在尾部',
          '不用namespace命名空间 使用 declare',
          '初始化不使用undefined复制',
          '定义必使用 避免无效 死代码',
          '优先使用interface',
          "new Array(3).fill('xxx')",
          '有默认的参数放在函数参数尾部',
          '函数参数长度 嵌套深度  判断的数量  代码长度 文件长度控制',
          '使用代码块 {}',
          '禁止多重三元符  拆分成if判断',
          'for in 要有 hasOwnProperty 或者 hasOwn',
          '?. 代替 && ',
          '使用setPrototypeOf  getProtoTypeOf代替__proto__',
          "异常处理 code 非空校验 .catch reject  try catch throw new Error('foo')",
          'finally优先于try',
        ],
      },
      {
        name: '实践',
        desc: [
          "对于三方或者可忽略的库进行模块生命：.d.ts中声明模块 ：declare module '*.less'",
          '三方库的类型查找：  xxx/lib/component(具体组件)',
          '接口定义： interface 定义对象 函数 类等 可继承',
          'type定义：定义别名 联合类型等',
          '泛型定义：1. Record<k,T> 表示一个对象的键值对的集合， k 键（keyof any的子集） T 值 /n2. Parameters 获取函数类型中所有参数的元组类型，如 type LayoutType = Parameters<typeof Form>[0][layout]',
          '获取类型的一部分定义使用的type :Pick<xxx,field1|field2|...> ，Omit 剔除，  & 并（融合）  | 或者',
          '避免 any 定义：Record<string,any>定义键值对集合，使用什么定义什么，可选参数定义非必要属性，',
          '定义setTimeout ：  <typeof setTimeout> | undefined/number/boolen ',
          'React类型：ReactElement ： React元素 虚拟dom节点, ReactNode ：任何作为子元素传递给其他组件或者元素的内容 ...',
          'ReturnType<typeof settimeout> 返回特定函数的类型  Parameter返回参数类型',
        ],
      },
    ],
  },
  8: {
    title: 'GIT操作',
    process: 0.1,
    data: [
      {
        name: '基础命令',
        desc: [
          '存储空间：',
          '工作区：本地目录。',
          '暂存区：git记录修改操作， git add .添加进暂存区。',
          "本地仓库：git记录代码状态，git commit -m 'xxxx' 推入。",
          '远程仓库：gitlab github gitee等远程代码仓库，代码备份，git push推入',
        ],
      },
      {
        name: '分支创建',
        desc: [
          '基于远程分支创建：git checkout -b dev-branch origin/remote-branch',
          '本地创建分支：git branch dev-branch',
          '关联远程分支：git branch --set-upstreatm dev-branch origin/remote-branch/git branch --set-upstream-to=origin/remote-branch',
          '推送远程分支：git push origin dev-branch:remote-branch， 创建远程分支 git push origin dev-branch',
        ],
      },
      {
        name: '修改commit',
        desc: [
          "修改最近的commit: git commit --amend -m 'xxxx' ",
          '修改历史commit: git rebase -i HEAD~N/commitId  进入编辑模式 i,pick修改为 r,最后:x或者:qwq 存，git push推送即可',
        ],
      },
      {
        name: '回退版本',
        desc: [
          'git reset HEAD~N/commitId, 回退，删除之前的commit提交。',
          'HEAD:当前commit ,HEAD^上一次:commit',
          'git reset --soft/hard/mixed: soft:保留工作区和暂存区，删除本地仓库，hard:重置工作区 暂存区 本地仓库，mixed:默认设置，保留工作区，清空暂存区和本地仓库',
          'git revert: 用新从commit 提交回退操作',
          'git checkout . ：恢复暂存区的所有代码',
        ],
      },
      {
        name: '缓存修改',
        desc: [
          'git stash: 添加',
          'git stash pop/apply：恢复缓存并清空缓存记录/不清空缓存记录',
        ],
      },
    ],
  },
  9: {
    title: 'HTTP网络',
    process: 0.1,
    data: [
      {
        name: '基础概念',
        desc: [],
      },
      {
        name: '状态码',
        desc: [],
      },
      {
        name: 'https',
        desc: [],
      },
    ],
  },
  10: {
    title: '微前端',
    process: 0.1,
    data: [
      {
        name: '基础概念',
        desc: '由一个主应用和n个子应用聚合而成的系统，主应用加载子应用，子应用通过不同功能不同维度拆分而来，子应用独立开发，独立部署',
      },
      {
        name: '微前端实现方案',
        desc: ['single-spa', 'qiankun'],
      },
      {
        name: 'qiankun',
        desc: [''],
      },
    ],
  },
  11: {
    title: '打包构建',
  },
  12: {
    title: 'ES6',
  },
  13: {
    title: 'vue',
  },
  14: {
    title: 'node',
  },
  15: {
    title: '前端规范',
  },
  21: {
    title: '浏览器渲染',
  },
  16: {
    title: '前端性能优化方案',
  },
  17: {
    title: '前端安全防控',
  },
  18: {
    title: '运维部署',
  },
  19: {
    title: '设计模式 + 数据结构 + 算法',
  },
  20: {
    title: '数据库(mongoose)',
    process: 1,
    data: [
      {
        name: '创建',
        desc: [
          '创建数据结构模型:const TestShema = new mongoose.Schema(interface)',
          '创建数据操作模型：mongoose.model("test", TestShema)',
        ],
      },
      {
        name: '新增/插入',
        desc: ['new Modal(data).seave()   ', ' insertMany'],
      },
      {
        name: '查询',
        desc: [
          '单条查询：Model.findOne( { id: "xxx" } )       findById(id)',
          '多条查询：Model.find( searchObj )',
          '排序：.sort( { data: -1 } ).exec',
          '字段选择：.select({})',
          'skip(10).limit(10))  跳过 限定',
          '逻辑操作：',
          '>，$gt',
          '<，$lt',
          '>=，$gte',
          '<\\，$lte',
          '!==，$ne',
          '/xxx/，正则    $regex',
          '$in  包含',
          '多条件查找特定用户 ',
          '$lt 小于',
          '$lte 小于等于',
          '$gt 大于',
          '$gte 大于等于 {created: {$gte: new Date(new Date().getTime() - 1 * 60 * 60 * 1000)}}',
          '$eq 等于',
          '$ne 不等于 {age: { $ne:24}}',
          '$in 一个键对应多个值 {age: {$in:[20,30]}}',
          '$nin 一个键不对应指定值',
          '$or 多个条件匹配, 可以嵌套 $in 使用  {$or: [{name:name"}, {age: 28}]}',
          '$nor 同上取反, 查询与特定模式不匹配的文档',
          '$exists 判断某些关键字段是否存在 {name: {$exists: true}}',
          '$regex 模糊查询',
        ],
      },
      {
        name: '更新',
        desc: [' 单条：updataOne({id,:xxx,} updataObj)', ' 多条：updataMany'],
      },
      {
        name: '删除',
        desc: ['remove({id,;xxx},) ', '  deleteOne ', ' deleteMany'],
      },
    ],
  },
}
export default Obj
