import { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router';

import PageWrap from 'components/Base/PageWrap';
import SkeletonProposalsLoading from 'components/Base/SkeletonLoading';

import ProposalCard from './components/ProposalCard';

import { getProposal, getProposalTypeByContract } from 'contracts/helpers/voting-helpers/base-voting-helper';

import { ContractName } from 'constants/contracts';
import { ProposalType } from 'constants/statuses';

function Proposal ({ match }: RouteComponentProps<{
  id: string,
  contract: ContractName
}>) {
  const history = useHistory();
  const [proposal, setProposal] = useState(null);
  const type = getProposalTypeByContract(match.params.contract) as ProposalType;

  useEffect(() => {
    loadProposal();
  }, []);

  async function loadProposal () {
    const data = await getProposal(match.params.contract, match.params.id, true);
    if (data?.error) {
      history.replace('/not-found');
      return;
    }

    setProposal(data);
  }

  const titleMap: Record<ProposalType, string> = {
    q: 'Q Proposal',
    rootNode: 'Root Node Proposal',
    expert: 'Expert Proposal',
    slashing: 'Slashing Proposal',
    contractUpdate: 'Contract Update Proposal',
  };

  return (
    <PageWrap headerTitle={titleMap[type]}>
      {proposal
        ? <ProposalCard type={type} proposal={proposal} />
        : <SkeletonProposalsLoading />
      }
    </PageWrap>
  );
}

export default Proposal;
