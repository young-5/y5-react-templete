// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import './index.css'
// import App from './App'
// import reportWebVitals from './reportWebVitals'

// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(
//   // <React.StrictMode>
//   //   <App />
//   // </React.StrictMode>,
//   <App />,
// )

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import actions from '@/micros/actions'
import './public-path.js'

let root: any
function render(props: any) {
  console.log('子应用', props)
  const { container } = props
  //判断当前启动环境是否为qiankun环境下
  const dom = container
    ? container.querySelector('#root')
    : document.getElementById('root')
  root = createRoot(dom)
  root.render(<App />)
}
const _patch = (window as any).__POWERED_BY_QIANKUN__ ? '/public' : ''

// 判断是否在qiankun环境下，非qiankun环境下独立运行
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({})
}

// 各个生命周期
// bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
export async function bootstrap() {
  console.log('react app bootstraped')
}

// 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
export async function mount(props: any) {
  console.log('进入子系统：', props)
  actions.setActions(props)
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev)
    // 将这个state存储到我们子应用store
  })
  props.setGlobalState({ msg: 'in' })
  render(props)
}

// 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
export async function unmount(props: any) {
  actions.setGlobalState({ msg: 'out' })
  root.unmount()
  root.null
}
