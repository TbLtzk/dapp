import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import StyleLayout from 'components/Base/StyleLayout'
import Routes from '../../../navigation/Routes'

function App () {
  return (
        <StyleLayout>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </StyleLayout>
  )
}

export default App
