import React from 'react'
import ReactDOM from 'react-dom'
import LoadingMetaMask from 'components/Custom/LoadingMetaMask'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './store'
import 'assets/fonts/fonts.css'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <LoadingMetaMask />
    </BrowserRouter>
  </Provider>,

  document.getElementById('root')
)
