import React from 'react'

import RootNodePanel from 'components/Custom/MembersPanel/RootNodePanel'
import FormStaking from 'pages/UserPages/Staking/FormStaking'

import { RootNodeStaking } from './styles'

export default function RootNodeStakingContent () {
  return (
    <RootNodeStaking>
      <FormStaking/>
      <RootNodePanel type="with-total" bottom/>
    </RootNodeStaking>
  )
}
