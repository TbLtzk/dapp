import { useEffect } from 'react';

import { media } from '@q-dev/q-ui-kit';
import { useWeb3Context } from 'context/Web3ContextProvider';
import styled from 'styled-components';

import ValidatorCharts from '../../../ValidatorCharts';

import StakingInfo from './components/StakingInfo';
import ValidatorInfo from './components/ValidatorInfo';

import { useConstitution } from 'store/constitution/hooks';
import { useValidationRewards } from 'store/validation-rewards/hooks';
import { useValidators } from 'store/validators/hooks';

const StyledWrapper = styled.div`
  display: grid;
  margin-top: 10px;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'validator-info staking-info'
    'total-stake share';
  gap: 24px;

  .charts {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-areas: 'total-stake share';
    gap: 24px;
  }

  ${media.lessThan('medium')} {
    grid-template-columns: 1fr;
    gap: 16px;

    grid-template-areas:
      'validator-info'
      'staking-info'
      'total-stake'
      'share';
  }
`;

function ManageBalance () {
  const { isConnected } = useWeb3Context();
  const { delegatorsShare, getVRPDelegatorsShare } = useValidationRewards();
  const { getConstitutionParameters } = useConstitution();

  const {
    validatorAccountableSelfStake: selfStake,
    validatorDelegatedStake: delegatedStake,
    loadValidatorWithdrawalInfo,
    loadValidatorTotalStake,
    loadValidatorDelegatedStake,
    loadValidatorAccountableTotalStake,
    loadValidatorAccountableSelfStake,
  } = useValidators();

  const chartsData =
    isConnected
      ? { validatorShare: '0', delegatorsShare: '0', selfStake: '0', delegatedStake: '0' }
      : { validatorShare: 100 - delegatorsShare, delegatorsShare, selfStake, delegatedStake };

  useEffect(() => {
    getVRPDelegatorsShare();
    loadValidatorWithdrawalInfo();
    loadValidatorTotalStake();
    loadValidatorDelegatedStake();
    loadValidatorAccountableTotalStake();
    loadValidatorAccountableSelfStake();
    getConstitutionParameters();
  }, []);

  return (
    <StyledWrapper>
      <ValidatorInfo />
      <StakingInfo />
      <ValidatorCharts {...chartsData} />
    </StyledWrapper>
  );
}

export default ManageBalance;
