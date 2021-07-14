import React from 'react';
import { PROPOSALS_TYPES, STATUSES } from 'constants/statuses';
import PollDetail from '../PollDetail';
import VoteBreakdown from '../VoteBreakdown';
import SlashingObjection from '../SlashingObjection';

import { convertToMonthDayYear, remainDate } from 'func/convertDate';

function CardCollapsedContent(props) {
  const {
    proposalType,
    proposal,
    voteBreakdown,
    proposalsKind,
    contract,
    proposalID,
    votingTime,
    objData,
    vetoTime
  } = props;
  return (
    <>
      <div className="list-card__three-colm">
        <div>
          <h5>Veto Start</h5>
          <p>{convertToMonthDayYear(votingTime)}</p>
        </div>
        <div>
          {proposalType && <><h5>Proposal Type</h5><p>{proposalType}</p></>}
        </div>
        <div>
          <h5>Remaining Time for Veto</h5>
          <p>{remainDate(vetoTime)}</p>
        </div>
      </div>
      <div className="list-card__line"/>
      <PollDetail pollDetail={proposal} proposalsKind={proposalsKind}/>
      <div className="list-card__line"/>
      <VoteBreakdown voteBreakdown={voteBreakdown}/>
      {
        proposalsKind === PROPOSALS_TYPES.slashingProposals && objData === STATUSES.executed
          ?(<>
            <div className="list-card__line"/>
            <SlashingObjection
              contract={contract}
              proposalId={proposalID}
              objData={proposal?.objEscrow}
              />  
          </>)
        :null
      }
    </>
  );
}

export default CardCollapsedContent;
