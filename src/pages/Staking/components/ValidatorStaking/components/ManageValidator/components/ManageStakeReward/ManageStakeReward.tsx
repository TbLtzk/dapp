import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { media, Tip } from '@q-dev/q-ui-kit';
import { useWeb3Context } from 'context/Web3ContextProvider';
import styled from 'styled-components';

import DelegatorShareForm from './components/DelegatorShare';
import RewardStats from './components/RewardStats';
import RefreshDelegationUpdate from './components/ValidatorAllocation';
import ValidatorPool from './components/ValidatorPool';

import { useValidationRewards } from 'store/validation-rewards/hooks';
import { useValidators } from 'store/validators/hooks';

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
  const { isConnected } = useWeb3Context();

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
    if (isValidator && compoundRateKeeperExists) {
      getVRPPoolInfo();
      getVRPBalance();
      getVRPLastUpdateOfCompoundRate();
    }
  }, [isValidator, compoundRateKeeperExists]);

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
    isConnected && !isValidator
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
