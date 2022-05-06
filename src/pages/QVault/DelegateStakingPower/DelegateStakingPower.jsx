import React from 'react'

import DelegatedValidatorsPanel from 'components/Custom/MembersPanel/DelegatedValidatorsPanel'
import CustomBlock from 'components/Base/CustomBlock'

import UpdateDelegation from './UpdateDelegation'
import DelegationRewards from './DelegationRewards'

function DelegateStakingPower () {
  return (
        <>
            <CustomBlock>
                <h1>Delegate Staking Power</h1>
                <DelegationRewards />
                <div className="card__line" />
                <UpdateDelegation />
            </CustomBlock>
            <CustomBlock>
                <DelegatedValidatorsPanel />
            </CustomBlock>
        </>
  )
}

export default DelegateStakingPower
