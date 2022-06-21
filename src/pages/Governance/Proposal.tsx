import { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router';

import Button from 'components/Base/Button';
import PageWrap from 'components/Base/PageWrap';
import SkeletonProposalsLoading from 'components/Base/SkeletonLoading';

import ProposalLayout from './components/ProposalLayout/ProposalLayout';
import VotingStats from './components/VotingStats';

import { getProposal, getProposalTypeByContract } from 'contracts/helpers/voting-helpers/base-voting-helper';

import { ContractName } from 'constants/contracts';
import { ProposalType } from 'constants/statuses';

function Proposal ({ match }: RouteComponentProps<{
  id: string,
  contract: ContractName
}>) {
  const history = useHistory();

  const [proposal, setProposal] = useState<any>(null);
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

  const handleBackClick = () => {
    const location = history.location as { state?: { from: string } };
    if (location.state?.from === 'list') {
      history.goBack();
      return;
    }

    history.replace('/governance');
  };

  const titleMap: Record<ProposalType, string> = {
    q: 'Q Proposal',
    rootNode: 'Root Node Proposal',
    expert: 'Expert Proposal',
    slashing: 'Slashing Proposal',
    contractUpdate: 'Contract Update Proposal',
  };

  return (
    <PageWrap pageHeader={titleMap[type]}>
      <Button
        look="white"
        style={{ marginBottom: '16px' }}
        onClick={handleBackClick}
      >
        <i className="mdi mdi-arrow-left" />
        <span>Back to proposals</span>
      </Button>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '15px',
        }}
      >
        {proposal
          ? <ProposalLayout type={type} proposal={proposal} />
          : <SkeletonProposalsLoading />
        }
        <VotingStats row type={type} />
      </div>
    </PageWrap>
  );
}

export default Proposal;
