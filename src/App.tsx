import { Suspense, Fragment } from 'react'
import Routes from './Routes'
import './App.css'

function App() {
  return (
    <div className='App'>
      <Suspense fallback={<div>路由加载中...</div>}>
        <Fragment>
          <Routes />
        </Fragment>
      </Suspense>
    </div>
  )
}

export default App
