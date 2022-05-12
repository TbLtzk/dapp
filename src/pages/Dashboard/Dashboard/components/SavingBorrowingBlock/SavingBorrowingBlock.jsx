import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import CustomBlock from 'components/Base/CustomBlock';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import ExplorerAddress from 'components/Custom/ExplorerAddress';

import useInterval from 'hooks/useInterval';

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
  refreshTimeSinceRefreshBalance,
} from 'contracts/helpers/borrowing-core-helper';

import { remainDateTimeSince } from 'func/convertDate';
import { fN } from 'func/useful';

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

  useInterval(() => {
    setTimeSinceRefreshBalance(remainDateTimeSince(timeSinceUnixTimestampRefreshBalance));
    setTimeSinceOutstandingDebt(remainDateTimeSince(timeSinceUnixTimestampOutstandingDeb));
  }, 30000);

  const savingAndBorrowingInfo = [
    {
      id: 'qusd-contract',
      title: 'QUSD Contract',
      content: <ExplorerAddress address={stableCoinAddress} />,
    },
    {
      id: 'saving-reward',
      title: 'QUSD Saving Reward (p.a.)',
      content: !savingRate ? '0 %' : savingRate + ' %',
    },
    {
      id: 'borrowing-fee',
      title: 'QUSD - QBTC Borrowing Fee (p.a.)',
      content: !interestRate ? '0 %' : interestRate + ' %',
    },
    {
      id: 'system-balance',
      title: 'QUSD System Balance',
      content: !systemBalance ? '0 QUSD' : systemBalance + ' QUSD',
    },
    {
      id: 'total-supply',
      title: 'QUSD Total Supply',
      content: !totalSupply ? '0 QUSD' : totalSupply + ' QUSD',
    },
    {
      id: 'saving-time',
      title: 'QUSD Saving time since refresh of balance',
      content: timeSinceRefreshBalance || '0 day(s) 0 hours 0 minutes',
      loading: loadingTimeSinceRefreshBalance,
      handleClick: () =>
        refreshTimeSinceRefreshBalance(
          setTimeSinceRefreshBalance,
          setLoadingTimeSinceRefreshBalance,
          setTimeSinceUnixTimestampRefreshBalance,
          userAddress,
          dispatch
        ),
    },
    {
      id: 'outstanding-debt',
      title: 'QUSD - QBTC time since refresh of outstanding debt',
      content: timeSinceOutstandingDebt || '0 day(s) 0 hours 0 minutes',
      loading: loadingTimeSinceOutstandingDeb,
      handleClick: () =>
        refreshTimeSinceOutstandingDebt(
          setTimeSinceOutstandingDebt,
          setLoadingTimeSinceOutstandingDeb,
          setTimeSinceUnixTimestampOutstandingDeb,
          userAddress,
          dispatch
        ),
    },
  ];

  return (
    <CustomBlock>
      <h1>Saving & Borrowing</h1>
      {savingAndBorrowingInfo.map((item) => (
        <Fragment key={item.id}>
          <div className="card_block">
            <div>
              <h5>{item.title}</h5>
              <div className="card_text">{item.content}</div>
            </div>
            <div>
              {item?.handleClick && (
                <Button
                  disabled={item.loading}
                  style={{ width: '100%' }}
                  onClick={item.handleClick}
                >
                  {item.loading
                    ? (
                      <LoadingSpinner
                        size="sm"
                        className="m-1"
                        type="light"
                      />
                    )
                    : (
                      <i
                        className="mdi mdi-cached"
                        style={{ fontSize: '23px' }}
                      />
                    )
                  }
                </Button>
              )}
            </div>
          </div>
          {item.brakeLine ? <div style={{ margin: '10px 0px 20px 0px' }} className="card__line" /> : null}
        </Fragment>
      ))}
    </CustomBlock>
  );
}

export default SavingBorrowingBlock;
