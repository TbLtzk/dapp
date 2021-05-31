import React, { useCallback } from 'react';

import Button from 'components/Base/Buttons/Button';
import ListCardHeader from 'components/Custom/PageLists/ListCardHeader';

function CardHeader(props) {
  const {
    auction,
    title,
    status,
    handleBid,
    handleExecute,
    remainDate,
    isExecuted
  } = props;

  const checkBtnDependOnContract = useCallback(() => {
    if (auction.contract === 'LiquidationAuction') {
      return (
        <>
          {status === 'Active' && remainDate === 0 ?
            <Button
              title="Execute"
              type="white"
              handleButton={handleExecute}
            />
            : null
          }
          {status === 'Active' && remainDate > 0 ?
            <Button
              title="Bid"
              type="white"
              handleButton={handleBid}
            />
            : null
          }
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
          {status === 'Accepted' ?
            <Button
              title="Execute"
              type="white"
              handleButton={handleExecute}
            />
            : null
          }
          {status === 'Pending' ?
            <Button
              title="Bid"
              type="white"
              handleButton={handleBid}
            />
            : null
          }
        </>
      );
    } else if (auction.contract === 'SystemDebtAuction') {
      return (
        <>
          {!status ? null :
            <div className="list-card__status">{status}</div>
          }
          {status === 'Active' && remainDate === 0 ?
            <Button
              title="Execute"
              type="white"
              handleButton={handleExecute}
            />
            : null
          }
          {status === 'Active' && remainDate !== 0 ?
            <Button
              title="Bid"
              type="white"
              handleButton={handleBid}
            />
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

