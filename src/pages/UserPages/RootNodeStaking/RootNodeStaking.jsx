import React from 'react'
import ManageRootNodeBalance from './components/ManageRootNodeBalance'
import RootNodePanel from 'components/Custom/MembersPanel/RootNodePanel'
import PageWrap from 'components/Base/PageWrap'
import TABLE_TYPES from 'constants/tableTypes'

function RootNodeStaking () {
  return (
        <div>
            <PageWrap headerTitle="Root Node Staking">
                <ManageRootNodeBalance />
                <RootNodePanel tableType={TABLE_TYPES.rootNodesWidened} bottom />
            </PageWrap>
        </div>
  )
}

export default RootNodeStaking
