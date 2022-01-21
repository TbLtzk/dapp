import PageWrap from 'components/Base/PageWrap'
import ValidatorsPanel from 'components/Custom/MembersPanel/ValidatorsPanel'
import React from 'react'
import ManageValidatorBalance from './components/ManageValidatorBalance'
import ManageStakerRewardPool from './components/ManageStakerRewardPool'
import TABLE_TYPES from 'constants/tableTypes'

function ValidatorStaking () {
  return (
        <div>
            <PageWrap headerTitle="Validator Staking" headerExtra={<ManageStakerRewardPool />}>
                <ManageValidatorBalance />
                <ValidatorsPanel buttons='q-vault' type="with-total" bottom tableType={TABLE_TYPES.validatorsWidened} />
            </PageWrap>
        </div>
  )
}

export default ValidatorStaking
