import React, { useEffect, useState } from 'react';

import { drizzleReactHooks } from '@drizzle/react-plugin';
import { useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';

import { fN } from 'func/useful';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

function UserData() {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState((state) => state);
  const [userBalance, setUserBalance] = useState(null);
  const userAddress = useSelector(userAddressMetamask);

  useEffect(() => {
    if (drizzle) {
      drizzle.web3.eth.getBalance(userAddress, (err, balance) => {
        const userBalance = drizzle.web3.utils.fromWei(balance, 'ether');
        setUserBalance(fN(userBalance));
      });
    }
  }, [state]);

  return (
    <div>
      <p>
        Account:
        {userAddress}
      </p>
      <p>
        Account balance:
        {userBalance}
        Q
      </p>
    </div>
  );
}

export default UserData;
