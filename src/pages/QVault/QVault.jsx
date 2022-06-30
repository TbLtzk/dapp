
import CustomBlock from 'components/Base/CustomBlock';
import PageWrap from 'components/Base/PageWrap';
import InfoTooltip from 'components/Custom/InfoTooltip';
import DelegatedValidatorsPanel from 'components/Custom/Tables/DelegatedValidatorsTable';

import DelegateVoting from './components/DelegateVoting';
import DelegationRewards from './components/DelegationRewards';
import LockCoin from './components/LockCoin';
import ManageBalance from './components/ManageBalance';
import UpdateDelegation from './components/UpdateDelegation';
import VaultOverview from './components/VaultOverview';

function QVault () {
  return (
    <PageWrap
      wrapContentClasses="wrap-content__column-2-1"
      pageHeader="Q Vault"
      pageTooltip={<InfoTooltip placement="bottom" topic="q-vault" />}
    >
      <div>
        <ManageBalance />
        <LockCoin />
        <DelegateVoting />
        <CustomBlock>
          <h1>
            <span>Delegate Staking Power</span>
            <InfoTooltip topic="delegate-staking-power" />
          </h1>
          <DelegationRewards />
          <div className="card__line" />
          <UpdateDelegation />
        </CustomBlock>
        <CustomBlock>
          <DelegatedValidatorsPanel />
        </CustomBlock>
      </div>
      <VaultOverview />
    </PageWrap>
  );
}

export default QVault;
