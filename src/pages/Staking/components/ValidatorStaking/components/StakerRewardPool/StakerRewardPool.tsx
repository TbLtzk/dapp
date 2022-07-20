import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Modal from 'ui/Modal';
import Tooltip from 'ui/Tooltip';

import DelegatorShareForm from '../DelegatorShareForm';
import RewardStats from '../RewardStats';
import ValidatorPool from '../ValidatorPool';

import { StyledStakerRewardPool } from './styles';

import { userAddressMetamask } from 'store/user-inf/selectors';
import {
  getVRPBalance,
  getVRPDelegatorsShare,
  getVRPLastUpdateOfCompoundRate,
  getVRPPoolInfo,
} from 'store/validation-reward-pools/action-creators';
import {
  getAccountableTotalStake,
  getCompoundRateKeeperExists,
  getDelegatedStake,
  getOwnStake,
  getTotalStake,
} from 'store/validators/action-creators';
import { compoundRateKeeperExistsSelector, isUserValidator } from 'store/validators/selectors';

function StakerRewardPool () {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);
  const isValidator = useSelector(isUserValidator);
  const compoundRateKeeperExists = useSelector(compoundRateKeeperExistsSelector);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getCompoundRateKeeperExists());
  }, [dispatch]);

  const handleModalOpen = () => {
    setModalOpen(true);
    dispatch(getVRPDelegatorsShare(address));
    dispatch(getVRPBalance(address));
    dispatch(getVRPPoolInfo(address));
    dispatch(getTotalStake(address));
    dispatch(getOwnStake(address));
    dispatch(getDelegatedStake(address));
    dispatch(getAccountableTotalStake(address));
    dispatch(getVRPLastUpdateOfCompoundRate());
  };

  return (
    <>
      <Tooltip
        disabled={isValidator}
        trigger={
          <Button
            disabled={!isValidator && !compoundRateKeeperExists}
            onClick={handleModalOpen}
          >
            {t('MANAGE_STAKER_REWARD_POOL')}
          </Button>
        }
      >
        {t('ONLY_AVAILABLE_FOR_VALIDATORS')}
      </Tooltip>

      <Modal
        width={600}
        title={t('MANAGE_STAKER_REWARD_POOL')}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <StyledStakerRewardPool>
          <ValidatorPool />
          <RewardStats />
          <DelegatorShareForm />
        </StyledStakerRewardPool>
      </Modal>
    </>
  );
}

export default StakerRewardPool;
