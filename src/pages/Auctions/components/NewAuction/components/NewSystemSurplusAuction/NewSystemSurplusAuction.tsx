import { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, useHistory } from 'react-router';

import { useMultiStepForm } from '@q-dev/form-hooks';
import { CreateAuction } from 'typings/auctions';
import { StablecoinAsset } from 'typings/defi';

import MultiStepForm from 'components/MultiStepForm';

import ConfirmationStep from './components/ConfirmationStep';
import ProvideInfoStep from './components/ProvideInfoStep';

import { useAuctions } from 'store/auctions/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { RoutePaths } from 'constants/routes';

const DEFAULT_VALUES: CreateAuction = {
  asset: '' as StablecoinAsset,
  bid: '',
};

const NewSystemSurplusAuctionContext = createContext(
  {} as ReturnType<typeof useMultiStepForm<typeof DEFAULT_VALUES>>
);

function NewSystemSurplusAuction () {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { createAuction } = useAuctions();
  const history = useHistory();

  const form = useMultiStepForm({
    initialValues: DEFAULT_VALUES,
    onConfirm: (form) => {
      submitTransaction({
        successMessage: t('CREATE_SYSTEM_SURPLUS_AUCTION_TX'),
        submitFn: () => createAuction({ auctionType: 'systemSurplus', form }),
        onSuccess: () => history.push(
          generatePath(RoutePaths.systemSurplus, { asset: form.asset })
        ),
      });
    },
  });

  const [surplusLot, setSurplusLot] = useState<string | number>(0);

  const steps = [
    {
      id: 'type',
      name: t('AUCTION_TYPE'),
      title: t('CREATE_SYSTEM_SURPLUS_AUCTION'),
      children: <ProvideInfoStep surplusLot={surplusLot} setSurplusLot={setSurplusLot} />
    },
    {
      id: 'confirm',
      name: t('CONFIRMATION'),
      title: t('CONFIRMATION'),
      tip: t('CHECK_THE_DATA_AND_SUBMIT_YOUR_AUCTION'),
      children: <ConfirmationStep surplusLot={surplusLot} />
    }
  ];

  return (
    <NewSystemSurplusAuctionContext.Provider value={form}>
      <MultiStepForm stepIndex={form.stepIndex} steps={steps} />
    </NewSystemSurplusAuctionContext.Provider>

  );
}

export const useSystemSurplusAuctionForm = () => useContext(NewSystemSurplusAuctionContext);

export default NewSystemSurplusAuction;
