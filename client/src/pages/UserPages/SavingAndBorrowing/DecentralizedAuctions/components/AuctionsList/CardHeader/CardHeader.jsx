import React, { useCallback } from 'react';

import Button from 'components/Base/Buttons/Button';
import ListCardHeader from 'components/Custom/PageLists/ListCardHeader';

import { LabelStatus, WrapVoteBtn } from 'components/Custom/PageLists/styles';

function CardHeader(props) {
  const { auction, title, status, handleBid, handleExecute, remainDate, isExecuted } = props;

  const checkBtnDependOnContract = useCallback(() => {
    if (auction.contract === 'LiquidationAuction') {
      return (
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
            </WrapVoteBtn>
            : null
          }
          {/*{status === 'Active' && remainDate > 0 ?*/}
          <WrapVoteBtn>
            <Button
              title="Bid"
              type="white"
              handleButton={handleBid}
            />
          </WrapVoteBtn>
          {/*  : null*/}
          {/*}*/}
        </>
      );
    } else if (auction.contract === 'SystemSurplusAuction') {

      let status = null;
      if (auction.endTime === 0 || remainDate !== 0) {
        status = 'Pending';
      }
      if (auction.isExecuted) {
        status = 'Executed';
      } else if (!auction.isExecuted && remainDate === 0) {
        status = 'Accepted';
      }

      return (
        <>
          {status ? <LabelStatus>{status}</LabelStatus> : null}
          {status === 'Accepted' ?
            <WrapVoteBtn>
              <Button
                title="Execute"
                type="white"
                handleButton={handleExecute}
              />
            </WrapVoteBtn>
            : null
          }
          {status === 'Pending' ?
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
      );
    }
  }, [auction]);

  return (
    <>
      <ListCardHeader
        title={title}
        data={
          checkBtnDependOnContract()
        }
      />
    </>
  );
}

export default CardHeader;

