import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardBlock from 'components/Base/CardBlock';
import CustomBlock from 'components/Base/CustomBlock';
import LoadingSpinner from 'components/Base/LoadingSpinner';

import { getSavingAndInterestRate, getTotalSupply } from 'store/borrowing-core/action-creators';
import { interestRateSelector, savingRateSelector, totalSupplySelector } from 'store/borrowing-core/selectors';
import { getSystemBalance } from 'store/system-balance/action-creators';
import { systemBalanceSB } from 'store/system-balance/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { getStableCoinInstance } from 'contracts/contract-instance';
import {
  getTimeSinceOutstandingDebt,
  getTimeSinceRefreshBalance,
  refreshTimeSinceOutstandingDebt,
  refreshTimeSinceRefreshBalance
} from 'contracts/helpers/borrowing-core-helper';

import { remainDateTimeSince } from 'func/convertDate';
import { fN } from 'func/useful';

const BTN_TYPES = {
  balance: 'of-balance',
  outstandingDebt: 'of-outstanding-debt'
};

function SavingBorrowingBlock () {
  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);
  const interestRate = useSelector(interestRateSelector);
  const savingRate = useSelector(savingRateSelector);

  const systemBalance = fN(useSelector(systemBalanceSB));
  const totalSupply = useSelector(totalSupplySelector);

  const [stableCoinAddress, setStableCoinAddress] = useState('...');

  const [timeSinceRefreshBalance, setTimeSinceRefreshBalance] = useState('0');
  const [timeSinceUnixTimestampRefreshBalance, setTimeSinceUnixTimestampRefreshBalance] = useState('0');
  const [loadingTimeSinceRefreshBalance, setLoadingTimeSinceRefreshBalance] = useState(false);

  const [timeSinceOutstandingDebt, setTimeSinceOutstandingDebt] = useState('0');
  const [timeSinceUnixTimestampOutstandingDeb, setTimeSinceUnixTimestampOutstandingDeb] = useState('0');
  const [loadingTimeSinceOutstandingDeb, setLoadingTimeSinceOutstandingDeb] = useState(false);
  useEffect(() => {
    dispatch(getSavingAndInterestRate());
    dispatch(getSystemBalance());
    dispatch(getTotalSupply());
    getStableCoinInstance().then((contract) => setStableCoinAddress(contract.address));
    getTimeSinceRefreshBalance(setTimeSinceRefreshBalance, setTimeSinceUnixTimestampRefreshBalance);
    getTimeSinceOutstandingDebt(setTimeSinceOutstandingDebt, setTimeSinceUnixTimestampOutstandingDeb);

    return () => {
      setStableCoinAddress('...');
      setTimeSinceRefreshBalance('0');
      setTimeSinceUnixTimestampRefreshBalance('0');
      setLoadingTimeSinceRefreshBalance(false);
      setTimeSinceOutstandingDebt('0');
      setTimeSinceUnixTimestampOutstandingDeb('0');
      setLoadingTimeSinceOutstandingDeb(false);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSinceRefreshBalance(remainDateTimeSince(timeSinceUnixTimestampRefreshBalance));
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [timeSinceUnixTimestampRefreshBalance]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSinceOutstandingDebt(remainDateTimeSince(timeSinceUnixTimestampOutstandingDeb));
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [timeSinceUnixTimestampOutstandingDeb]);

  const onRefresh = useCallback((type) => {
    switch (type) {
      case BTN_TYPES.balance:
        refreshTimeSinceRefreshBalance(
          setTimeSinceRefreshBalance,
          setLoadingTimeSinceRefreshBalance,
          setTimeSinceUnixTimestampRefreshBalance,
          userAddress,
          dispatch
        );
        break;
      case BTN_TYPES.outstandingDebt:
        refreshTimeSinceOutstandingDebt(
          setTimeSinceOutstandingDebt,
          setLoadingTimeSinceOutstandingDeb,
          setTimeSinceUnixTimestampOutstandingDeb,
          userAddress,
          dispatch
        );
        break;
    }
  }, []);

  const dataArr = useMemo(() => {
    return [
      {
        title: 'QUSD Contract',
        firstContent: stableCoinAddress,
        btnTitle: null
      },
      {
        title: 'QUSD Saving Reward (p.a.)',
        firstContent: !savingRate ? '0 %' : savingRate + ' %',
        btnTitle: null
      },
      {
        title: 'QUSD - QBTC Borrowing Fee (p.a.)',
        firstContent: !interestRate ? '0 %' : interestRate + ' %',
        btnTitle: null
      },
      {
        title: 'QUSD System Balance',
        firstContent: !systemBalance ? '0 QUSD' : systemBalance + ' QUSD',
        btnTitle: null
      },
      {
        title: 'QUSD Total Supply',
        firstContent: !totalSupply ? '0 QUSD' : totalSupply + ' QUSD',
        btnTitle: null
      },
      {
        title: 'QUSD Saving time since refresh of balance',
        firstContent: String(timeSinceRefreshBalance),
        btnIcon: 'cached',
        iconFontSize: '20px',
        btnType: BTN_TYPES.balance
      },
      {
        title: 'QUSD - QBTC time since refresh of outstanding debt',
        firstContent: String(timeSinceOutstandingDebt),
        btnIcon: 'cached',
        iconFontSize: '20px',
        btnType: BTN_TYPES.outstandingDebt
      }
    ];
  }, [
    totalSupply,
    systemBalance,
    timeSinceRefreshBalance,
    timeSinceOutstandingDebt,
    stableCoinAddress,
    interestRate,
    savingRate
  ]);

  function getIsLoading (type) {
    switch (type) {
      case BTN_TYPES.balance:
        return loadingTimeSinceRefreshBalance;
      case BTN_TYPES.outstandingDebt:
        return loadingTimeSinceOutstandingDeb;
      default:
        return false;
    }
  }
  return (
    <CustomBlock>
      <h1>Saving & Borrowing</h1>
      {dataArr.map((item) => (
        <CardBlock
          key={item.title.replace(' ', '-')}
          btnDisabled={getIsLoading(item.btnType)}
          title={item.title}
          iconFontSize={item.iconFontSize}
          btnIcon={getIsLoading(item.btnType) ? null : item.btnIcon}
          firstContent={item.firstContent}
          btnTitle={getIsLoading(item.btnType) ? <LoadingSpinner /> : item.btnTitle}
          btnHandler={
            !item.btnTitle && !item.btnIcon
              ? null
              : () => {
                onRefresh(item.btnType);
              }
          }
        />
      ))}
    </CustomBlock>
  );
}

export default SavingBorrowingBlock;
