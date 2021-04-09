import React, { useEffect, useMemo, useState } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';

import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { debtSB, loadingPerformNetting, surplusSB, systemBalanceSB } from 'store/selectors/system-balance';
import { availableAmountSR } from 'store/selectors/system-reserve';
import { userBalance } from 'store/selectors/q-piggy-bank';

import { getDebt, getSurplus, getSystemBalance } from 'store/actions/action-creaters/system-balance';
import { getAvailableAmount } from 'store/actions/action-creaters/system-reserve';
import { getUserBalance } from 'store/actions/action-creaters/q-piggy-bank';

import Stats from 'components/Custom/PageLists/SidebarCards/Stats';
import SystemCard from 'components/Custom/PageLists/SidebarCards/SystemCard';
import References from 'components/Custom/PageLists/SidebarCards/References';

import ContractBalance from 'contracts/handler/ContractBalance';
import { StableCoinQUSD } from 'contracts/src/StableCoin';

import { fN } from 'func/useful';
import { fromWei } from 'func/balance';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

function SidebarCards() {
  const dispatch = useDispatch();
  const { drizzle } = useDrizzle();
  const state = useDrizzleState((state) => state);

  const userAddress = useSelector(userAddressMetamask);
  const [userBalanceQ, setUserBalanceQ] = useState(null);
  const [QUSDUserBalance, setQUSDUserBalance] = useState(0);

  const contractBalance = new ContractBalance(drizzle, userAddress);
  const contractStableCoinQUSD = new StableCoinQUSD();

  const surplus = fN(useSelector(surplusSB));
  const debt = fN(useSelector(debtSB));
  const systemBalanceResult = fN(useSelector(systemBalanceSB));
  const availableAmount = fN(useSelector(availableAmountSR));
  const userPBBalance = fN(useSelector(userBalance));
  const loadingPerfNetting = useSelector(loadingPerformNetting);

  const [reserveBalance, setReserveBalance] = useState('0');

  useEffect(() => {
    if (drizzle) {
      drizzle.web3.eth.getBalance(userAddress, (err, balance) => {
        setUserBalanceQ(fN(fromWei(balance)));
      });
    }
  }, [state]);

  useEffect(() => {
    dispatch(getSurplus());
    dispatch(getDebt());
    dispatch(getSystemBalance());
    dispatch(getAvailableAmount());
    //stats
    dispatch(getUserBalance(userAddress));

  }, [dispatch, loadingPerfNetting]);

  useEffect(() => {
    contractBalance.getBalanceValue('SystemReserve', setReserveBalance);
    contractStableCoinQUSD.balanceOf(userAddress)
      .then((res) => {
        setQUSDUserBalance(fromWei(res));
      })
      .catch((e) => {
        setQUSDUserBalance(0);
        console.log(e);
      });
  }, [loadingPerfNetting]);

  const statsData = useMemo(() => {
    return (
      [
        {
          title: 'Available Q Balance',
          value: userBalanceQ + ' Q',
        },
        {
          title: 'Q Balance in Q Vault',
          value: userPBBalance + ' Q',
        },
        {
          title: 'QUSD Balance',
          value: fN(QUSDUserBalance) + ' QUSD',
        },
      ]
    );
  }, [userPBBalance, userBalanceQ, QUSDUserBalance]);

  const systemBalance = useMemo(() => {
    return (
      [
        {
          title: 'Collected Surplus',
          value: surplus + ' QUSD',
        },
        {
          title: 'Open Debt',
          value: debt + ' QUSD',
        },
        {
          title: 'Balance',
          value: systemBalanceResult + ' QUSD',
        },
      ]
    );
  }, [surplus, debt, systemBalanceResult]);

  const systemReserve = useMemo(() => {
    return (
      [
        {
          title: 'Reserve Balance',
          value: reserveBalance + ' Q',
        },
        {
          title: 'Immediately available',
          value: availableAmount + ' Q',
        },
      ]
    );
  }, [availableAmount, reserveBalance]);

  return (
    <>
      <Stats statsData={statsData} type="Auction"/>
      <SystemCard data={systemBalance} title={'QUSD System Balance'}/>
      <SystemCard data={systemReserve} title={'Q System Reserve'}/>
      <References type="auction"/>
    </>
  );
}

export default SidebarCards;

