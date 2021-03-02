import React from 'react';

import LoadingDrizzle from 'components/Custom/LoadingDrizzle';
import StyleLayout from 'components/Base/StyleLayout';

import Routes from '../../../navigation/Routes';

import { drizzleReactHooks } from '@drizzle/react-plugin';
import {drizzleRegistry} from 'contracts/config/drizzle-config';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../store';

const { DrizzleProvider } = drizzleReactHooks;

function App () {
  return (
    <DrizzleProvider drizzle={drizzleRegistry}>
    <Provider store={store}>
      <StyleLayout>
        <LoadingDrizzle>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </LoadingDrizzle>
      </StyleLayout>
    </Provider>
  </DrizzleProvider>
  )
}

export default App;
