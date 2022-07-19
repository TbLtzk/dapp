import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import InfoTooltip from 'components/Custom/InfoTooltip';
import RootNodeTable from 'components/Custom/Tables/RootNodeTable';

import RootBalanceInfo from './components/RootBalanceInfo';
import RootNodeMenu from './components/RootNodeMenu';

import { getAccountBalance } from 'store/q-vault/action-creators';
import { getMinimumRootTimeLock, getRootNodeStakes, getRootWithdrawals } from 'store/root-node/action-creators';
import { userAddressMetamask } from 'store/user-inf/selectors';

function RootNodeStaking () {
  const { t } = useTranslation();

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
      <div className="block">
        <div className="block_header">
          <div className="block_header-title">
            <h2 className="text-h2">{t('MANAGE_BALANCE')}</h2>
            <InfoTooltip topic="root-node-staking" placement="top" />
          </div>
          <RootNodeMenu />
        </div>

        <RootBalanceInfo />
      </div>
      <RootNodeTable tableType="rootNodesWidened" />
    </>
  );
}

export default RootNodeStaking;
