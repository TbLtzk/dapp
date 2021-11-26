import React, { useEffect, useMemo } from 'react'

import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { rootNodeStake } from 'store/root-node/selectors'

import BigTabsView from 'components/Base/Tabs/BigTabsView'
import RootNodeStakingContent from './RootNodeStakingContent'
import ValidatorStaking from './ValidatorStaking'
import PageWrap from 'components/Base/PageWrap'
import ManageStakerRewardPool from './ManageStakerRewardPool'
import { compoundRateKeeperExistsSelector } from 'store/validators/selectors'
import { getCompoundRateKeeperExists } from 'store/validators/action-creators'

function Staking () {
  const location = useLocation()
  const dispatch = useDispatch()
  const { state } = location
  const amountNodeStake = useSelector(rootNodeStake)
  const compoundRateKeeperExists = useSelector(compoundRateKeeperExistsSelector)

  useEffect(() => {
    dispatch(getCompoundRateKeeperExists())
  }, [dispatch])

  const tabsItems = useMemo(
    () => [
      {
        label: 'root-node-staking',
        title: 'Root Node Staking',
        content: <RootNodeStakingContent />
      },
      {
        label: 'validator-staking',
        title: 'Validator Staking',
        content: <ValidatorStaking />
      }
    ],
    [amountNodeStake]
  )

  return (
        <PageWrap
            headerTitle="Consensus Services"
            headerExtra={compoundRateKeeperExists ? <ManageStakerRewardPool /> : null}
        >
            <BigTabsView tabsItems={tabsItems} active={state?.activeTab ? state.activeTab : tabsItems[0]?.label} />
        </PageWrap>
  )
}

export default Staking
