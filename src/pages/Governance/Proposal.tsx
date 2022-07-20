import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';

import { ProposalContractType } from 'typings/contracts';
import { Proposal as ProposalInterface, ProposalType } from 'typings/proposals';
import Button from 'ui/Button';
import Icon from 'ui/Icon';

import useInterval from 'hooks/useInterval';

import ProposalLayout from './components/ProposalLayout';
import ProposalSkeleton from './components/Proposals/components/ProposalSkeleton';

import { transactionLoadingSelector } from 'store/transaction-handler/selectors';

import { getProposal, getProposalTypeByContract } from 'contracts/helpers/voting';

function Proposal ({ match }: RouteComponentProps<{
  id: string,
  contract: ProposalContractType
}>) {
  const history = useHistory();
  const transactionLoading = useSelector(transactionLoadingSelector);

  const [proposal, setProposal] = useState<ProposalInterface |null>(null);
  const type = getProposalTypeByContract(match.params.contract);

  useInterval(loadProposal, 60_000);
  useEffect(() => {
    if (!transactionLoading) {
      loadProposal();
    }
  }, [transactionLoading]);

  async function loadProposal () {
    const proposal = await getProposal(match.params.contract, match.params.id);
    if (!proposal) {
      history.replace('/not-found');
      return;
    }

    setProposal(proposal);
  }

  const handleBackClick = () => {
    const location = history.location as { state?: { from: string } };
    if (location.state?.from === 'list') {
      history.goBack();
      return;
    }

    history.replace('/governance');
  };

  const backTextMap: Record<ProposalType, string> = {
    q: 'Q Proposals',
    rootNode: 'Root Node Panel',
    expert: 'Expert Proposals',
    slashing: 'Slashing Proposals',
    contractUpdate: 'Contract Updates',
  };

  return (
    <div className="proposal">
      <Button
        alwaysEnabled
        look="ghost"
        style={{ marginBottom: '24px' }}
        onClick={handleBackClick}
      >
        <Icon name="arrow-left" />
        <span>{backTextMap[type]}</span>
      </Button>

      {proposal
        ? <ProposalLayout type={type} proposal={proposal} />
        : <ProposalSkeleton />
      }
    </div>
  );
}

export default Proposal;
