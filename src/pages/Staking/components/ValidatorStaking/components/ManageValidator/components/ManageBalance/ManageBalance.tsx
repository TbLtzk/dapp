import { useEffect } from 'react';

import styled from 'styled-components';
import { media } from 'styles/media';

import ValidatorCharts from '../../../ValidatorCharts';

import StakingInfo from './components/StakingInfo';
import ValidatorInfo from './components/ValidatorInfo';

import { useParameters } from 'store/parameters/hooks';
import { useUser } from 'store/user/hooks';
import { useValidationRewards } from 'store/validation-rewards/hooks';
import { useValidators } from 'store/validators/hooks';

import { LOAD_TYPES } from 'constants/statuses';

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
  const { loadType } = useUser();
  const { delegatorsShare, getVRPDelegatorsShare } = useValidationRewards();
  const { getConstitutionParameters } = useParameters();

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
  loadType !== LOAD_TYPES.loaded
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
