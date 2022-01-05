import Button from 'components/Base/Buttons/Button'
import { WrapContainer } from 'components/Custom/LoadingMetaMask/styles'
import React from 'react'
import { useHistory } from 'react-router-dom'

function NotFound () {
  const history = useHistory()
  return (
        <WrapContainer direction="column">
            <h5>Page does not exist</h5>
            <Button title="Home" icon='home' handleButton={() => history.push('/')} />
        </WrapContainer>
  )
}

export default NotFound
