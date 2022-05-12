import React from 'react';
import { useSelector } from 'react-redux';

import { MODE } from 'components/Base/DashboardMode/DashboardMode';
import PageWrap from 'components/Base/PageWrap';

import DelegateStakingPower from './DelegateStakingPower';
import DelegateVoting from './DelegateVoting';
import LockCoin from './LockCoin';
import ManageBalance from './ManageBalance';
import VaultOverview from './VaultOverview';

import { mode } from 'store/dashboard-mode/selectors';

function QVault () {
  const appMode = useSelector(mode);

  return (
    <PageWrap wrapContentClasses="wrap-content__column-2-1" headerTitle="Q Vault">
      <div>
        <ManageBalance />
        <LockCoin />
        <DelegateVoting />
        {appMode === MODE.advanced && <DelegateStakingPower />}
      </div>
      <VaultOverview />
    </PageWrap>
  );
}

export default QVault;
