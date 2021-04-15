import React from 'react';

import LoadingAccount from 'components/Custom/LoadingAccount';

import Routes from '../../../navigation/Routes';

import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../store';
import { WrapContainer } from './styles';

function App() {
  return (
    <WrapContainer>
      <Provider store={store}>
        <LoadingAccount>
          <BrowserRouter>
            <Routes/>
          </BrowserRouter>
        </LoadingAccount>
      </Provider>
    </WrapContainer>
  );
}

export default App;
