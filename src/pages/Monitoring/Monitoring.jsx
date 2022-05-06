import React from 'react';

import PageWrap from 'components/Base/PageWrap';
import RootNodePanel from 'components/Custom/MembersPanel/RootNodePanel/RootNodePanel';
import ValidatorsPanel from 'components/Custom/MembersPanel/ValidatorsPanel';

import CurrentInfo from './components/CurrentInfo';

import TABLE_TYPES from 'constants/tableTypes';

function Monitoring () {
  return (
    <PageWrap headerTitle="Monitoring">
      <CurrentInfo />
      <div>
        <ValidatorsPanel buttons="none" tableType={TABLE_TYPES.validatorsMonitoring} />
        <RootNodePanel tableType={TABLE_TYPES.rootNodesMonitoring} />
      </div>
    </PageWrap>
  );
}

export default Monitoring;
