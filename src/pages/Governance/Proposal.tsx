import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import PageWrap from 'components/Base/PageWrap';
import SkeletonProposalsLoading from 'components/Base/SkeletonLoading';

import ProposalCard from './components/ProposalCard';

import { transactionLoadingSelector } from 'store/transaction-handler/selectors';

import { getProposal } from 'contracts/helpers/voting-helpers/base-voting-helper';

import { ContractName, CONTRACTS_NAMES } from 'constants/contracts';
import { ProposalType } from 'constants/statuses';

function Proposal ({ match }: RouteComponentProps<{
  id: string,
  contract: ContractName
}>) {
  const transactionLoading = useSelector(transactionLoadingSelector);

  const [proposal, setProposal] = useState(null);
  const [error, setError] = useState(false);
  const type = checkActiveTabByContract(match.params.contract);

  useEffect(() => {
    if (type === 'error') {
      setError(true);
    } else if (!transactionLoading) {
      handleGetProposal();
    }
  }, [transactionLoading, type]);

  async function handleGetProposal () {
    const data = await getProposal(match.params.contract, match.params.id, true);
    if (data?.error) {
      setError(true);
    } else {
      setProposal(data);
    }
  }

  function checkActiveTabByContract (contract: ContractName): ProposalType | 'error' {
    switch (contract) {
      case CONTRACTS_NAMES.constitutionVoting:
      case CONTRACTS_NAMES.emergencyUpdateVoting:
      case CONTRACTS_NAMES.generalUpdateVoting:
        return 'q';
      case CONTRACTS_NAMES.rootsVoting:
        return 'rootNode';
      case CONTRACTS_NAMES.ePQFIMembershipVoting:
      case CONTRACTS_NAMES.ePDRMembershipVoting:
      case CONTRACTS_NAMES.ePQFIParametersVoting:
      case CONTRACTS_NAMES.ePDRParametersVoting:
      case CONTRACTS_NAMES.ePRSMembershipVoting:
      case CONTRACTS_NAMES.ePRSParametersVoting:
        return 'expert';
      case CONTRACTS_NAMES.rootNodesSlashingVoting:
      case CONTRACTS_NAMES.validatorsSlashingVoting:
        return 'slashing';
      case CONTRACTS_NAMES.upgradeVoting:
      case CONTRACTS_NAMES.addressVoting:
        return 'contractUpdate';
      default:
        return 'error';
    }
  }

  return (
    <PageWrap headerTitle={type.replace(/-/g, ' ')}>
      {error || type === 'error'
        ? <p>Wrong link</p>
        : proposal
          ? <ProposalCard type={type} proposal={proposal} />
          : <SkeletonProposalsLoading />
      }
    </PageWrap>
  );
}

export default Proposal;
