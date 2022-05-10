import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Buttons/Button';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import ModalWindow from 'components/Base/ModalWindow';
import { WrapSpinner } from 'pages/styles';

import SaveAsset from './components/SaveAsset';

import {
  getSavingAllowance,
  getSavingAviableToDeposit,
  getSavingBalanceDetails,
} from 'store/saving-assets/action-creators';
import {
  savingAllowanceSelector,
  savingAviableToDepositSelector,
  savingBalanceDetailsSelector,
} from 'store/saving-assets/selectors';

function SaveManageAsset (props) {
  const { depositAsset } = props;
  const dispatch = useDispatch();

  const savingBalanceDetails = useSelector(savingBalanceDetailsSelector);
  const savingAviableToDeposit = useSelector(savingAviableToDepositSelector);
  const savingAllowance = useSelector(savingAllowanceSelector);

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
    dispatch(getSavingAllowance());
    dispatch(getSavingBalanceDetails());
    dispatch(getSavingAviableToDeposit());
  };

  const content =
    !savingAviableToDeposit && !savingAllowance
      ? (
        <WrapSpinner>
          <LoadingSpinner />
        </WrapSpinner>
      )
      : (
        <SaveAsset
          {...props}
          savingBalanceDetails={savingBalanceDetails}
          savingAviableToDeposit={savingAviableToDeposit}
          savingAllowance={savingAllowance}
        />
      );

  return (
    <>
      <Button
        isIconPositionRight
        icon="arrow-top-right"
        title="Manage"
        type="transparent"
        handleButton={handleModalOpen}
      />
      <ModalWindow
        show={modalOpen}
        modalTitle={'Saving ' + depositAsset}
        content={content}
        onHide={() => setModalOpen(false)}
      />
    </>
  );
}

export default SaveManageAsset;
