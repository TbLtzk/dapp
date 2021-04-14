import React from 'react';

import LoadingAccount from 'components/Custom/LoadingAccount';

import Routes from '../../../navigation/Routes';

import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../store';

function App() {
  return (
      <Provider store={store}>
        <LoadingAccount>
          <BrowserRouter>
            <Routes/>
          </BrowserRouter>
        </LoadingAccount>
      </Provider>
  );
}

export default App;
