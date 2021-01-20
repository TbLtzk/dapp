import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';

import ListCardBody from 'components/Custom/PageLists/ListCardBody';

import { convertToMonthDayYear, remainDate } from 'func/convertDate';
import { Details, } from 'components/Custom/PageLists/ListCardBody/styles';
import { Text } from 'components/Custom/PageLists/styles';

function CardBody(props) {
  const { id, data } = props;

  return (
    <ListCardBody
      id={id}
      collapsedContent={
        <>
          <Text>Highest bid: {data.highestBid}</Text>
          <Text>Bidder: {data.bidder}</Text>
          <Text>User: {data.user}</Text>
          <Text>Vault id: {data.userVaultId}</Text>
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
        <p>User: {data.user.slice(0, 14) + '...'}</p>
        <p>Vault id: {data.userVaultId}</p>
      </Details>
    </ListCardBody>
  );
}

export default CardBody;

