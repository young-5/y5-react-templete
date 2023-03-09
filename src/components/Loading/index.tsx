import * as React from 'react'

const Loading: React.FC = (props: any): any => {
  const { text = '', antIcon, fontSize = 24, ...rest } = props
  return <div>加载中</div>
}

export default Loading
