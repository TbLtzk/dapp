import React from 'react';

import ManageBalance from './ManageBalance';
import LockCoin from './LockCoin';
import Panel from './Panel/Panel';
import DelegateStakingPower from './DelegateStakingPower';
import PageWrap from 'components/Base/PageWrap';

function PiggyBank() {
  return (
    <PageWrap
      wrapContentClasses={'column-2-1'}
      headerTitle={'Vault'}
    >
      <div>
        <ManageBalance/>
        <LockCoin/>
        <DelegateStakingPower/>
      </div>
      <div>
        <Panel/>
      </div>
    </PageWrap>
  );
}

export default PiggyBank;
