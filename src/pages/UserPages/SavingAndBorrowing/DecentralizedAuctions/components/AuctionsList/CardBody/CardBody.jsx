import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';

import ListCardBody from 'components/Custom/PageLists/ListCardBody';

import { convertToMonthDayYear, remainDate } from 'func/convertDate';
import { Details, } from 'components/Custom/PageLists/ListCardBody/styles';
import { useSelector } from 'react-redux';
import { symbol } from 'store/selectors/stable-coin';

function CardBody(props) {
  const { id, data } = props;
  const symbolType = useSelector(symbol);

  return (
    <ListCardBody
      id={id}
      shareText={`${window.location.origin}/auction/${data.contract}/`}
      collapsedContent={
        <>
          <p>Highest bid: {data.highestBid }{data.contract === 'SystemSurplusAuction' ? " Q" : " " + symbolType} </p>
          <p>Bidder: {data.bidder}</p>

          {data.contract === 'LiquidationAuction'
            ? <>
              <p>Vault id: {data.userVaultId}</p>
              <p>Vault owner: {data.user}</p>
              <p>{data.colAsset + ' ' + data.colKey}</p>
            </>
            : null
          }
          {data.contract === 'SystemSurplusAuction'
            ? <>
              <p>Auction initiated by: {data.user}</p>
              <p>Lot: {data.lot} QUSD</p>
            </>
            : null
          }
          {data.contract === 'SystemDebtAuction'
            ? <p>Reserve Lot: {data.reserveLot} Q</p>
            : null
          }
        </>
      }
    >
      <Details md={4}>
        <div>
          <FontAwesomeIcon icon={faCalendarAlt}/>
          <span>Bid until: {convertToMonthDayYear(data.endTime)}</span>
        </div>
      </Details>
      <Details md={4}>
        <div>
          <FontAwesomeIcon icon={faClock}/>
          <span>Remaining Time for bid: {remainDate(data.endTime)}</span>
        </div>
      </Details>
      <Details md={4}>

        {data.contract === 'LiquidationAuction'
          ? <>
            <p>Vault owner: {data.user.slice(0, 14) + '...'}</p>
            <p>Vault id: {data.userVaultId}</p>
          </>
          : <p>Auction id: {data.id}</p>
        }
      </Details>
    </ListCardBody>
  );
}

export default CardBody;

