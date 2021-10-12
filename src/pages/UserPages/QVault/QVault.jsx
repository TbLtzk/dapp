import React from 'react'

import ManageBalance from './ManageBalance'
import LockCoin from './LockCoin'
import Panel from './Panel/Panel'
import DelegateStakingPower from './DelegateStakingPower'
import PageWrap from 'components/Base/PageWrap'
import { useSelector } from 'react-redux'
import { mode } from 'store/selectors/dashboardMode'
import { MODE } from 'components/Base/DashboardMode/DashboarModeButton'

function QVault () {
  const appMode = useSelector(mode)
  return (
        <PageWrap wrapContentClasses="wrap-content__column-2-1" headerTitle="Q Vault">
            <div>
                <ManageBalance />
                <LockCoin />
                {appMode === MODE.advanced ? <DelegateStakingPower /> : null}
            </div>
            <div>
                <Panel />
            </div>
        </PageWrap>
  )
}

export default QVault
