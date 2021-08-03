import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import ButtonLink from 'components/Base/Buttons/ButtonLink'

import { WrapTitle } from './styles'

export default function ButtonLinkArrow (props) {
  const { title, path, stateHistory } = props
  const history = useHistory()

  return (
    <ButtonLink
      title={(
        <>
          <WrapTitle>{title}</WrapTitle>
          <FontAwesomeIcon icon={faArrowRight}/>
        </>
      )}
      handleLink={() => history.push({
        pathname: path,
        state: stateHistory
      })}
    />
  )
}

ButtonLinkArrow.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
}
