import { ProposalType } from 'typings/proposals';

import CustomCardButtons from 'components/Custom/CustomCardButtons';

import ProposalStatus from '../ProposalStatus';

import PollDetail from './components/PollDetail';
import ProposalContent from './components/ProposalContent';
import SlashingObjection from './components/SlashingObjection';
import VoteBreakdown from './components/VoteBreakdown';
import VotingItems from './components/VotingItems';
import {
  ListCardBody,
  ListCardHeader,
  ListCardWrp
} from './styles';

import { STATUSES } from 'constants/statuses';
import { createShareText } from 'func/useful';

function ProposalLayout ({ proposal, type }: { proposal: any, type: ProposalType }) {
  return (
    <ListCardWrp>
      <ListCardHeader>
        <div className="card__title">
          <h1> {proposal.title}</h1>
          <ProposalStatus status={proposal.status} />
        </div>
        <div className="card__buttons">
          <CustomCardButtons
            onePage={true}
            shareText={createShareText('proposal', proposal.contract, proposal.id)}
          />
        </div>
      </ListCardHeader>

      <ListCardBody>
        <ProposalContent proposal={proposal} />
        <div className="list-card__line" />
        <PollDetail
          pollDetail={proposal}
          type={type}
          contract={proposal.contract}
        />
        <div className="list-card__line" />
        <VoteBreakdown voteBreakdown={proposal} />
        <VotingItems proposal={proposal} />
        {type === 'slashing' && proposal.status === STATUSES.executed
          ? (
            <>
              <div className="list-card__line" />
              <SlashingObjection
                contract={proposal.contract}
                proposalId={proposal.id}
                objData={proposal.objEscrow}
              />
            </>
          )
          : null}
      </ListCardBody>
    </ListCardWrp>
  );
}

export default ProposalLayout;
