import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import InfoTooltip from 'components/Tooltips/InfoTooltip';

import useAnimateNumber from 'hooks/useAnimateNumber';

import InterestRates from './InterestRates';
import UpdateBorrowDebt from './UpdateBorrowDebt';
import SavingBorrowingUpdate from './UpdateSavingBalance';

import { getInterestRates, getSavingRate } from 'store/borrowing-core/actions';
import { interestRatesSelector, savingRateSelector } from 'store/borrowing-core/selectors';
import { getStableCoinTotalSupply, getSystemBalance } from 'store/system-balance/action-creators';
import { stableCoinTotalSupplySelector, systemBalanceSelector } from 'store/system-balance/selectors';

import { getStableCoinInstance } from 'contracts/contract-instance';

import { BorrowAssets } from 'constants/defiTypes';

function SavingBorrowingBlock () {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const interestRates = useSelector(interestRatesSelector);

  const savingRate = useSelector(savingRateSelector);
  const savingRateRef = useAnimateNumber(savingRate, ' %');

  const systemBalance = useSelector(systemBalanceSelector);
  const systemBalanceRef = useAnimateNumber(systemBalance, ' QUSD');

  const totalSupply = useSelector(stableCoinTotalSupplySelector);
  const totalSupplyRef = useAnimateNumber(totalSupply, ' QUSD');

  const [stableCoinAddress, setStableCoinAddress] = useState('0x0000');

  useEffect(() => {
    getStableCoinInstance().then((contract) => setStableCoinAddress(contract.address));

    dispatch(getSavingRate());
    dispatch(getSystemBalance());
    dispatch(getStableCoinTotalSupply());
    dispatch(getInterestRates());
    return () => setStableCoinAddress('...');
  }, []);

  const savingAndBorrowingInfo = [
    {
      id: 'qusd-contract',
      title: t('QUSD_CONTRACT'),
      content: <ExplorerAddress semibold address={stableCoinAddress} />,
    },
    {
      id: 'saving-reward',
      title: t('QUSD_SAVING_REWARD'),
      content: <p ref={savingRateRef} className="text-lg font-semibold">0 %</p>,
    },
    {
      id: 'system-balance',
      title: t('QUSD_SYSTEM_BALANCE'),
      content: <p ref={systemBalanceRef} className="text-lg font-semibold">0 QUSD</p>,
    },
    {
      id: 'total-supply',
      title: t('QUSD_TOTAL_SUPPLY'),
      content: <p ref={totalSupplyRef} className="text-lg font-semibold">0 QUSD</p>,
    },
    {
      id: 'savingBorrowingUpdate',
      component: <SavingBorrowingUpdate />,
    },
  ];

  return (
    <div className="block">
      <h2 className="text-h3">
        <span>{t('SAVING_BORROWING')}</span>
        <InfoTooltip topic="saving-borrowing" />
      </h2>

      <div className="block__tight-content">
        {savingAndBorrowingInfo.map((item) => (
          <Fragment key={item.id}>
            {item.component || (
              <div>
                <p className="text-sm color-secondary">{item.title}</p>
                <div>{item.content}</div>
              </div>
            )}
          </Fragment>
        ))}
        {interestRates.map(interestRate => <InterestRates key={interestRate.asset} interestRate={interestRate}/>)}
        {Object.values(BorrowAssets).map(asset => (
          <UpdateBorrowDebt key={asset} asset={asset}/>
        ))}
      </div>
    </div>
  );
}

export default SavingBorrowingBlock;
