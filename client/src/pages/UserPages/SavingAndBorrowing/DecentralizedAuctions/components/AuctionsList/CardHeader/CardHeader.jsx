import React from 'react';

import Button from 'components/Base/Buttons/Button';
import ListCardHeader from 'components/Custom/PageLists/ListCardHeader';

import { LabelStatus, WrapVoteBtn } from 'components/Custom/PageLists/styles';

function CardHeader(props) {
  const { title, status, handleBid, handleExecute, remainDate } = props;

  return (
    <>
      <ListCardHeader
        title={title}
        data={
          <>
            {!status ? null :
              <LabelStatus>{status}</LabelStatus>
            }
            {status === 'Active' && remainDate === 0 ?
              <WrapVoteBtn>
                <Button
                  title="Execute"
                  type="white"
                  handleButton={handleExecute}
                />
              </WrapVoteBtn> : null
            }
            {status === 'Active' && remainDate > 0 ?
              <WrapVoteBtn>
                <Button
                  title="Bid"
                  type="white"
                  handleButton={handleBid}
                />
              </WrapVoteBtn>
              : null
            }
          </>
        }
      />
    </>
  );
}

export default CardHeader;

