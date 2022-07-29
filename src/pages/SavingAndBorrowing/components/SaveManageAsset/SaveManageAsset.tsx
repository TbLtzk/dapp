import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Modal from 'ui/Modal';
import Spinner from 'ui/Spinner';

import { SpinnerWrapper } from 'pages/SavingAndBorrowing/styles';

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

interface Props {
  depositAsset: string;
  interestAsset: string;
}

function SaveManageAsset ({ depositAsset, interestAsset }: Props) {
  const { t } = useTranslation();

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
        <span>{t('MANAGE')}</span>
        <i className="mdi mdi-arrow-top-right" />
      </Button>
      <Modal
        open={modalOpen}
        title={`${t('SAVING')} ${depositAsset}`}
        width={560}
        onClose={() => setModalOpen(false)}
      >
        {!savingAviableToDeposit && !savingAllowance
          ? (
            <SpinnerWrapper>
              <Spinner size={96} />
            </SpinnerWrapper>
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
