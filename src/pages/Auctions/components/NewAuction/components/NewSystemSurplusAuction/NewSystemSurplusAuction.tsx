import { createContext, useContext, useEffect, useState } from 'react';
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

const NewSystemSurplusAuctionContext = createContext(
  {} as ReturnType<typeof useMultiStepForm<typeof DEFAULT_VALUES>>
);

function NewSystemSurplusAuction () {
  const dispatch = useDispatch();
  const history = useHistory();

  const form = useMultiStepForm({
    initialValues: DEFAULT_VALUES,
    onConfirm: (values) => {
      dispatch(createAuction('systemSurplus', values));
    },
  });

  useMetamaskReset(AUCTIONS_TYPES.systemSurplus, () => {
    history.push(RoutePaths.systemSurplus);
  });

  const [surplusLot, setSurplusLot] = useState<string | number>(0);

  useEffect(() => {
    getEPDRUint('governed.EPDR.QUSD_surplusLot').then((value) => setSurplusLot(value));

    return () => setSurplusLot(0);
  }, []);

  const steps = [
    {
      id: 'type',
      name: 'Auction type',
      title: 'Create System Surplus Auction',
      children: <ProvideInfoStep surplusLot={surplusLot}/>
    },
    {
      id: 'confirm',
      name: 'Confirmation',
      title: 'Confirmation',
      tip: 'Check the data and submit your auction',
      children: <ConfirmationStep surplusLot={surplusLot}/>
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
