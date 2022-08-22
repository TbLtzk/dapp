import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { media } from 'styles/media';

import ValidatorCharts from '../../../ValidatorCharts';

import StakingInfo from './components/StakingInfo';
import ValidatorInfo from './components/ValidatorInfo';

import { loadTypeSelector } from 'store/user-inf/selectors';
import { getVRPDelegatorsShare } from 'store/validation-reward-pools/action-creators';
import { delegatorsShareSelector, validatorShareSelector } from 'store/validation-reward-pools/selectors';
import {
  getValidatorAccountableSelfStake,
  getValidatorAccountableTotalStake,
  getValidatorDelegatedStake,
  getValidatorTotalStake,
  getValidatorWithdrawalInfo,
} from 'store/validators/action-creators';
import { validatorAccountableSelfStakeSelector, validatorDelegatedStakeSelector } from 'store/validators/selectors';

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
  const dispatch = useDispatch();
  const loadType = useSelector(loadTypeSelector);

  const delegatorShare = useSelector(delegatorsShareSelector);
  const validatorShare = useSelector(validatorShareSelector);
  const selfStake = useSelector(validatorAccountableSelfStakeSelector);
  const delegatedStake = useSelector(validatorDelegatedStakeSelector);

  const chartsData =
  loadType !== LOAD_TYPES.loaded
    ? { validatorShare: '0', delegatorShare: '0', selfStake: '0', delegatedStake: '0' }
    : { validatorShare, delegatorShare, selfStake, delegatedStake };

  useEffect(() => {
    dispatch(getVRPDelegatorsShare());
    dispatch(getValidatorWithdrawalInfo());
    dispatch(getValidatorTotalStake());
    dispatch(getValidatorDelegatedStake());
    dispatch(getValidatorAccountableTotalStake());
    dispatch(getValidatorAccountableSelfStake());
  }, [dispatch]);

  return (
    <StyledWrapper>
      <ValidatorInfo />
      <StakingInfo />
      <ValidatorCharts {...chartsData} />
    </StyledWrapper>
  );
}

export default ManageBalance;
