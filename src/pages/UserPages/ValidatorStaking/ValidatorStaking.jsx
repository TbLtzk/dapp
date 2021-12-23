import PageWrap from 'components/Base/PageWrap'
import ValidatorsPanel from 'components/Custom/MembersPanel/ValidatorsPanel'
import React from 'react'
import ManageValidatorBalance from './components/ManageValidatorBalance'
import ManageStakerRewardPool from './components/ManageStakerRewardPool'

function ValidatorStaking () {
  return (
        <div>
            <PageWrap headerTitle="Validator Staking" headerExtra={<ManageStakerRewardPool />}>
                <ManageValidatorBalance />
                <ValidatorsPanel type="with-total" bottom widened />
            </PageWrap>
        </div>
  )
}

export default ValidatorStaking
