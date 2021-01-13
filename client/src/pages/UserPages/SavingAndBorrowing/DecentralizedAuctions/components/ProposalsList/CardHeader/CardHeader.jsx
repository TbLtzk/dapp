import React from 'react';

import Button from 'components/Base/Buttons/Button';
import ListCardHeader from 'components/Custom/PageLists/ListCardHeader';

import { LabelStatus, WrapVoteBtn } from 'components/Custom/PageLists/styles';

function CardHeader(props) {
  const { title, status, handleBid } = props;

  return (
    <>
      <ListCardHeader
        title={title}
        data={
          <>
            {!status ? null :
              <LabelStatus>{status}</LabelStatus>
            }
            <WrapVoteBtn>
              <Button
                title="Bid"
                type="white"
                handleButton={handleBid}
              />
            </WrapVoteBtn>
          </>
        }
      />
    </>
  );
}

export default CardHeader;

