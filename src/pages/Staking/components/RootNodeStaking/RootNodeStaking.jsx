import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock';
import InfoTooltip from 'components/Custom/InfoTooltip';
import RootNodePanel from 'components/Custom/Tables/RootNodeTable';

import RootBalanceForm from './components/RootBalanceForm';
import RootBalanceInfo from './components/RootBalanceInfo';

import { getAccountBalance } from 'store/q-vault/action-creators';
import { getMinimumRootTimeLock, getRootNodeStakes, getRootWithdrawals } from 'store/root-node/action-creators';
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
    <>
      <CustomBlock>
        <div className="card_header">
          <div className="card-title">
            <h2 className="text-h2">Manage Balance</h2>
            <InfoTooltip topic="root-node-staking" placement="top" />
          </div>
        </div>

        <RootBalanceInfo />
        <RootBalanceForm />
      </CustomBlock>
      <RootNodePanel bottom tableType={TABLE_TYPES.rootNodesWidened} />
    </>
  );
}

export default RootNodeStaking;
