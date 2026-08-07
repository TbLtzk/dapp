import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { formatPercent } from '@q-dev/utils';
import styled from 'styled-components';
import { CosignatureStatus } from 'typings/root-nodes';

import { useL0GovernanceEligibility } from 'pages/L0Governance/hooks/L0GovernanceEligibilityContext';
import { useL0GovernanceActionGuard } from 'pages/L0Governance/hooks/useL0GovernanceActionGuard';
import { useL0GovernanceAdvisoryGuard } from 'pages/L0Governance/hooks/useL0GovernanceAdvisoryGuard';

import { useL0GovernanceActions } from '../../L0GovernanceActionsContext';
import { useRootNodesMonitoringContext } from '../../RootNodesMonitoringContext';
import { getActiveQuorumSigningProgress } from '../helpers/l0-quorum-signing-progress';

import GovernanceActionButton from './GovernanceActionButton';
import MonitoringGovernanceFooter from './MonitoringGovernanceFooter';

const StyledWrapper = styled.div<{$isActive: boolean}>`
  padding: 24px 24px 16px;

  .exclusion-proposed-block__val {
    margin-top: 4px;
    display: flex;
    gap: 8px;
  }

  .exclusion-proposed-block__val-percent {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .exclusion-proposed-block__sub-val-wrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }

  .exclusion-proposed-block__sub-val-active {
    color: ${({ theme, $isActive }) => $isActive
      ? theme.colors.successMain
      : theme.colors.errorMain
    };
  }
`;

interface Props {
  connectedCosignatureStatus: CosignatureStatus | null;
  showGovernanceActions: boolean;
}

function ExclusionProposedBlock ({ connectedCosignatureStatus, showGovernanceActions }: Props) {
  const { t } = useTranslation();
  const { status } = useL0GovernanceEligibility();

  const { rootNodesExclusionActive, rootNodesExclusionProposed, rootNodesL0Active } = useRootNodesMonitoringContext();
  const { cosignExclusionList } = useL0GovernanceActions();

  const {
    phase: cosignPhase,
    isLoadingProposed,
    hasProposed,
    hasAlreadySigned,
    isRefreshingAfterSubmit,
    cosignProposedExclusionList,
  } = cosignExclusionList;

  const hasExclusionProposedList = Boolean(rootNodesExclusionProposed);

  const isProposedListActive = useMemo(() => {
    if (!rootNodesExclusionActive || !rootNodesExclusionProposed) return false;
    return rootNodesExclusionProposed.exclusions.length === rootNodesExclusionActive.exclusions.length &&
      rootNodesExclusionProposed.exclusions.every(
        ({ mainAccount: proposedAccount }) =>
          rootNodesExclusionActive.exclusions
            .find(({ mainAccount: activeAccount }) => proposedAccount === activeAccount)
      );
  }, [rootNodesExclusionProposed, rootNodesExclusionActive]);

  const quorumSigningProgress = useMemo(
    () => getActiveQuorumSigningProgress({
      signers: rootNodesExclusionProposed?.signers ?? undefined,
      activeRoots: rootNodesL0Active?.roots ?? undefined,
      activeRootPercentage: rootNodesExclusionProposed?.activeRootPercentage,
    }),
    [rootNodesExclusionProposed, rootNodesL0Active],
  );

  const isCosignRunning = cosignPhase === 'running';

  const cosignGuard = useL0GovernanceActionGuard('cosign-exclusion', {
    phase: cosignPhase,
    isLoadingProposed,
    hasProposed,
    hasAlreadySigned,
    isSigningAddressUnavailable: status === 'signing-unavailable',
  });

  const { advisories: cosignAdvisories } = useL0GovernanceAdvisoryGuard('cosign-exclusion', {
    connectedCosignatureStatus,
  });

  const cosignButtonLabel = (() => {
    if (isCosignRunning) return t('L0_EXCLUSION_COSIGN_IN_PROGRESS');
    if (cosignPhase === 'success') return t('L0_EXCLUSION_COSIGN_SUBMITTED');
    return t('L0_EXCLUSION_COSIGN_PROPOSED_EXCLUSION_LIST');
  })();

  return (
    <StyledWrapper
      className="block"
      $isActive={isProposedListActive}
    >
      <div>
        <h2 className="text-lg">{t('PROPOSED_EXCLUSION_LIST')}</h2>
        <p className="exclusion-proposed-block__val text-xl">
          {hasExclusionProposedList
            ? (<>
              <span className="font-semibold">
                {t('NUMBER_SIGNED', {
                  currentCount: quorumSigningProgress.signedCount,
                  fullCount: quorumSigningProgress.quorumSize,
                })}
              </span>
              <span className="exclusion-proposed-block__val-percent">
                {formatPercent(quorumSigningProgress.percentage, 0)}
              </span>
            </>)
            : t('NO_LIST')
          }
        </p>
        {hasExclusionProposedList &&
          <div className="exclusion-proposed-block__sub-val-wrap">
            <p className="exclusion-proposed-block__sub-val-active text-sm font-regular">
              {isProposedListActive ? t('ACTIVE') : t('INACTIVE')}
            </p>
          </div>
        }
      </div>

      {showGovernanceActions && (
        <MonitoringGovernanceFooter>
          <GovernanceActionButton
            guard={cosignGuard}
            advisories={cosignAdvisories}
            loading={isCosignRunning || cosignGuard.isChecking || isRefreshingAfterSubmit}
            onClick={cosignProposedExclusionList}
          >
            {cosignButtonLabel}
          </GovernanceActionButton>
        </MonitoringGovernanceFooter>
      )}
    </StyledWrapper>
  );
}

export default ExclusionProposedBlock;
