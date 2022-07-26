import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Classification, ProposalStatus } from '@q-dev/q-js-sdk';
import { Proposal } from 'typings/proposals';
import { TagState } from 'ui/Tag';

import { ZERO_ADDRESS } from 'constants/config';

function useProposalDetails (proposal: Proposal | null) {
  const { t } = useTranslation();

  const statusMap: Record<ProposalStatus, string> = {
    [ProposalStatus.ACCEPTED]: t('STATUS_ACCEPTED'),
    [ProposalStatus.EXECUTED]: t('STATUS_EXECUTED'),
    [ProposalStatus.EXPIRED]: t('STATUS_EXPIRED'),
    [ProposalStatus.NONE]: t('STATUS_NONE'),
    [ProposalStatus.PASSED]: t('STATUS_PASSED'),
    [ProposalStatus.PENDING]: t('STATUS_PENDING'),
    [ProposalStatus.REJECTED]: t('STATUS_REJECTED'),
    [ProposalStatus.OBSOLETE]: t('STATUS_OBSOLETE'),
  };

  const getStatusState = (): TagState => {
    switch (proposal?.status) {
      case ProposalStatus.PENDING:
        return 'pending';
      case ProposalStatus.REJECTED:
      case ProposalStatus.EXPIRED:
        return 'rejected';
      default:
        return 'approved';
    }
  };

  const getTitle = () => {
    const classificationMap: Record<Classification, string> = {
      [Classification.BASIC]: t('CLASSIFICATION_BASIC'),
      [Classification.DETAILED]: t('CLASSIFICATION_DETAILED'),
      [Classification.FUNDAMENTAL]: t('CLASSIFICATION_FUNDAMENTAL'),
    };

    switch (proposal?.contract) {
      case 'constitutionVoting':
        return t('CONSTITUTION_PROPOSAL', {
          classification: classificationMap[proposal.classification || Classification.BASIC]
        });
      case 'generalUpdateVoting':
        return t('GENERAL_UPDATE_PROPOSAL');
      case 'emergencyUpdateVoting':
        return t('EMERGENCY_UPDATE_PROPOSAL');
      case 'rootNodesMembershipVoting':
        if (proposal.candidate !== ZERO_ADDRESS && proposal.replaceDest !== ZERO_ADDRESS) {
          return t('ROOT_NODE_SWAPPING_PROPOSAL');
        }

        return proposal.candidate && proposal.replaceDest === ZERO_ADDRESS
          ? t('ROOT_NODE_ADDING_PROPOSAL')
          : t('ROOT_NODE_REMOVING_PROPOSAL');
      case 'eprsMembershipVoting':
        return t('Q_ROOT_NODE_SELECTION_EXPERT_MEMBERSHIP_PROPOSAL');
      case 'epdrMembershipVoting':
        return t('DEFI_RISK_EXPERT_MEMBERSHIP_PROPOSAL');
      case 'epqfiMembershipVoting':
        return t('FEES_&_INCENTIVES_EXPERTS_MEMBERSHIP_PROPOSAL');
      case 'eprsParametersVoting':
        return t('Q_ROOT_NODE_SELECTION_PARAMETERS_PROPOSAL');
      case 'epdrParametersVoting':
        return t('DEFI_RISK_PARAMETERS_PROPOSAL');
      case 'epqfiParametersVoting':
        return t('FEES_INCENTIVES_PARAMETERS_PROPOSAL');
      case 'rootNodesSlashingVoting':
        return t('ROOT_NODE_SLASHING_PROPOSAL');
      case 'validatorsSlashingVoting':
        return t('VALIDATOR_SLASHING_PROPOSAL');
      case 'addressVoting':
        return t('ADDRESS_VOTING_PROPOSAL');
      case 'upgradeVoting':
        return t('UPGRADE_VOTING_PROPOSAL');
      default:
        return t('UNKNOWN_PROPOSAL');
    }
  };

  return {
    title: useMemo(getTitle, [proposal]),
    status: statusMap[proposal?.status || ProposalStatus.NONE],
    state: useMemo(getStatusState, [proposal]),
  };
}

export default useProposalDetails;
