import React from 'react';

import PageWrap from 'components/Base/PageWrap';
import RootNodePanel from 'components/Custom/MembersPanel/RootNodePanel';

import ManageRootNodeBalance from './components/ManageRootNodeBalance';

import TABLE_TYPES from 'constants/tableTypes';

function RootNodeStaking () {
  return (
    <PageWrap headerTitle="Root Node Staking">
      <ManageRootNodeBalance />
      <RootNodePanel bottom tableType={TABLE_TYPES.rootNodesWidened} />
    </PageWrap>
  );
}

export default RootNodeStaking;
