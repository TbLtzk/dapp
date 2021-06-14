import React from 'react';

import StyleLayout from 'components/Base/StyleLayout';
import LoadingAccount from 'components/Custom/LoadingAccount';

import Routes from '../../../navigation/Routes';

import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../store';

function App() {
  return (
    <>
      <Provider store={store}>
        <StyleLayout>
          <LoadingAccount>
            <BrowserRouter>
              <Routes/>
            </BrowserRouter>
          </LoadingAccount>
        </StyleLayout>
      </Provider>
    </>
  );
}

export default App;
