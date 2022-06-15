import React, { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';

import MultiStepModal from 'components/Base/MultiStepModal';

import useMetamaskReset from 'hooks/useMetamaskReset';
import useMultiStepForm from 'hooks/useMultiStepForm';

import AuctionStep from './components/AuctionStep';
import ConfirmStep from './components/ConfirmStep';

import { createAuction } from 'store/auctions/action-creators';

import formTypes from 'constants/form-types';
import { AUCTIONS_TYPES } from 'constants/statuses';

const DEFAULT_VALUES = {
  address: '',
  vaultId: '',
  bid: ''
};

const LocalStateContext = createContext();

function LiquidationAuctionModal ({ modalOpen, onHide }) {
  const dispatch = useDispatch();

  const { values, stepIndex, goNext, goBack, confirm, reset } = useMultiStepForm({
    initialValues: DEFAULT_VALUES,
    onConfirm: (values) => {
      dispatch(createAuction({
        ...values,
        contract: AUCTIONS_TYPES.liquidation
      }));
    },
  });

  const handleHide = () => {
    reset();
    onHide();
  };

  useMetamaskReset(formTypes.liquidationAuction, handleHide);

  return (
    <LocalStateContext.Provider value={{ values, goNext, goBack, confirm }}>
      <MultiStepModal
        stepIndex={stepIndex}
        modalOpen={modalOpen}
        title="Create Liquidation Auction"
        onHide={handleHide}
      >
        <AuctionStep />
        <ConfirmStep />
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
export const useLiquidationAuction = () => useContext(LocalStateContext);

export default LiquidationAuctionModal;
