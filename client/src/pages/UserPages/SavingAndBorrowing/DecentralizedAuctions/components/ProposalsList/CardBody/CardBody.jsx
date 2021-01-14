import React, { useMemo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChevronDown, faClock } from '@fortawesome/free-solid-svg-icons';

import ListCardBody from 'components/Custom/PageLists/ListCardBody';

import { convertToMonthDayYear, remainDate } from 'func/convertDate';

import { Details, } from 'components/Custom/PageLists/ListCardBody/styles';

function CardBody(props) {
  const { id, vetoTime, votingTime, proposalType, proposalID, pollDetail, voteBreakdown, proposalsKind } = props;

  return (
    <ListCardBody
      id={id}
      bodyMainContent={
        <>
          <Details md={4}>
            <div>
              <FontAwesomeIcon icon={faCalendarAlt}/>
              <span>Voting until: {convertToMonthDayYear(votingTime)}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faCalendarAlt}/>
              <span>Veto Start: {convertToMonthDayYear(votingTime)}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faCalendarAlt}/>
              <span>Veto until {convertToMonthDayYear(vetoTime)}</span>
            </div>

          </Details>
          <Details md={4}>
            <div>
              <FontAwesomeIcon icon={faClock}/>
              <span>Remaining Time for Voting: {remainDate(votingTime)}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faClock}/>
              <span>Remaining Time for Veto: {remainDate(vetoTime)}</span>
            </div>
          </Details>
          <Details md={4}>
            <p>Proposal ID: {proposalID}</p>
            {proposalType && <p>Proposal Type: {proposalType}</p>}
          </Details>
        </>
      }
      collapsedContent={
        <p>Content</p>
      }
    />
  );
}

export default CardBody;

