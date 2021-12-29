import React from 'react'
import { withRouter } from 'react-router-dom'
import { WrapContainer } from 'components/Custom/LoadingMetaMask/styles'
import Button from 'components/Base/Buttons/Button'

class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError () {
    return { hasError: true }
  }

  componentDidCatch () {
    const timeout = setTimeout(() => {
      this.props.history.push({
        pathname: '/'
      })
      window.location.reload()
      clearTimeout(timeout)
    }, 3000)
  }

  render () {
    if (this.state.hasError) {
      return (
                <WrapContainer direction="column">
                    <p>Something went wrong</p>
                    <Button title="Go home" handleButton={() => history.push('/')} />
                </WrapContainer>
      )
    } else {
      return this.props.children
    }
  }
}

export default withRouter(ErrorBoundary)
