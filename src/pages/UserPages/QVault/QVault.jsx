import React from 'react'

import ManageBalance from './ManageBalance'
import LockCoin from './LockCoin'
import DelegateVoting from './DelegateVoting'
import Panel from './Panel/Panel'
import DelegateStakingPower from './DelegateStakingPower'
import PageWrap from 'components/Base/PageWrap'
import { useSelector } from 'react-redux'
import { mode } from 'store/dashboard-mode/selectors'
import { MODE } from 'components/Base/DashboardMode/DashboardMode'
import { qVaultMinimumTimeLock, userBalance, votingWeight } from 'store/q-vault/selectors'
import { subtractAmount } from 'func/balance'

function QVault () {
  const appMode = useSelector(mode)

  const userVotingWeight = useSelector(votingWeight)
  const userQVaultBalance = useSelector(userBalance)
  const qVaultLockedAmount = useSelector(qVaultMinimumTimeLock)

  const maxQVaultWithdrawAmount = subtractAmount(userQVaultBalance, qVaultLockedAmount)
  const maxQVaultVotingWeight = subtractAmount(userQVaultBalance, userVotingWeight)

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
