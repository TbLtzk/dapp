import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import MultiStepModal from 'components/Base/MultiStepModal';

import useMetamaskReset from 'hooks/useMetamaskReset';
import useMultiStepForm from 'hooks/useMultiStepForm';

import AuctionStep from './components/AuctionStep';
import ConfirmStep from './components/ConfirmStep';

import { createAuction } from 'store/auctions/action-creators';

import { getEPDRUint } from 'contracts/helpers/epdr-param-helper';

import formTypes from 'constants/form-types';
import { AUCTIONS_TYPES } from 'constants/statuses';

const DEFAULT_VALUES = {
  bid: ''
};

const LocalStateContext = createContext();

function DebtAuctionModal ({ modalOpen, onHide }) {
  const dispatch = useDispatch();

  const { values, stepIndex, goNext, goBack, confirm, reset } = useMultiStepForm({
    initialValues: DEFAULT_VALUES,
    onConfirm: (values) => {
      dispatch(createAuction({
        ...values,
        contract: AUCTIONS_TYPES.systemDebt
      }));
    },
  });

  const [reserveLot, setReserveLot] = useState('0');

  useEffect(() => {
    getEPDRUint('governed.EPDR.reserveLot', setReserveLot);
  }, []);

  const handleHide = () => {
    reset();
    onHide();
  };

  useMetamaskReset(formTypes.debtAuction, handleHide);

  return (
    <LocalStateContext.Provider value={{ values, goNext, goBack, confirm }}>
      <MultiStepModal
        stepIndex={stepIndex}
        modalOpen={modalOpen}
        title="Create System Debt Auction"
        onHide={handleHide}
      >
        <AuctionStep reserveLot={reserveLot} />
        <ConfirmStep reserveLot={reserveLot} />
      </MultiStepModal>
    </LocalStateContext.Provider>
  );
}

/**
 *
 * @returns {{
 *  values: typeof DEFAULT_VALUES,
 *  goNext: (form: typeof DEFAULT_VALUES) => void,
 *  goBack: () => void,
 *  confirm: (form: typeof DEFAULT_VALUES) => void,
 * }}
 */
export const useDebtAuction = () => useContext(LocalStateContext);

export default DebtAuctionModal;
