import React, { useEffect, useState, useCallback } from 'react';
import { initAddresses } from 'contracts/mapping/contract-to-address';

import LoadingSpinner from 'components/Base/LoadingSpinner';
import StartConfigurations from 'pages/StartConfigurations';

import { WrapContainer } from './styles';

const STATES = {
  loading: 'loading',
  error: 'error',
  loaded:'loaded'
}

function InitApp () {
  const [appState, setAppState] = useState(STATES.loading);
  const [errorMessage, setErrorMessage] = useState('Can\'t load addresses');
  const [appComponent, setAppComponent] = useState({});
  useEffect(async () => {
    try {
      await initAddresses()
      // setAppComponent(await import('components/Base/App'))
      // setAppState(STATES.loaded)
    } catch (e) {
      console.error(e)
      setAppState(STATES.error)
    }
  }, [])

  const accountHandler = useCallback( () => {
    switch (appState) {
      case STATES.loaded:
        return appComponent.default()
      case 'error':
        return <StartConfigurations error={errorMessage}/>;
      case 'loading':
        return (
          <WrapContainer>
            <LoadingSpinner/>
          </WrapContainer>
        );
      default:
        return (
          <WrapContainer>
            <LoadingSpinner/>
          </WrapContainer>
        );
    }
  }, [appState]);

  return accountHandler();
}

export default InitApp;
