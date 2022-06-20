
import CustomCardButtons from 'components/Custom/CustomCardButtons';

import {
  ListCardBody,
  ListCardHeader,
  ListCardWrp
} from './ListCard/styles';
import PollDetail from './PollDetail';
import ProposalContent from './ProposalContent';
import SlashingObjection from './SlashingObjection';
import VoteBreakdown from './VoteBreakdown';
import VotingItems from './VotingItems';

import { STATUSES } from 'constants/statuses';
import { createShareText } from 'func/useful';

function ProposalCard ({ proposal, proposalKind }) {
  return (
    <ListCardWrp>
      <ListCardHeader>
        <p>Proposal ID: {proposal.id}</p>

        {proposal.status && (
          <p className="list-card__status">{proposal.status}</p>
        )}
      </ListCardHeader>

      <h1 className="card__title" title={proposal.title}>
        {proposal.title}
      </h1>

      <div className="card__buttons">
        <CustomCardButtons
          onePage
          shareText={createShareText('proposal', proposal.contract, proposal.id)}
        />
      </div>

      <ListCardBody>
        <ProposalContent proposal={proposal} />
        <div className="list-card__line" />
        <PollDetail
          pollDetail={proposal}
          proposalsKind={proposalKind}
          contract={proposal.contract}
        />
        <div className="list-card__line" />
        <VoteBreakdown voteBreakdown={proposal} />
        <VotingItems proposal={proposal} />
        {proposalKind === 'slashing' && proposal.status === STATUSES.executed
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

export default ProposalCard;
