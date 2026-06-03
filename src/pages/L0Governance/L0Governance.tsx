import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Icon } from '@q-dev/q-ui-kit';

import Button from 'components/Button';
import PageLayout from 'components/PageLayout';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { useL0GovernanceEligibility } from './hooks/useL0GovernanceEligibility';
import { useProposeOnchainPanelRootList } from './hooks/useProposeOnchainPanelRootList';
import { StyledWrapper } from './styles';

import { RoutePaths } from 'constants/routes';

function L0Governance () {
  const { t } = useTranslation();
  const { featureFlags } = useNetworkConfig();
  const l0GovernanceEligibility = useL0GovernanceEligibility();
  const {
    phase,
    isGovPubAvailable,
    isCheckingGovPub,
    submittedProposalHash,
    proposeFromOnchainPanel,
  } = useProposeOnchainPanelRootList();

  const isEligibleForSigning = (
    l0GovernanceEligibility.status === 'eligible-root' ||
    l0GovernanceEligibility.status === 'eligible-alias'
  );

  const isProposeRunning = phase === 'running';
  const isProposeDisabled = (
    !featureFlags.l0Governance ||
    !isEligibleForSigning ||
    isCheckingGovPub ||
    isGovPubAvailable === false ||
    isProposeRunning ||
    phase === 'success'
  );

  const proposeButtonLabel = (() => {
    if (isProposeRunning) return t('L0_PROPOSE_IN_PROGRESS');
    if (phase === 'success') return t('L0_PROPOSE_SUBMITTED');
    return t('L0_PROPOSE_FROM_ONCHAIN_PANEL');
  })();

  return (
    <>
      <Link to={RoutePaths.dashboardRootNodesMonitoring}>
        <Button
          alwaysEnabled
          compact
          look="ghost"
          style={{ marginBottom: '24px' }}
        >
          <Icon name="arrow-left" />
          <span>{t('GO_TO_ROOT_NODES_MONITORING')}</span>
        </Button>
      </Link>
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
          </section>

          <section className="l0-governance__cards">
            <article className="l0-governance__card block">
              <h3 className="text-h3">{t('ROOT_LIST_GOVERNANCE')}</h3>
              <p className="text-md color-secondary">
                {t('ROOT_LIST_GOVERNANCE_DESCRIPTION')}
              </p>
              {isGovPubAvailable === false && (
                <p className="text-sm color-secondary">{t('L0_PROPOSE_RPC_UNSUPPORTED')}</p>
              )}
              {phase === 'success' && submittedProposalHash && (
                <p className="text-sm color-secondary">
                  {t('L0_PROPOSE_SUCCESS_HASH', { hash: submittedProposalHash })}
                </p>
              )}
              <Button
                alwaysEnabled={isEligibleForSigning && featureFlags.l0Governance}
                disabled={isProposeDisabled}
                loading={isProposeRunning}
                onClick={proposeFromOnchainPanel}
              >
                {proposeButtonLabel}
              </Button>
            </article>

            <article className="l0-governance__card block">
              <h3 className="text-h3">{t('VALIDATOR_EXCLUSION_GOVERNANCE')}</h3>
              <p className="text-md color-secondary">
                {t('VALIDATOR_EXCLUSION_GOVERNANCE_DESCRIPTION')}
              </p>
              <Button alwaysEnabled={isEligibleForSigning} disabled={!isEligibleForSigning}>
                {t('L0_SIGNING_COMING_SOON')}
              </Button>
            </article>
          </section>
        </StyledWrapper>
      </PageLayout>
    </>
  );
}

export default L0Governance;
