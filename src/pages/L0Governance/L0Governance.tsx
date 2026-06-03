import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Icon } from '@q-dev/q-ui-kit';

import Button from 'components/Button';
import PageLayout from 'components/PageLayout';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { useCosignProposedRootList } from './hooks/useCosignProposedRootList';
import { useL0GovernanceEligibility } from './hooks/useL0GovernanceEligibility';
import { useProposeExclusionListTimestampRefresh } from './hooks/useProposeExclusionListTimestampRefresh';
import { useProposeOnchainPanelRootList } from './hooks/useProposeOnchainPanelRootList';
import { StyledWrapper } from './styles';

import { RoutePaths } from 'constants/routes';

function L0Governance () {
  const { t } = useTranslation();
  const { featureFlags } = useNetworkConfig();
  const l0GovernanceEligibility = useL0GovernanceEligibility();
  const {
    phase: proposePhase,
    isGovPubAvailable: isProposeGovPubAvailable,
    isCheckingGovPub: isCheckingProposeGovPub,
    submittedProposalHash,
    proposeFromOnchainPanel,
  } = useProposeOnchainPanelRootList();
  const {
    phase: cosignPhase,
    isGovPubAvailable: isCosignGovPubAvailable,
    isCheckingGovPub: isCheckingCosignGovPub,
    isLoadingProposed,
    hasProposed,
    hasAlreadySigned,
    submittedAttestationHash,
    cosignProposedRootList,
  } = useCosignProposedRootList();
  const {
    phase: exclusionProposePhase,
    isGovPubAvailable: isExclusionGovPubAvailable,
    isCheckingGovPub: isCheckingExclusionGovPub,
    isLoadingActive,
    hasActive,
    submittedProposalHash: submittedExclusionProposalHash,
    proposeExclusionListTimestampRefresh,
  } = useProposeExclusionListTimestampRefresh();

  const isEligibleForSigning = (
    l0GovernanceEligibility.status === 'eligible-root' ||
    l0GovernanceEligibility.status === 'eligible-alias'
  );

  const isGovPubAvailable = (
    isProposeGovPubAvailable ??
    isCosignGovPubAvailable ??
    isExclusionGovPubAvailable
  );
  const isCheckingGovPub = (
    isCheckingProposeGovPub ||
    isCheckingCosignGovPub ||
    isCheckingExclusionGovPub
  );

  const isProposeRunning = proposePhase === 'running';
  const isProposeDisabled = (
    !featureFlags.l0Governance ||
    !isEligibleForSigning ||
    isCheckingGovPub ||
    isGovPubAvailable === false ||
    isProposeRunning ||
    proposePhase === 'success'
  );

  const isCosignRunning = cosignPhase === 'running';
  const isCosignDisabled = (
    !featureFlags.l0Governance ||
    !isEligibleForSigning ||
    isCheckingGovPub ||
    isLoadingProposed ||
    isGovPubAvailable === false ||
    !hasProposed ||
    hasAlreadySigned ||
    isCosignRunning ||
    cosignPhase === 'success'
  );

  const proposeButtonLabel = (() => {
    if (isProposeRunning) return t('L0_PROPOSE_IN_PROGRESS');
    if (proposePhase === 'success') return t('L0_PROPOSE_SUBMITTED');
    return t('L0_PROPOSE_FROM_ONCHAIN_PANEL');
  })();

  const cosignButtonLabel = (() => {
    if (isCosignRunning) return t('L0_COSIGN_IN_PROGRESS');
    if (cosignPhase === 'success') return t('L0_COSIGN_SUBMITTED');
    return t('L0_COSIGN_PROPOSED_ROOT_LIST');
  })();

  const isExclusionProposeRunning = exclusionProposePhase === 'running';
  const isExclusionProposeDisabled = (
    !featureFlags.l0Governance ||
    !isEligibleForSigning ||
    isCheckingGovPub ||
    isLoadingActive ||
    isGovPubAvailable === false ||
    !hasActive ||
    isExclusionProposeRunning ||
    exclusionProposePhase === 'success'
  );

  const exclusionProposeButtonLabel = (() => {
    if (isExclusionProposeRunning) return t('L0_EXCLUSION_PROPOSE_IN_PROGRESS');
    if (exclusionProposePhase === 'success') return t('L0_EXCLUSION_PROPOSE_SUBMITTED');
    return t('L0_EXCLUSION_PROPOSE_REFRESH_TIMESTAMP');
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
              {!isLoadingProposed && !hasProposed && isEligibleForSigning && (
                <p className="text-sm color-secondary">{t('L0_COSIGN_NO_PROPOSAL')}</p>
              )}
              {hasAlreadySigned && (
                <p className="text-sm color-secondary">{t('L0_COSIGN_ALREADY_SIGNED')}</p>
              )}
              {proposePhase === 'success' && submittedProposalHash && (
                <p className="text-sm color-secondary">
                  {t('L0_PROPOSE_SUCCESS_HASH', { hash: submittedProposalHash })}
                </p>
              )}
              {cosignPhase === 'success' && submittedAttestationHash && (
                <p className="text-sm color-secondary">
                  {t('L0_COSIGN_SUCCESS_HASH', { hash: submittedAttestationHash })}
                </p>
              )}
              <div className="l0-governance__actions">
                <Button
                  alwaysEnabled={isEligibleForSigning && featureFlags.l0Governance}
                  disabled={isProposeDisabled}
                  loading={isProposeRunning}
                  onClick={proposeFromOnchainPanel}
                >
                  {proposeButtonLabel}
                </Button>
                <Button
                  alwaysEnabled={isEligibleForSigning && featureFlags.l0Governance}
                  disabled={isCosignDisabled}
                  loading={isCosignRunning}
                  onClick={cosignProposedRootList}
                >
                  {cosignButtonLabel}
                </Button>
              </div>
            </article>

            <article className="l0-governance__card block">
              <h3 className="text-h3">{t('VALIDATOR_EXCLUSION_GOVERNANCE')}</h3>
              <p className="text-md color-secondary">
                {t('VALIDATOR_EXCLUSION_GOVERNANCE_DESCRIPTION')}
              </p>
              {isGovPubAvailable === false && (
                <p className="text-sm color-secondary">{t('L0_PROPOSE_RPC_UNSUPPORTED')}</p>
              )}
              {!isLoadingActive && !hasActive && isEligibleForSigning && (
                <p className="text-sm color-secondary">{t('L0_EXCLUSION_PROPOSE_NO_ACTIVE')}</p>
              )}
              {exclusionProposePhase === 'success' && submittedExclusionProposalHash && (
                <p className="text-sm color-secondary">
                  {t('L0_EXCLUSION_PROPOSE_SUCCESS_HASH', { hash: submittedExclusionProposalHash })}
                </p>
              )}
              <Button
                alwaysEnabled={isEligibleForSigning && featureFlags.l0Governance}
                disabled={isExclusionProposeDisabled}
                loading={isExclusionProposeRunning}
                onClick={proposeExclusionListTimestampRefresh}
              >
                {exclusionProposeButtonLabel}
              </Button>
            </article>
          </section>
        </StyledWrapper>
      </PageLayout>
    </>
  );
}

export default L0Governance;
