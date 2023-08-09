import { useTranslation } from 'react-i18next';

import BackLink from 'components/BackLink';

import { RoutePaths } from 'constants/routes';

function DashboardLink () {
  const { t } = useTranslation();

  return (
    <BackLink to={RoutePaths.dashboard} text={t('DASHBOARD')} />
  );
}

export default DashboardLink;
