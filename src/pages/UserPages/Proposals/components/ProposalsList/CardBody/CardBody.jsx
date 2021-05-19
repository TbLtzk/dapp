import React, { useMemo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { PROPOSALS_TYPES } from 'constants/statuses';

import CustomTabsView from 'components/Base/Tabs/CustomTabsView';
import ListCardBody from 'components/Custom/PageLists/ListCardBody';
import PollDetail from 'pages/UserPages/Proposals/components/ProposalsList/PollDetail';
import VoteBreakdown from 'pages/UserPages/Proposals/components/ProposalsList/VoteBreakdown';
import SlashingObjection from '../SlashingObjection';

import { convertToMonthDayYear, remainDate } from 'func/convertDate';

import {
  Details,
} from 'components/Custom/PageLists/ListCardBody/styles';

function CardBody(props) {
  const {
    id, vetoTime, votingTime, proposalType, proposalID, proposal,
    voteBreakdown, proposalsKind, contract
  } = props;

  const tabsItems = useMemo(() => {
    let result = [
      {
        label: 'poll-detail',
        title: 'Proposal Details',
        content: (
          <PollDetail pollDetail={proposal} proposalsKind={proposalsKind}/>
        )
      },
      {
        label: 'vote-breakdown',
        title: 'Vote Breakdown',
        content: (
          <VoteBreakdown voteBreakdown={voteBreakdown}/>
        )
      },
    ];

    if (proposalsKind !== PROPOSALS_TYPES.slashingProposals) {
      return result;
    } else {
      const slashingTab = [
        {
          label: 'slashing-objection',
          title: 'Slashing Objection',
          content: (
            <SlashingObjection
              contract={contract}
              proposalId={proposalID}
              objData={proposal?.objEscrow}
            />
          )
        },
      ];
      return [...result, ...slashingTab];
    }
  }, [proposalsKind]);

  return (
    <>
      <ListCardBody
        id={id}
        collapsedContent={
          <CustomTabsView
            tabsItems={tabsItems}
          />
        }
        onShareBtn={() => {
        }}
        shareText={`${window.location.origin}/q-governance/proposal/${contract}/${proposalID}`}
      >
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
      </ListCardBody>
    </>
  );
}

export default CardBody;

