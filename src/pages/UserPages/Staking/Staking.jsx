import React, { useMemo } from 'react'

import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { rootNodeStake } from 'store/selectors/root-contract'

import BigTabsView from 'components/Base/Tabs/BigTabsView'
import RootNodeStakingContent from './RootNodeStakingContent'
import ValidatorStaking from './ValidatorStaking'
import PageWrap from 'components/Base/PageWrap'
import ManageStakerRewardPool from './ManageStakerRewardPool'

function Staking () {
  const location = useLocation()
  const { state } = location
  const amountNodeStake = useSelector(rootNodeStake)

  const tabsItems = useMemo(() => (
    [
      {
        label: 'root-node-staking',
        title: 'Root Node Staking',
        content: <RootNodeStakingContent/>
      },
      {
        label: 'validator-staking',
        title: 'Validator Staking',
        content: <ValidatorStaking/>
      }
    ]
  ), [amountNodeStake])

  return (
    <PageWrap
      headerTitle='Consensus Services'
      headerExtra={(
        <ManageStakerRewardPool/>
      )}
    >
      <BigTabsView
        tabsItems={tabsItems}
        active={state?.activeTab ? state.activeTab : tabsItems[0]?.label}
      />
    </PageWrap>
  )
}

export default Staking
