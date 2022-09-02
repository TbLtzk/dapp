import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import InfoTooltip from 'components/Tooltips/InfoTooltip';

import RootBalanceInfo from './components/RootBalanceInfo';
import RootNodeMenu from './components/RootNodeMenu';
import RootNodesTable from './components/RootNodesTable';

import { useQVault } from 'store/q-vault/hooks';
import { useRootNodes } from 'store/root-nodes/hooks';
import { useUser } from 'store/user/hooks';

function RootNodeStaking () {
  const { t } = useTranslation();
  const { loadWalletBalance } = useQVault();
  const {
    getRootNodeStakes,
    getRootWithdrawalInfo,
    getMinimumRootTimeLock
  } = useRootNodes();
  const user = useUser();

  useEffect(() => {
    loadWalletBalance();
    getRootNodeStakes(user.address);
    getRootWithdrawalInfo(user.address);
    getMinimumRootTimeLock(user.address);
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
      <RootNodesTable />
    </>
  );
}

export default RootNodeStaking;
