
import PageWrap from 'components/Base/PageWrap';
import InfoTooltip from 'components/Custom/InfoTooltip';

import DelegateVoting from './components/DelegateVoting';
import LockCoin from './components/LockCoin';
import ManageBalance from './components/ManageBalance';
import VaultOverview from './components/VaultOverview';

function QVault () {
  return (
    <PageWrap
      wrapContentClasses="wrap-content__column-2-1"
      pageHeader="Q Vault"
      pageTooltip={<InfoTooltip placement="bottom" topic="q-vault" />}
    >
      <div style={{ display: 'grid', gap: '16px' }}>
        <ManageBalance />
        <LockCoin />
        <DelegateVoting />
      </div>
      <VaultOverview />
    </PageWrap>
  );
}

export default QVault;
