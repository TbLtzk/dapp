import { createContext, useContext, useEffect, useState } from 'react';
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

import { getEPDRUint } from 'contracts/helpers/epdr-param-helper';

import { RoutePaths } from 'constants/routes';

const DEFAULT_VALUES: CreateAuction = {
  asset: '' as StablecoinAsset,
  bid: '',
};

const NewSystemDebtAuctionContext = createContext(
  {} as ReturnType<typeof useMultiStepForm<typeof DEFAULT_VALUES>>
);

function NewSystemDebtAuction () {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { createAuction } = useAuctions();
  const history = useHistory();

  const form = useMultiStepForm({
    initialValues: DEFAULT_VALUES,
    onConfirm: (form) => {
      submitTransaction({
        successMessage: t('CREATE_SYSTEM_DEBT_AUCTION_TX'),
        submitFn: () => createAuction({ auctionType: 'systemDebt', form }),
        onSuccess: () => history.push(
          generatePath(RoutePaths.systemDebt, { asset: form.asset })
        ),
      });
    },
  });

  const [reserveLot, setReserveLot] = useState<string | number>(0);

  useEffect(() => {
    getEPDRUint('governed.EPDR.reserveLot').then((value) => setReserveLot(value));

    return () => setReserveLot(0);
  }, []);

  const steps = [
    {
      id: 'type',
      name: t('AUCTION_TYPE'),
      title: t('CREATE_SYSTEM_DEBT_AUCTION'),
      children: <ProvideInfoStep reserveLot={reserveLot} />
    },
    {
      id: 'confirm',
      name: t('CONFIRMATION'),
      title: t('CONFIRMATION'),
      tip: t('CHECK_THE_DATA_AND_SUBMIT_YOUR_AUCTION'),
      children: <ConfirmationStep reserveLot={reserveLot} />
    }
  ];

  return (
    <NewSystemDebtAuctionContext.Provider value={form}>
      <MultiStepForm stepIndex={form.stepIndex} steps={steps} />
    </NewSystemDebtAuctionContext.Provider>

  );
}

export const useSystemDebtAuctionForm = () => useContext(NewSystemDebtAuctionContext);

export default NewSystemDebtAuction;
