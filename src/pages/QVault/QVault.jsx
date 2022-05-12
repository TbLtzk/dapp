import React from 'react';
import { useSelector } from 'react-redux';

import { MODE } from 'components/Base/DashboardMode/DashboardMode';
import PageWrap from 'components/Base/PageWrap';

import DelegateStakingPower from './DelegateStakingPower';
import DelegateVoting from './DelegateVoting';
import LockCoin from './LockCoin';
import ManageBalance from './ManageBalance';
import Panel from './Panel';

import { mode } from 'store/dashboard-mode/selectors';
import { userBalance, votingWeight } from 'store/q-vault/selectors';

import { subtractAmount } from 'func/balance';

function QVault () {
  const appMode = useSelector(mode);

  const userVotingWeight = useSelector(votingWeight);
  const userQVaultBalance = useSelector(userBalance);
  const maxQVaultVotingWeight = Number(subtractAmount(userQVaultBalance, userVotingWeight));

  return (
    <PageWrap wrapContentClasses="wrap-content__column-2-1" headerTitle="Q Vault">
      <div>
        <ManageBalance />
        <LockCoin maxQVaultVotingWeight={maxQVaultVotingWeight} />
        <DelegateVoting />
        {appMode === MODE.advanced ? <DelegateStakingPower /> : null}
      </div>
      <div>
        <Panel />
      </div>
    </PageWrap>
  );
}

export default QVault;
