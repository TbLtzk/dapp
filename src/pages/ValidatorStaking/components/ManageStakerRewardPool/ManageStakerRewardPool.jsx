import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Buttons/Button';
import ModalWindow from 'components/Base/ModalWindow';
import Tooltip from 'components/Base/Tooltip';

import RewardStats from './components/RewardStats';
import ValidatorPool from './components/ValidatorPool';

import { getCompoundRateKeeperExists } from 'store/validators/action-creators';
import { compoundRateKeeperExistsSelector } from 'store/validators/selectors';

function ManageStakerRewardPool () {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const compoundRateKeeperExists = useSelector(compoundRateKeeperExistsSelector);

  useEffect(() => {
    dispatch(getCompoundRateKeeperExists());
  }, [dispatch]);

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
          handleButton={() => setModalShow(true)}
        />
      </Tooltip>

      <ModalWindow
        show={modalShow}
        modalTitle="Manage Staker Reward Pool"
        content={
          <>
            <div className="modal-line" />
            <ValidatorPool modalShow={modalShow} />
            <div className="modal-line" />
            <RewardStats modalShow={modalShow} />
          </>
        }
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default ManageStakerRewardPool;
