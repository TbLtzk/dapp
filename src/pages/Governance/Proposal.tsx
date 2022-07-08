import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';

import { ProposalType } from 'typings/proposals';

import Button from 'components/Base/Button';
import PageWrap from 'components/Base/PageWrap';
import SkeletonProposalsLoading from 'components/Base/SkeletonLoading';

import VotingStats from './components/ProposalLayout/components/VotingStats';
import ProposalLayout from './components/ProposalLayout/ProposalLayout';

import { transactionLoadingSelector } from 'store/transaction-handler/selectors';

import { getProposal, getProposalTypeByContract } from 'contracts/helpers/voting-helpers/base-voting-helper';

function Proposal ({ match }: RouteComponentProps<{
  id: string,
  contract: string
}>) {
  const history = useHistory();
  const transactionLoading = useSelector(transactionLoadingSelector);

  const [proposal, setProposal] = useState<any>(null);
  const type = getProposalTypeByContract(match.params.contract) as ProposalType;

  useEffect(() => {
    if (!transactionLoading) {
      loadProposal();
    }
  }, [transactionLoading]);

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
        style={{ marginBottom: '16px', width: 'max-content' }}
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
        <VotingStats />
      </div>
    </PageWrap>
  );
}

export default Proposal;
