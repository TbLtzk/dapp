import React from 'react'

import ValidatorsPanel from 'components/Custom/MembersPanel/ValidatorsPanel'
import AccountStatus from './AccountStatus'

export default function ValidatorStaking () {
  return (
    <div>
      <AccountStatus/>
      <ValidatorsPanel
        type="with-total"
        bottom
        widened
      />
    </div>
  )
}
