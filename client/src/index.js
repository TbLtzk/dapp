import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Drizzle } from '@drizzle/store';
import { drizzleReactHooks } from '@drizzle/react-plugin';

import { BrowserRouter } from 'react-router-dom';

import LoadingDrizzle from 'components/Custom/LoadingDrizzle';
import Routes from './navigation/Routes';
import drizzleOptions from './drizzleOption';
import { store } from './store/index';

import 'bootstrap/dist/css/bootstrap.min.css';

const drizzle = new Drizzle(drizzleOptions);
const { DrizzleProvider } = drizzleReactHooks;

// console.log('store', store.getState());

ReactDOM.render(
  <DrizzleProvider drizzle={drizzle}>
    <Provider store={store}>
      <LoadingDrizzle>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </LoadingDrizzle>
    </Provider>
  </DrizzleProvider>,

  document.getElementById('root'),
);
