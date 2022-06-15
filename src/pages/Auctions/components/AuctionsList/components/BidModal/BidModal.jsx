import React, { createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MultiStepModal from 'components/Base/MultiStepModal';

import useMetamaskReset from 'hooks/useMetamaskReset';
import useMultiStepForm from 'hooks/useMultiStepForm';

import BidStep from './components/BidStep';
import ConfirmStep from './components/ConfirmStep';

import { bidForAuction } from 'store/auctions/action-creators';
import { symbol as symbolSelector } from 'store/stable-coin/selectors';

import formTypes from 'constants/form-types';
import { AUCTIONS_TYPES } from 'constants/statuses';

const DEFAULT_VALUES = {
  bid: '',
};

const LocalStateContext = createContext();

function BidModal ({ modalOpen, type, auction, onHide }) {
  const dispatch = useDispatch();
  const stableCoinSymbol = useSelector(symbolSelector);

  const { values, stepIndex, goNext, goBack, confirm, reset } = useMultiStepForm({
    initialValues: DEFAULT_VALUES,
    onConfirm: (values) => {
      dispatch(
        bidForAuction({
          ...values,
          contract: auction.contract,
          user: auction.user,
          id: auction.id,
        })
      );
    },
  });

  const handleHide = () => {
    reset();
    onHide();
  };

  useMetamaskReset(formTypes.bid, handleHide);

  const modalTitle = `Bid for ${type.replace(/-/g, ' ')} auction`;
  const symbol = type === AUCTIONS_TYPES.systemSurplus
    ? 'Q'
    : stableCoinSymbol;

  return (
    <LocalStateContext.Provider value={{ values, goNext, goBack, confirm }}>
      <MultiStepModal
        stepIndex={stepIndex}
        modalOpen={modalOpen}
        title={modalTitle}
        onHide={handleHide}
      >
        <BidStep
          type={type}
          symbol={symbol}
          auction={auction}
        />
        <ConfirmStep type={type} symbol={symbol} />
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
export const useBid = () => useContext(LocalStateContext);

export default BidModal;
