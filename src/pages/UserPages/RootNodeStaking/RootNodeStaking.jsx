import React from 'react'
import ManageRootNodeBalance from './components/ManageRootNodeBalance'
import RootNodePanel from 'components/Custom/MembersPanel/RootNodePanel'
import PageWrap from 'components/Base/PageWrap'

function RootNodeStaking () {
  return (
        <div>
            <PageWrap headerTitle="Root Node Staking">
                <ManageRootNodeBalance />
                <RootNodePanel type="with-total" bottom />
            </PageWrap>
        </div>
  )
}

export default RootNodeStaking
