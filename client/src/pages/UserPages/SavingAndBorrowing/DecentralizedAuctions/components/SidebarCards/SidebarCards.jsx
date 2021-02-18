import React, { useEffect, useMemo, useState } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';

import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { debtSB, surplusSB, systemBalanceSB } from 'store/selectors/system-balance';
import { availableAmountSR } from 'store/selectors/system-reserve';
import { userBalance } from 'store/selectors/q-piggy-bank';

import { getDebt, getSurplus, getSystemBalance } from 'store/actions/action-creaters/system-balance';
import { getAvailableAmount } from 'store/actions/action-creaters/system-reserve';
import { getUserBalance } from 'store/actions/action-creaters/q-piggy-bank';

import Stats from 'components/Custom/PageLists/SidebarCards/Stats';
import SystemCard from 'components/Custom/PageLists/SidebarCards/SystemCard';
import References from 'components/Custom/PageLists/SidebarCards/References';

import { fN } from 'func/useful';
import { fromWei } from 'func/balance';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

function SidebarCards() {
  const dispatch = useDispatch();
  const { drizzle } = useDrizzle();
  const state = useDrizzleState((state) => state);
  const userAddress = useSelector(userAddressMetamask);
  const [userBalanceQ, setUserBalanceQ] = useState(null);

  const surplus = fN(useSelector(surplusSB));
  const debt = fN(useSelector(debtSB));
  const systemBalanceResult = fN(useSelector(systemBalanceSB));
  const availableAmount = fN(useSelector(availableAmountSR));
  const userPBBalance = fN(useSelector(userBalance));

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
  }, [dispatch]);

  const statsData = useMemo(() => {
    return (
      [
        {
          title: 'Available Q Balance',
          value: userBalanceQ + ' Q',
        },
        {
          title: 'Q Balance in PiggyBank',
          value: userPBBalance + ' Q',
        },
        {
          title: 'QUSD Balance',
          value: '4563 QUSD',
        },
      ]
    );
  }, [userPBBalance, userBalanceQ]);

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
          title: 'Reserve Amount',
          value: availableAmount + ' Q',
        },
      ]
    );
  }, [availableAmount]);

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

