import React from 'react'
import ReactDOM from 'react-dom'
import LoadingMetaMask from 'components/Custom/LoadingMetaMask'

import 'assets/fonts/fonts.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.render(
  <>
    <Provider store={store}>
      <LoadingMetaMask />
    </Provider>
  </>,
  document.getElementById('root')
)
