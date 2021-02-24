import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { drizzleReactHooks } from '@drizzle/react-plugin';

import { BrowserRouter } from 'react-router-dom';

import LoadingDrizzle from 'components/Custom/LoadingDrizzle';
import StyleLayout from 'components/Base/StyleLayout';
import Routes from './navigation/Routes';
import { drizzleRegistry } from 'contracts/config/drizzle-config';
import { store } from './store/index';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/fonts/fonts.css';

const { DrizzleProvider } = drizzleReactHooks;

ReactDOM.render(
  <DrizzleProvider drizzle={drizzleRegistry}>
    <Provider store={store}>
      <StyleLayout>
        <LoadingDrizzle>
          <BrowserRouter>
            <Routes/>
          </BrowserRouter>
        </LoadingDrizzle>
      </StyleLayout>
    </Provider>
  </DrizzleProvider>,

  document.getElementById('root'),
);
