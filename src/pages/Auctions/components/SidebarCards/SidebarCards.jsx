import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stats from 'components/Custom/PageLists/SidebarCards/Stats';
import SystemCard from 'components/Custom/PageLists/SidebarCards/SystemCard';

import { getAccountBalance, getUserBalance } from 'store/q-vault/action-creators';
import { accountBalance, userBalance } from 'store/q-vault/selectors';
import { getSavingAviableToDeposit } from 'store/saving-assets/action-creators';
import { savingAviableToDepositSelector } from 'store/saving-assets/selectors';
import { getSymbol } from 'store/stable-coin/action-creators';
import { getDebt, getSurplus, getSystemBalance } from 'store/system-balance/action-creators';
import { debtSB, loadingPerformNetting, surplusSB, systemBalanceSB } from 'store/system-balance/selectors';
import { getAvailableAmount, getSystemReserveBalance } from 'store/system-reserve/action-creators';
import { availableAmountSR, reserveBalanceSelector } from 'store/system-reserve/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { getEPDRUint } from 'contracts/helpers/epdr-param-helper';

import { fN } from 'func/useful';

function SidebarCards () {
  const dispatch = useDispatch();

  const userAddress = useSelector(userAddressMetamask);
  const userBalanceQ = useSelector(accountBalance);
  const surplus = useSelector(surplusSB);
  const debt = useSelector(debtSB);
  const QUSDUserBalanceAmount = useSelector(savingAviableToDepositSelector);

  const systemBalanceResult = useSelector(systemBalanceSB);
  const availableAmount = useSelector(availableAmountSR);
  const userQVBalance = useSelector(userBalance);
  const loadingPerfNetting = useSelector(loadingPerformNetting);
  const reserveBalance = useSelector(reserveBalanceSelector);

  const [surplusLot, setSurplusLot] = useState('0');
  const [reserveLot, setReserveLot] = useState('0');

  useEffect(() => {
    dispatch(getSurplus());
    dispatch(getDebt());
    dispatch(getAccountBalance(userAddress));
    dispatch(getSystemBalance());
    dispatch(getAvailableAmount());
    dispatch(getSavingAviableToDeposit());
    dispatch(getUserBalance(userAddress));
    dispatch(getSymbol());
    dispatch(getSystemReserveBalance());

    getEPDRUint('governed.EPDR.QUSD_surplusLot', setSurplusLot);
    getEPDRUint('governed.EPDR.reserveLot', setReserveLot);
  }, [dispatch, loadingPerfNetting]);

  const statsData = useMemo(() => {
    return [
      {
        title: 'Available Q Balance',
        value: fN(userBalanceQ) + ' Q'
      },
      {
        title: 'Q Balance in Q Vault',
        value: fN(userQVBalance) + ' Q'
      },
      {
        title: 'QUSD Balance',
        value: fN(QUSDUserBalanceAmount) + ' QUSD'
      }
    ];
  }, [userQVBalance, userBalanceQ, QUSDUserBalanceAmount]);

  const systemBalance = useMemo(() => {
    return [
      {
        title: 'Collected Surplus',
        value: fN(surplus) + ' QUSD'
      },
      {
        title: 'Open Debt',
        value: fN(debt) + ' QUSD'
      },
      {
        title: 'Balance',
        value: fN(systemBalanceResult) + ' QUSD'
      },
      {
        title: 'Surplus Auction Lot',
        value: fN(surplusLot) + ' QUSD'
      }
    ];
  }, [surplus, debt, systemBalanceResult, surplusLot]);

  const systemReserve = useMemo(() => {
    return [
      {
        title: 'Reserve Balance',
        value: fN(reserveBalance) + ' Q'
      },
      {
        title: 'Immediately Available',
        value: fN(availableAmount) + ' Q'
      },
      {
        title: 'Debt Auction Lot',
        value: fN(reserveLot) + ' Q'
      }
    ];
  }, [availableAmount, reserveBalance, reserveLot]);

  return (
    <div>
      <Stats statsData={statsData} type="Auction" />
      <SystemCard data={systemBalance} title="QUSD System Balance" />
      <SystemCard data={systemReserve} title="Q System Reserve" />
    </div>
  );
}

export default SidebarCards;
