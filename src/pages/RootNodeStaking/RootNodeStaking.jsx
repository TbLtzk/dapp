import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock';
import PageWrap from 'components/Base/PageWrap';
import RootNodePanel from 'components/Custom/MembersPanel/RootNodePanel';

import RootBalanceForm from './components/RootBalanceForm';
import RootBalanceInfo from './components/RootBalanceInfo';

import { getAccountBalance } from 'store/q-vault/action-creators';
import {
  getMinimumRootTimeLock,
  getRootNodeStakes,
  getRootWithdrawals,
} from 'store/root-node/action-creators';
import { userAddressMetamask } from 'store/user-inf/selectors';

import TABLE_TYPES from 'constants/tableTypes';

function RootNodeStaking () {
  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);

  useEffect(() => {
    dispatch(getAccountBalance(userAddress));
    dispatch(getRootNodeStakes(userAddress));
    dispatch(getRootWithdrawals(userAddress));
    dispatch(getMinimumRootTimeLock(userAddress));
  }, []);

  return (
    <PageWrap headerTitle="Root Node Staking">
      <CustomBlock>
        <h1>Manage Balance</h1>
        <RootBalanceInfo />
        <RootBalanceForm />
      </CustomBlock>
      <RootNodePanel bottom tableType={TABLE_TYPES.rootNodesWidened} />
    </PageWrap>
  );
}

export default RootNodeStaking;
