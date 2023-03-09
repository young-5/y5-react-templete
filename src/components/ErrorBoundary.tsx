import * as React from 'react'
import { Component } from 'react'

interface ErrorState {
  hasError: boolean
}

interface ErrorProps {
  children: React.ReactNode
}

class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props)
    this.state = {
      hasError: false,
    }
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      hasError: true,
    })
    console.log(error, errorInfo)
  }
  render(): React.ReactNode {
    return this.state.hasError ? <div>异常</div> : this.props.children
  }
}
export default ErrorBoundary
