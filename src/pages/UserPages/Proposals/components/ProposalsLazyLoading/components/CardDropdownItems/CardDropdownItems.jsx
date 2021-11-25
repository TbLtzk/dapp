import Button from 'components/Base/Buttons/Button'
import React from 'react'

import { Dropdown } from 'react-bootstrap'

function CardDropdownItems ({ status, handleVote, handleExecute, shareText }) {
  return (
        <>
            {status === 'Passed' ? <Dropdown.Item onClick={handleExecute}>Execute</Dropdown.Item> : null}
            {status === 'Pending' || status === 'Accepted'
              ? (
                <Dropdown.Item onClick={handleVote}>
                    <i className="mdi mdi-checkbox-marked-outline btn-icon" />
                    <Button handleButton={() => console.log('vote')} />
                    <Button handleButton={() => console.log('veto')} />

                    {status === 'Pending' ? 'Vote' : 'Veto'}
                </Dropdown.Item>
                )
              : null}
        </>
  )
}

export default CardDropdownItems
