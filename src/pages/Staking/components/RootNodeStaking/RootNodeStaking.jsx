import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { motion } from 'framer-motion';
import Button from 'ui/Button';
import Icon from 'ui/Icon';
import MenuDropdown from 'ui/MenuDropdown';

import CustomBlock from 'components/Base/CustomBlock';
import InfoTooltip from 'components/Custom/InfoTooltip';
import RootNodeTable from 'components/Custom/Tables/RootNodeTable';

import RootBalanceForm from './components/RootBalanceForm';
import RootBalanceInfo from './components/RootBalanceInfo';

import { getAccountBalance } from 'store/q-vault/action-creators';
import { getMinimumRootTimeLock, getRootNodeStakes, getRootWithdrawals } from 'store/root-node/action-creators';
import { userAddressMetamask } from 'store/user-inf/selectors';

import TABLE_TYPES from 'constants/tableTypes';

function RootNodeStaking () {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);

  useEffect(() => {
    dispatch(getAccountBalance(userAddress));
    dispatch(getRootNodeStakes(userAddress));
    dispatch(getRootWithdrawals(userAddress));
    dispatch(getMinimumRootTimeLock(userAddress));
  }, []);

  const menuItems = [
    {
      id: 'stake-to-ranking',
      title: 'Stake to Ranking',
      func: () => {
        console.log('Stake to Ranking');
      },
    },
    {
      id: 'announce-withdrawal',
      title: ' Announce Withdrawal',
      func: () => {
        console.log('Announce Withdrawal');
      },
    },
    {
      id: 'withdraw-from-ranking',
      title: 'Withdraw from Ranking',
      func: () => {
        console.log('Withdraw from Ranking');
      },
    },
  ];

  return (
    <>
      <CustomBlock>
        <div className="card_header">
          <div className="card-title">
            <h2 className="text-h2">Manage Balance</h2>
            <InfoTooltip topic="root-node-staking" placement="top" />
          </div>
          <MenuDropdown
            right
            open={menuOpen}
            menuItems={menuItems}
            onToggle={setMenuOpen}
          />
        </div>

        <RootBalanceInfo />
        <RootBalanceForm />
      </CustomBlock>
      <RootNodeTable bottom tableType={TABLE_TYPES.rootNodesWidened} />
    </>
  );
}

export default RootNodeStaking;
