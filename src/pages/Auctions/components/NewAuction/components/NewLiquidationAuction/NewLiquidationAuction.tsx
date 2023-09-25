import { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, useHistory } from 'react-router';

import { useMultiStepForm } from '@q-dev/form-hooks';
import { CreateLiquidationAuction } from 'typings/auctions';
import { StablecoinAsset } from 'typings/defi';

import MultiStepForm from 'components/MultiStepForm';

import ConfirmationStep from './components/ConfirmationStep';
import ProvideInfoStep from './components/ProvideInfoStep';

import { useAuctions } from 'store/auctions/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { RoutePaths } from 'constants/routes';

const DEFAULT_VALUES: CreateLiquidationAuction = {
  asset: '' as StablecoinAsset,
  vaultOwner: '',
  vaultId: '',
  bid: '',
};

const NewLiquidationAuctionContext = createContext(
  {} as ReturnType<typeof useMultiStepForm<typeof DEFAULT_VALUES>>
);

function NewLiquidationAuction () {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { createAuction } = useAuctions();
  const history = useHistory();

  const form = useMultiStepForm({
    initialValues: DEFAULT_VALUES,
    onConfirm: (form) => {
      submitTransaction({
        successMessage: t('CREATE_LIQUIDATION_AUCTION_TX'),
        submitFn: () => createAuction({ auctionType: 'liquidation', form }),
        onSuccess: () => history.push(
          generatePath(RoutePaths.liquidation, { asset: form.asset })
        )
      });
    },
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
