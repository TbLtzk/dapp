import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useWeb3Context } from 'context/Web3ContextProvider';

import InfoTooltip from 'components/Tooltips/InfoTooltip';

import RootBalanceInfo from './components/RootBalanceInfo';
import RootNodeMenu from './components/RootNodeMenu';
import RootNodesTable from './components/RootNodesTable';

import { useQVault } from 'store/q-vault/hooks';
import { useRootNodes } from 'store/root-nodes/hooks';

function RootNodeStaking () {
  const { t } = useTranslation();
  const { loadWalletBalance } = useQVault();
  const {
    getRootNodeStakes,
    getRootWithdrawalInfo,
    getMinimumRootTimeLock
  } = useRootNodes();
  const { address } = useWeb3Context();

  useEffect(() => {
    loadWalletBalance();
    getRootNodeStakes(address);
    getRootWithdrawalInfo(address);
    getMinimumRootTimeLock(address);
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
