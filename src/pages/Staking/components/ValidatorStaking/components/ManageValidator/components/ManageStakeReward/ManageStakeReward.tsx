import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { media } from 'styles/media';

import Tip from 'ui/Tip';

import DelegatorShareForm from './components/DelegatorShare';
import RewardStats from './components/RewardStats';
import RefreshDelegationUpdate from './components/ValidatorAllocation';
import ValidatorPool from './components/ValidatorPool';

import { useUser } from 'store/user/hooks';
import { useValidationRewards } from 'store/validation-rewards/hooks';
import { useValidators } from 'store/validators/hooks';

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
  const { t } = useTranslation();
  const { loadType } = useUser();

  const {
    getVRPPoolInfo,
    getVRPBalance,
    getVRPLastUpdateOfCompoundRate,
    getVRPDelegatorsShare
  } = useValidationRewards();

  const {
    compoundRateKeeperExists,
    isValidator,
    loadCompoundRateKeeperExists,
    checkIsValidator,
    loadValidatorTotalStake,
    loadValidatorDelegatedStake,
    loadValidatorAccountableTotalStake,
    loadValidatorAccountableSelfStake,
  } = useValidators();

  useEffect(() => {
    if (compoundRateKeeperExists) {
      getVRPPoolInfo();
      getVRPBalance();
      getVRPLastUpdateOfCompoundRate();
    }
  }, [compoundRateKeeperExists]);

  useEffect(() => {
    loadCompoundRateKeeperExists();
    checkIsValidator();
    getVRPDelegatorsShare();
    loadValidatorTotalStake();
    loadValidatorDelegatedStake();
    loadValidatorAccountableTotalStake();
    loadValidatorAccountableSelfStake();
  }, []);

  const tip =
    loadType === LOAD_TYPES.loaded && !isValidator
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
