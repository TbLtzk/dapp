import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { formatPercent } from '@q-dev/utils';
import styled from 'styled-components';

import { useL0GovernanceActionGuard } from 'pages/L0Governance/hooks/useL0GovernanceActionGuard';
import { useL0GovernanceAdvisoryGuard } from 'pages/L0Governance/hooks/useL0GovernanceAdvisoryGuard';
import { CosignatureStatus } from 'typings/root-nodes';

import { useL0GovernanceActions } from '../../L0GovernanceActionsContext';
import { useRootNodesMonitoringContext } from '../../RootNodesMonitoringContext';
import { getActiveQuorumSigningProgress } from '../helpers/l0-quorum-signing-progress';

import GovernanceActionButton from './GovernanceActionButton';
import MonitoringGovernanceFooter from './MonitoringGovernanceFooter';

const StyledWrapper = styled.div<{
  $isEqual: boolean;
  $isActive: boolean;
}>`
  padding: 24px 24px 16px;

  .l0-proposed-block__val {
    margin-top: 4px;
    display: flex;
    gap: 8px;
  }

  .l0-proposed-block__val-percent {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .l0-proposed-block__sub-val-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }

  .l0-proposed-block__sub-val--equal {
    color: ${({ theme, $isEqual }) => $isEqual
      ? theme.colors.successMain
      : theme.colors.errorMain
    };
  }

  .l0-proposed-block__sub-val--active {
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

function L0ProposedBlock ({ connectedCosignatureStatus, showGovernanceActions }: Props) {
  const { t } = useTranslation();

  const { rootNodesL0Active, rootNodesL0Proposed, rootNodesOnchainList } = useRootNodesMonitoringContext();
  const { cosignRootList } = useL0GovernanceActions();

  const {
    phase: cosignPhase,
    isLoadingProposed,
    hasProposed,
    hasAlreadySigned,
    isRefreshingAfterSubmit,
    cosignProposedRootList,
  } = cosignRootList;

  const hasRootNodesL0ProposedList = Boolean(rootNodesL0Proposed);

  const isProposedListActive = useMemo(() => {
    if (!rootNodesL0Proposed || !rootNodesL0Active) return false;
    return rootNodesL0Proposed.roots.length === rootNodesL0Active.roots.length &&
      rootNodesL0Proposed.roots.every(
        ({ mainAccount: proposedAccount }) =>
          rootNodesL0Active.roots.find(({ mainAccount: activeAccount }) => proposedAccount === activeAccount)
      );
  }, [rootNodesL0Proposed, rootNodesL0Active]);

  const isProposedEqualToOnchain = useMemo(() => {
    if (!rootNodesL0Proposed || !rootNodesOnchainList.length) return false;
    return rootNodesL0Proposed.roots.length === rootNodesOnchainList.length &&
      rootNodesL0Proposed.roots.every(
        ({ mainAccount: proposedAccount }) =>
          rootNodesOnchainList.find(onchainAccount => proposedAccount === onchainAccount)
      );
  }, [rootNodesOnchainList, rootNodesL0Proposed]);

  const quorumSigningProgress = useMemo(
    () => getActiveQuorumSigningProgress({
      signers: rootNodesL0Proposed?.signers ?? undefined,
      activeRoots: rootNodesL0Active?.roots ?? undefined,
      activeRootPercentage: rootNodesL0Proposed?.activeRootPercentage,
    }),
    [rootNodesL0Active, rootNodesL0Proposed],
  );

  const isCosignRunning = cosignPhase === 'running';

  const cosignGuard = useL0GovernanceActionGuard('cosign-root', {
    phase: cosignPhase,
    isLoadingProposed,
    hasProposed,
    hasAlreadySigned,
  });

  const { advisories: cosignAdvisories } = useL0GovernanceAdvisoryGuard('cosign-root', {
    connectedCosignatureStatus,
  });

  const cosignButtonLabel = (() => {
    if (isCosignRunning) return t('L0_COSIGN_IN_PROGRESS');
    if (cosignPhase === 'success') return t('L0_COSIGN_SUBMITTED');
    return t('L0_COSIGN_PROPOSED_ROOT_LIST');
  })();

  return (
    <StyledWrapper
      className="block"
      $isEqual={isProposedEqualToOnchain}
      $isActive={isProposedListActive}
    >
      <div>
        <h2 className="text-lg">{t('PROPOSED_ROOT_LIST')}</h2>
        <p className="l0-proposed-block__val text-xl">
          {hasRootNodesL0ProposedList
            ? (<>
              <span className="font-semibold">
                {t('NUMBER_SIGNED', {
                  currentCount: quorumSigningProgress.signedCount,
                  fullCount: quorumSigningProgress.quorumSize,
                })}
              </span>
              <span className="l0-proposed-block__val-percent">
                {formatPercent(quorumSigningProgress.percentage, 0)}
              </span>
            </>)
            : t('NO_LIST')
          }
        </p>
        {hasRootNodesL0ProposedList && (
          <div className="l0-proposed-block__sub-val-wrap">
            <Trans
              className="l0-proposed-block__sub-val text-sm font-light"
              i18nKey={isProposedEqualToOnchain ? 'EQUAL_TO_ONCHAIN_LIST' : 'NOT_EQUAL_TO_ONCHAIN_LIST'}
              parent="p"
              components={{
                accent: <span className="l0-proposed-block__sub-val--equal font-regular" />
              }}
            />
            <p className="l0-proposed-block__sub-val--active text-sm font-regular">
              {isProposedListActive ? t('ACTIVE') : t('INACTIVE')}
            </p>
          </div>
        )}
      </div>

      {showGovernanceActions && (
        <MonitoringGovernanceFooter>
          <GovernanceActionButton
            guard={cosignGuard}
            advisories={cosignAdvisories}
            loading={isCosignRunning || cosignGuard.isChecking || isRefreshingAfterSubmit}
            onClick={cosignProposedRootList}
          >
            {cosignButtonLabel}
          </GovernanceActionButton>
        </MonitoringGovernanceFooter>
      )}
    </StyledWrapper>
  );
}

export default L0ProposedBlock;
