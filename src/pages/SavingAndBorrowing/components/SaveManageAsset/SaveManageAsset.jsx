import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';

import LoadingSpinner from 'components/Base/LoadingSpinner';
import ModalWindow from 'components/Base/ModalWindow';
import { WrapSpinner } from 'pages/styles';

import DepositForm from './components/DepositForm';
import SavingDetails from './components/SavingDetails';
import WithdrawForm from './components/WithdrawForm';

import {
  getSavingAllowance,
  getSavingAviableToDeposit,
  getSavingBalanceDetails,
} from 'store/saving-assets/action-creators';
import {
  savingAllowanceSelector,
  savingAviableToDepositSelector,
} from 'store/saving-assets/selectors';

function SaveManageAsset ({ depositAsset, interestAsset }) {
  const dispatch = useDispatch();

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
        <>
          <SavingDetails
            depositAsset={depositAsset}
            interestAsset={interestAsset}
          />
          <DepositForm asset={depositAsset} />
          <WithdrawForm asset={interestAsset} />
        </>
      );

  return (
    <>
      <Button
        compact
        look="ghost"
        onClick={handleModalOpen}
      >
        <span>Manage</span>
        <i className="mdi mdi-arrow-top-right" />
      </Button>
      <ModalWindow
        show={modalOpen}
        modalTitle={`Saving ${depositAsset}`}
        content={content}
        onHide={() => setModalOpen(false)}
      />
    </>
  );
}

export default SaveManageAsset;
