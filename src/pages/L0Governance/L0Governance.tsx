import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Icon } from '@q-dev/q-ui-kit';

import Button from 'components/Button';
import PageLayout from 'components/PageLayout';

import { StyledWrapper } from './styles';

import { RoutePaths } from 'constants/routes';

function L0Governance () {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('L0_GOVERNANCE')}>
      <StyledWrapper>
        <section className="l0-governance__hero block">
          <p className="l0-governance__eyebrow text-md font-semibold color-primary">
            {t('L0_GOVERNANCE')}
          </p>
          <h2 className="l0-governance__title text-h2">
            {t('L0_GOVERNANCE_LANDING_TITLE')}
          </h2>
          <p className="l0-governance__description text-lg color-secondary">
            {t('L0_GOVERNANCE_LANDING_DESCRIPTION')}
          </p>
          <Link to={RoutePaths.dashboardRootNodesMonitoring}>
            <Button
              alwaysEnabled
              className="l0-governance__monitoring-link"
            >
              <Icon name="dashboard" />
              <span>{t('OPEN_L0_MONITORING')}</span>
            </Button>
          </Link>
        </section>

        <section className="l0-governance__cards">
          <article className="l0-governance__card block">
            <h3 className="text-h3">{t('ROOT_LIST_GOVERNANCE')}</h3>
            <p className="text-md color-secondary">
              {t('ROOT_LIST_GOVERNANCE_DESCRIPTION')}
            </p>
          </article>

          <article className="l0-governance__card block">
            <h3 className="text-h3">{t('VALIDATOR_EXCLUSION_GOVERNANCE')}</h3>
            <p className="text-md color-secondary">
              {t('VALIDATOR_EXCLUSION_GOVERNANCE_DESCRIPTION')}
            </p>
          </article>
        </section>
      </StyledWrapper>
    </PageLayout>
  );
}

export default L0Governance;
