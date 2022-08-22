import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { media } from 'styles/media';

import Tip from 'ui/Tip';

import DelegatorShareForm from './components/DelegatorShare';
import RewardStats from './components/RewardStats';
import RefreshDelegationUpdate from './components/ValidatorAllocation';
import ValidatorPool from './components/ValidatorPool';

import { loadTypeSelector } from 'store/user-inf/selectors';
import {
  getVRPBalance,
  getVRPDelegatorsShare,
  getVRPLastUpdateOfCompoundRate,
  getVRPPoolInfo,
} from 'store/validation-reward-pools/action-creators';
import {
  getCompoundRateKeeperExists,
  getIsUserValidator,
  getValidatorAccountableSelfStake,
  getValidatorAccountableTotalStake,
  getValidatorDelegatedStake,
  getValidatorTotalStake,
} from 'store/validators/action-creators';
import { compoundRateKeeperExistsSelector, isUserValidatorSelector } from 'store/validators/selectors';

import { LOAD_TYPES } from 'constants/statuses';

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 10px;
  ${media.lessThan('medium')} {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

function ManageStakeReward () {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isCompoundRateExist = useSelector(compoundRateKeeperExistsSelector);
  const isUserValidator = useSelector(isUserValidatorSelector);
  const loadType = useSelector(loadTypeSelector);

  useEffect(() => {
    if (isUserValidator && isCompoundRateExist) {
      dispatch(getVRPPoolInfo());
      dispatch(getVRPBalance());
      dispatch(getVRPLastUpdateOfCompoundRate());
    }
  }, [isUserValidator, isCompoundRateExist]);

  useEffect(() => {
    dispatch(getCompoundRateKeeperExists());
    dispatch(getIsUserValidator());
    dispatch(getVRPDelegatorsShare());
    dispatch(getValidatorTotalStake());
    dispatch(getValidatorDelegatedStake());
    dispatch(getValidatorAccountableTotalStake());
    dispatch(getValidatorAccountableSelfStake());
  }, [dispatch]);

  const tip =
    loadType === LOAD_TYPES.loaded && !isUserValidator
      ? (
        <Tip type="warning">{t('NOTICE_YOU_ARE_NOT_A_VALIDATOR')}</Tip>
      )
      : null;

  return (
    <>
      {tip}
      <StyledWrapper>
        <ValidatorPool />
        <RewardStats />
        <DelegatorShareForm />
        <RefreshDelegationUpdate />
      </StyledWrapper>
    </>
  );
}

export default ManageStakeReward;
