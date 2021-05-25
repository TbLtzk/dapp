import React from 'react';

import { Dropdown } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function CardDropdownItems(props) {
  const {
    status,
    handleVote,
    handleExecute,
    shareText
  } = props;

  return (
    <>
      {status === 'Passed' ?
        <Dropdown.Item onClick={handleExecute}>Execute</Dropdown.Item>
        : null
      }
      {status === 'Pending' || status === 'Accepted' ?
        <Dropdown.Item onClick={handleVote}>
          <i className={`mdi mdi-checkbox-marked-outline btn-icon`}/>Vote
        </Dropdown.Item>
        : null
      }
      <CopyToClipboard text={shareText}>
        <Dropdown.Item>
          <i className={`mdi mdi-share-variant btn-icon`}/>Share
        </Dropdown.Item>
      </CopyToClipboard>
    </>
  );
}

export default CardDropdownItems;

