import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Modal from 'ui/Modal';

import LoadingSpinner from 'components/Base/LoadingSpinner';
import { WrapSpinner } from 'pages/styles';

import DepositForm from './components/DepositForm';
import SavingDetails from './components/SavingDetails';
import WithdrawForm from './components/WithdrawForm';
import { SaveManageWrapper } from './styles';

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
      <Modal
        open={modalOpen}
        title={`Saving ${depositAsset}`}
        width={560}
        onClose={() => setModalOpen(false)}
      >
        {!savingAviableToDeposit && !savingAllowance
          ? (
            <WrapSpinner>
              <LoadingSpinner />
            </WrapSpinner>
          )
          : (
            <SaveManageWrapper>
              <SavingDetails
                depositAsset={depositAsset}
                interestAsset={interestAsset}
              />
              <div className="saving-forms">
                <DepositForm asset={depositAsset} />
                <WithdrawForm asset={interestAsset} />
              </div>
            </SaveManageWrapper>
          )
        }
      </Modal>
    </>
  );
}

export default SaveManageAsset;
