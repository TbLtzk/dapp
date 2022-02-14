import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import StyleLayout from 'components/Base/StyleLayout'
import Routes from '../../../navigation/Routes'

function App () {
  return (
        <BrowserRouter>
            <StyleLayout>
                <Routes />
            </StyleLayout>
        </BrowserRouter>
  )
}

export default App
