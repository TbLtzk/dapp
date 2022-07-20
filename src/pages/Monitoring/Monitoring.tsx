import { useTranslation } from 'react-i18next';

import PageLayout from 'components/PageLayout';
import RootNodeTable from 'components/Tables/RootNodeTable/RootNodeTable';
import ValidatorsTable from 'components/Tables/ValidatorsTable';

import CurrentInfo from './components/CurrentInfo';

const Monitoring = () => {
  const { t } = useTranslation();
  return (
    <PageLayout title={t('MONITORING')}>
      <CurrentInfo />
      <div>
        <ValidatorsTable tableType="validators-monitoring" />
        <RootNodeTable tableType="rootNodesMonitoring" />
      </div>
    </PageLayout>
  );
};

export default Monitoring;
