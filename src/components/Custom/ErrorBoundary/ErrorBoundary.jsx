import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as Sentry from '@sentry/react';
import { Wrap } from 'context/Web3ContextProvider/styles';

import Button from 'components/Base/Button';

class ErrorBoundary extends Component {
  constructor (props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError (error) {
    if (import.meta.env.NODE_ENV !== 'development') {
      Sentry.captureMessage(error);
    }
    return { hasError: true };
  }

  componentDidCatch () {
    if (import.meta.env.NODE_ENV !== 'development') {
      const timeout = setTimeout(() => {
        this.props.history.push({
          pathname: '/'
        });
        clearTimeout(timeout);
      }, 5000);
    }
  }

  render () {
    if (this.state.hasError) {
      return (
        <Wrap direction="column">
          <p>Something went wrong</p>
          <Button onClick={() => history.push('/')}>
            <i className="mdi mdi-home" />
            <span>Home</span>
          </Button>
        </Wrap>
      );
    } else {
      return this.props.children;
    }
  }
}

export default withRouter(ErrorBoundary);
