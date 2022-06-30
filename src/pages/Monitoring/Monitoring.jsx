import PageWrap from 'components/Base/PageWrap';
import RootNodePanel from 'components/Custom/Tables/RootNodeTable/RootNodeTable';
import ValidatorsPanel from 'components/Custom/Tables/ValidatorsTable';

import CurrentInfo from './components/CurrentInfo';

import TABLE_TYPES from 'constants/tableTypes';

function Monitoring () {
  return (
    <PageWrap pageHeader="Monitoring">
      <CurrentInfo />
      <div>
        <ValidatorsPanel tableType={TABLE_TYPES.validatorsMonitoring} />
        <RootNodePanel tableType={TABLE_TYPES.rootNodesMonitoring} />
      </div>
    </PageWrap>
  );
}

export default Monitoring;
