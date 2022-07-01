import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'ui/Modal';

import Tooltip from 'components/Base/Tooltip';

import DelegatorShareForm from '../DelegatorShareForm';
import RewardStats from '../RewardStats';
import ValidatorPool from '../ValidatorPool';

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
import { compoundRateKeeperExistsSelector } from 'store/validators/selectors';
import Button from 'ui/Button';

function StakerRewardPool () {
  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);
  const compoundRateKeeperExists = useSelector(compoundRateKeeperExistsSelector);

  const [modalOpen, setModalOpen] = useState(false);

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
        position="left"
        additionalInfo="Only available for Validators"
        disabled={compoundRateKeeperExists}
      >
        <Button onClick={handleModalOpen}>
          Manage Staker Reward Pool
        </Button>
      </Tooltip>

      <Modal
        title="Manage Staker Reward Pool"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <>
          <ValidatorPool />
          <RewardStats />
          <DelegatorShareForm />
        </>
      </Modal>
    </>
  );
}

export default StakerRewardPool;
