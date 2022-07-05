import PageWrap from 'components/Base/PageWrap';
import RootNodeTable from 'components/Custom/Tables/RootNodeTable/RootNodeTable';
import ValidatorsTable from 'components/Custom/Tables/ValidatorsTable';

import CurrentInfo from './components/CurrentInfo';

function Monitoring () {
  return (
    <PageWrap pageHeader="Monitoring">
      <CurrentInfo />
      <div>
        <ValidatorsTable tableType="validators-monitoring" />
        <RootNodeTable tableType="rootNodesMonitoring" />
      </div>
    </PageWrap>
  );
}

export default Monitoring;
