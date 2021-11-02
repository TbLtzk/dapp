import React from 'react'

import ManageBalance from './ManageBalance'
import LockCoin from './LockCoin'
import DelegateVoting from './DelegateVoting'
import Panel from './Panel/Panel'
import DelegateStakingPower from './DelegateStakingPower'
import PageWrap from 'components/Base/PageWrap'
import { useSelector } from 'react-redux'
import { mode } from 'store/selectors/dashboardMode'
import { MODE } from 'components/Base/DashboardMode/DashboarModeButton'
import { qVaultMinimumTimeLock, userBalance, votingWeight } from 'store/selectors/q-vault'
import { getMaxQVaultWithdrawAmount, getMaxQVaultVotingWeight } from 'contracts/helpers/q-vault-helper'

function QVault () {
  const appMode = useSelector(mode)

  const userVotingWeight = useSelector(votingWeight)
  const userQVaultBalance = useSelector(userBalance)
  const qVaultLockedAmount = useSelector(qVaultMinimumTimeLock)

  const maxQVaultWithdrawAmount = getMaxQVaultWithdrawAmount(userQVaultBalance, qVaultLockedAmount)
  const maxQVaultVotingWeight = getMaxQVaultVotingWeight(userQVaultBalance, userVotingWeight)

  return (
        <PageWrap wrapContentClasses="wrap-content__column-2-1" headerTitle="Q Vault">
            <div>
                <ManageBalance maxQVaultWithdrawAmount={maxQVaultWithdrawAmount} />
                <LockCoin maxQVaultVotingWeight={maxQVaultVotingWeight} />
                <DelegateVoting />
                {appMode === MODE.advanced ? <DelegateStakingPower /> : null}
            </div>
            <div>
                <Panel />
            </div>
        </PageWrap>
  )
}

export default QVault
