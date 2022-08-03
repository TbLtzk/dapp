import { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { CreateLiquidationAuction } from 'typings/auctions';

import MultiStepForm from 'components/MultiStepForm';

import useMetamaskReset from 'hooks/useMetamaskReset';
import useMultiStepForm from 'hooks/useMultiStepForm';

import ConfirmationStep from './components/ConfirmationStep';
import ProvideInfoStep from './components/ProvideInfoStep';

import { createAuction } from 'store/auctions/actions';

import { AUCTIONS_TYPES } from 'contracts/helpers/auction';

import { RoutePaths } from 'constants/routes';

const DEFAULT_VALUES:CreateLiquidationAuction = {
  vaultOwner: '',
  vaultId: '',
  bid: '',
};

const NewLiquidationAuctionContext = createContext(
  {} as ReturnType<typeof useMultiStepForm<typeof DEFAULT_VALUES>>
);

function NewLiquidationAuction () {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const history = useHistory();

  const form = useMultiStepForm({
    initialValues: DEFAULT_VALUES,
    onConfirm: (values) => {
      dispatch(createAuction('liquidation', values, t('CREATE_LIQUDATION_AUCTION_SUCCESS')));
    },
  });

  useMetamaskReset(AUCTIONS_TYPES.liquidation, () => {
    history.push(RoutePaths.liquidation);
  });

  const steps = [
    {
      id: 'type',
      name: t('AUCTION_TYPE'),
      title: t('CREATE_LIQUIDATION_AUCTION'),
      children: <ProvideInfoStep />
    },
    {
      id: 'confirm',
      name: t('CONFIRMATION'),
      title: t('CONFIRMATION'),
      tip: t('CHECK_THE_DATA_AND_SUBMIT_YOUR_AUCTION'),
      children: <ConfirmationStep />
    }
  ];

  return (
    <NewLiquidationAuctionContext.Provider value={form}>
      <MultiStepForm stepIndex={form.stepIndex} steps={steps} />
    </NewLiquidationAuctionContext.Provider>

  );
}

export const useLiquidationAuctionForm = () => useContext(NewLiquidationAuctionContext);

export default NewLiquidationAuction;
