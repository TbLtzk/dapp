import React from 'react'

import { Dropdown } from 'react-bootstrap'
import { CopyToClipboard } from 'react-copy-to-clipboard'

function CardDropdownItems ({ status, handleVote, handleExecute, shareText }) {
  return (
        <>
            {status === 'Passed' ? <Dropdown.Item onClick={handleExecute}>Execute</Dropdown.Item> : null}
            {status === 'Pending' || status === 'Accepted'
              ? (
                <Dropdown.Item onClick={handleVote}>
                    <i className={'mdi mdi-checkbox-marked-outline btn-icon'} />
                    {status === 'Pending' ? 'Vote' : 'Veto'}
                </Dropdown.Item>
                )
              : null}
            <CopyToClipboard text={shareText}>
                <Dropdown.Item>
                    <i className={'mdi mdi-share-variant btn-icon'} />
                    Share
                </Dropdown.Item>
            </CopyToClipboard>
        </>
  )
}

export default CardDropdownItems
