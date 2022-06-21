import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ProposalEvent } from 'typings/contracts';

import SkeletonProposalsLoading from 'components/Base/SkeletonLoading';

import ProposalContent from '../ProposalContent';

import { ListCardBody, ListCardHeader, ListCardWrp, ProposalLink } from './styles';

import { transactionLoadingSelector } from 'store/transaction-handler/selectors';
import { voteDetailsSelector } from 'store/voting/proposals/selectors';

import { getProposal } from 'contracts/helpers/voting-helpers/base-voting-helper';

function ListCard ({ proposal }: { proposal: ProposalEvent }) {
  const transactionLoading = useSelector(transactionLoadingSelector);
  const [proposalInfo, setProposalInfo] = useState<any>(null);

  const voteDetails = useSelector(voteDetailsSelector);
  useEffect(() => {
    const isCurrentProposal = proposal.contract === voteDetails.contract &&
      proposal.id === voteDetails.proposalId;

    if (!transactionLoading && isCurrentProposal) {
      loadProposal();
    }
  }, [transactionLoading]);

  useEffect(() => {
    loadProposal();
    return () => setProposalInfo(null);
  }, []);

  async function loadProposal () {
    const result = await getProposal(proposal.contract, proposal.id);
    setProposalInfo(result);
  }

  return !proposalInfo
    ? <SkeletonProposalsLoading />
    : (
      <ProposalLink
        to={{
          pathname: `/governance/proposal/${proposal.contract}/${proposal.id}`,
          state: { from: 'list' },
        }}
      >
        <ListCardWrp>
          <ListCardHeader>
            <p>Proposal ID: {proposal.id}</p>

            {proposalInfo?.status && (
              <p className={`list-card__status ${proposalInfo?.status?.toLowerCase()}`}>{proposalInfo?.status}</p>
            )}
          </ListCardHeader>

          <h1 className="card__title" title={proposalInfo.title}>
            {proposalInfo.title}
          </h1>

          <ListCardBody>
            <ProposalContent proposal={proposalInfo} />
          </ListCardBody>
        </ListCardWrp>
      </ProposalLink>
    );
}

export default ListCard;
