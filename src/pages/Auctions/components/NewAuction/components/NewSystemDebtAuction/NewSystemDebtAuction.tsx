import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { CreateAuction } from 'typings/auctions';

import MultiStepForm from 'components/MultiStepForm';

import useMetamaskReset from 'hooks/useMetamaskReset';
import useMultiStepForm from 'hooks/useMultiStepForm';

import ConfirmationStep from './components/ConfirmationStep';
import ProvideInfoStep from './components/ProvideInfoStep';

import { createAuction } from 'store/auctions/actions';

import { AUCTIONS_TYPES } from 'contracts/helpers/auction';
import { getEPDRUint } from 'contracts/helpers/epdr-param-helper';

import { RoutePaths } from 'constants/routes';

const DEFAULT_VALUES:CreateAuction = {
  bid: '',
};

const NewSystemDebtAuctionContext = createContext(
  {} as ReturnType<typeof useMultiStepForm<typeof DEFAULT_VALUES>>
);

function NewSystemDebtAuction () {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const form = useMultiStepForm({
    initialValues: DEFAULT_VALUES,
    onConfirm: (values) => {
      dispatch(createAuction('systemDebt', values, t('CREATE_SYSTEM_DEBT_AUCTION_SUCCESS')));
    },
  });

  const [reserveLot, setReserveLot] = useState<string | number>(0);

  useEffect(() => {
    getEPDRUint('governed.EPDR.reserveLot').then((value) => setReserveLot(value));

    return () => setReserveLot(0);
  }, []);

  useMetamaskReset(AUCTIONS_TYPES.systemDebt, () => {
    history.push(RoutePaths.systemDebt);
  });

  const steps = [
    {
      id: 'type',
      name: t('AUCTION_TYPE'),
      title: t('CREATE_SYSTEM_DEBT_AUCTION'),
      children: <ProvideInfoStep reserveLot={reserveLot}/>
    },
    {
      id: 'confirm',
      name: t('CONFIRMATION'),
      title: t('CONFIRMATION'),
      tip: t('CHECK_THE_DATA_AND_SUBMIT_YOUR_AUCTION'),
      children: <ConfirmationStep reserveLot={reserveLot}/>
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
