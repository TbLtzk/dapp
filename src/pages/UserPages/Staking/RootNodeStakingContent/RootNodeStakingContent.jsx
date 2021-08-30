import React from 'react'

import RootNodePanel from 'components/Custom/MembersPanel/RootNodePanel'
import FormStaking from 'pages/UserPages/Staking/FormStaking'

export default function RootNodeStakingContent () {
  return (
    <div>
      <FormStaking/>
      <RootNodePanel type="with-total" bottom/>
    </div>
  )
}
