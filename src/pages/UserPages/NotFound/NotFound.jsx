import React from 'react'
import { useHistory } from 'react-router-dom'
import { NotFoundContainer } from './styles'
import Button from 'components/Base/Buttons/Button'

function NotFound () {
  const history = useHistory()
  return (
        <NotFoundContainer>
            <h5>Page does not exist</h5>
            <Button alwaysEnabled title="Home" icon="home" handleButton={() => history.push('/')} />
        </NotFoundContainer>
  )
}

export default NotFound
