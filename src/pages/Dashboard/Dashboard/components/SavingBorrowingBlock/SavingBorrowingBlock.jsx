import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock';
import ExplorerAddress from 'components/Custom/ExplorerAddress';

import useAnimateNumber from 'hooks/useAnimateNumber';

import SavingBorrowingUpdate from './SavingBorrowingUpdate';

import { getSavingAndInterestRate, getTotalSupply } from 'store/borrowing-core/action-creators';
import { interestRateSelector, savingRateSelector, totalSupplySelector } from 'store/borrowing-core/selectors';
import { getSystemBalance } from 'store/system-balance/action-creators';
import { systemBalanceSB } from 'store/system-balance/selectors';

import { getStableCoinInstance } from 'contracts/contract-instance';

function SavingBorrowingBlock () {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const interestRate = useSelector(interestRateSelector);
  const interestRateRef = useAnimateNumber(interestRate, ' %');

  const savingRate = useSelector(savingRateSelector);
  const savingRateRef = useAnimateNumber(savingRate, ' %');

  const systemBalance = useSelector(systemBalanceSB);
  const systemBalanceRef = useAnimateNumber(systemBalance, ' QUSD');

  const totalSupply = useSelector(totalSupplySelector);
  const totalSupplyRef = useAnimateNumber(totalSupply, ' QUSD');

  const [stableCoinAddress, setStableCoinAddress] = useState('0x0000');

  useEffect(() => {
    getStableCoinInstance().then((contract) => setStableCoinAddress(contract.address));

    dispatch(getSavingAndInterestRate());
    dispatch(getSystemBalance());
    dispatch(getTotalSupply());

    return () => setStableCoinAddress('...');
  }, []);

  const savingAndBorrowingInfo = [
    {
      id: 'qusd-contract',
      title: t('QUSD_CONTRACT'),
      content: <ExplorerAddress address={stableCoinAddress} />,
    },
    {
      id: 'saving-reward',
      title: t('QUSD_SAVING_REWARD'),
      content: <p ref={savingRateRef}>0 %</p>,
    },
    {
      id: 'borrowing-fee',
      title: t('QUSD_QBTC_BORROWING_FEE'),
      content: <p ref={interestRateRef}>0 %</p>,
    },
    {
      id: 'system-balance',
      title: t('QUSD_SYSTEM_BALANCE'),
      content: <p ref={systemBalanceRef}>0 QUSD</p>,
    },
    {
      id: 'total-supply',
      title: t('QUSD_TOTAL_SUPPLY'),
      content: <p ref={totalSupplyRef}>0 QUSD</p>,
    },
    {
      id: 'savingBorrowingUpdate',
      component: <SavingBorrowingUpdate />,
    },
  ];

  return (
    <CustomBlock>
      <h1>Saving & Borrowing</h1>
      {savingAndBorrowingInfo.map((item) => (
        <Fragment key={item.id}>
          {item.component
            ? (
              item.component
            )
            : (
              <div className="card_block">
                <div>
                  <h5>{item.title}</h5>
                  <div className="card_text">{item.content}</div>
                </div>
                <div></div>
              </div>
            )}
        </Fragment>
      ))}
    </CustomBlock>
  );
}

export default SavingBorrowingBlock;
