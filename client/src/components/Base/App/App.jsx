import React, { useEffect } from 'react';

import LoadingDrizzle from 'components/Custom/LoadingDrizzle';

import Routes from '../../../navigation/Routes';

import { drizzleReactHooks } from '@drizzle/react-plugin';
import { drizzleRegistry } from 'contracts/config/drizzle-config';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../store';

const { DrizzleProvider } = drizzleReactHooks;

function App() {
  return (
    <DrizzleProvider drizzle={drizzleRegistry}>
      <Provider store={store}>
        <LoadingDrizzle>
          <BrowserRouter>
            <Routes/>
          </BrowserRouter>
        </LoadingDrizzle>
      </Provider>
    </DrizzleProvider>
  );
}

export default App;
