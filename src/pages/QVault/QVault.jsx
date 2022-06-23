import { useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock';
import PageWrap from 'components/Base/PageWrap';
import InfoTooltip from 'components/Custom/InfoTooltip';
import DelegatedValidatorsPanel from 'components/Custom/MembersPanel/DelegatedValidatorsPanel';

import DelegateVoting from './components/DelegateVoting';
import DelegationRewards from './components/DelegationRewards';
import LockCoin from './components/LockCoin';
import ManageBalance from './components/ManageBalance';
import UpdateDelegation from './components/UpdateDelegation';
import VaultOverview from './components/VaultOverview';

import { mode } from 'store/dashboard-mode/selectors';

import { MODE } from 'constants/config';

function QVault () {
  const appMode = useSelector(mode);

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
        {appMode === MODE.advanced && (
          <>
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
          </>
        )}
      </div>
      <VaultOverview />
    </PageWrap>
  );
}

export default QVault;
