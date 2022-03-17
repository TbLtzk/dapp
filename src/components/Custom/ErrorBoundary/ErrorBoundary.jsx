import React from 'react'
import * as Sentry from '@sentry/react'
import { withRouter } from 'react-router-dom'
import { WrapContainer } from 'components/Custom/LoadingMetaMask/styles'
import Button from 'components/Base/Buttons/Button'

class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError (error) {
    Sentry.captureMessage(error)
    return { hasError: true }
  }

  componentDidCatch () {
    if (process.env.NODE_ENV !== 'development') {
      const timeout = setTimeout(() => {
        this.props.history.push({
          pathname: '/'
        })
        clearTimeout(timeout)
      }, 5000)
    }
  }

  render () {
    if (this.state.hasError) {
      return (
                <WrapContainer direction="column">
                    <p>Something went wrong</p>
                    <Button title="Home" icon="home" handleButton={() => history.push('/')} />
                </WrapContainer>
      )
    } else {
      return this.props.children
    }
  }
}

export default withRouter(ErrorBoundary)
