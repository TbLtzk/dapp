import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Buttons/Button';
import ModalWindow from 'components/Base/ModalWindow';
import Tooltip from 'components/Base/Tooltip';

import RewardStats from './components/RewardStats';
import ValidatorPool from './components/ValidatorPool';

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

function ManageStakerRewardPool () {
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

  const content = (
    <>
      <div className="modal-line" />
      <ValidatorPool />
      <div className="modal-line" />
      <RewardStats />
    </>
  );

  return (
    <>
      <Tooltip
        position="left"
        additionalInfo="Only available for Validators"
        disabled={compoundRateKeeperExists}
      >
        <Button
          disabled={!compoundRateKeeperExists}
          type="white"
          title="Manage Staker Reward Pool"
          handleButton={handleModalOpen}
        />
      </Tooltip>

      <ModalWindow
        show={modalOpen}
        modalTitle="Manage Staker Reward Pool"
        content={content}
        onHide={() => setModalOpen(false)}
      />
    </>
  );
}

export default ManageStakerRewardPool;
