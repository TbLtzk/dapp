import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { formatPercent } from '@q-dev/utils';
import styled from 'styled-components';

import { useRootNodesMonitoringContext } from '../../RootNodesMonitoringContext';

const BLOCK_DELTA = 10;
const SIGNED_PERCENTAGE_MINORITY = 50;

const StyledWrapper = styled.div<{$isSignedMinority: boolean}>`
  padding: 24px 24px 16px;

  .recent-transition-block__val {
    margin-top: 4px;
    display: flex;
    gap: 8px;
  }

  .recent-transition-block__val-percent {
    color: ${({ theme, $isSignedMinority }) => $isSignedMinority ? theme.colors.errorMain : theme.colors.textSecondary};
  }

  .recent-transition-block__sub-val-status {
    margin-top: 16px;
  }
`;

const StyledApprovalStatus = styled.p<{$isMajorityOffline: boolean}>`
  color: ${({ theme, $isMajorityOffline }) => $isMajorityOffline ? theme.colors.errorMain : theme.colors.warningPrimary};
`;

function RecentTransitionBlock () {
  const { t } = useTranslation();

  const { latestCosignatureMetrics, rootNodesL0Active, blockHeight } = useRootNodesMonitoringContext();

  const rootNodesL0ActiveCount = useMemo(() => {
    return rootNodesL0Active?.roots.length || 0;
  }, [rootNodesL0Active]);

  const lastBlockSigned = useMemo(() => {
    if (!latestCosignatureMetrics) return 0;
    return latestCosignatureMetrics.byAddress
      .filter(({ lastObservedApproval }) =>
        lastObservedApproval.block === latestCosignatureMetrics.lastTransitionBlock)
      .length;
  }, [latestCosignatureMetrics]);

  const signedPercentage = useMemo(() => {
    if (!lastBlockSigned || !rootNodesL0ActiveCount) return 0;
    return lastBlockSigned / rootNodesL0ActiveCount * 100;
  }, [lastBlockSigned, rootNodesL0ActiveCount]);

  const isSignedMinority = useMemo(() => {
    return signedPercentage <= SIGNED_PERCENTAGE_MINORITY;
  }, [signedPercentage]);

  const approvalStatus = useMemo(() => {
    if (!blockHeight || !rootNodesL0ActiveCount || !latestCosignatureMetrics) return null;
    const delta = blockHeight - latestCosignatureMetrics.lastTransitionBlock;

    if (delta >= BLOCK_DELTA) return null;

    const firstBlockSigned = latestCosignatureMetrics.byAddress
      .filter(({ firstObservedApproval }) =>
        firstObservedApproval.block === latestCosignatureMetrics.firstTransitionBlock)
      .length;

    const firstBlockSignedPercentage = firstBlockSigned / rootNodesL0ActiveCount * 100;
    const isMajorityOffline = firstBlockSignedPercentage <= SIGNED_PERCENTAGE_MINORITY;

    return {
      status: isMajorityOffline ? t('MAJORITY_IS_OFFLINE') : t('COLLECTING_APPROVALS'),
      isMajorityOffline: isMajorityOffline
    };
  }, [blockHeight, latestCosignatureMetrics, rootNodesL0ActiveCount, t]);

  return (
    <StyledWrapper className="block" $isSignedMinority={isSignedMinority}>
      <div>
        <h2 className="text-lg">{t('RECENT_TRANSITION_BLOCK')}</h2>
        <p className="recent-transition-block__val text-xl">
          <span className="font-semibold">
            {t('NUMBER_SIGNED', {
              currentCount: lastBlockSigned,
              fullCount: rootNodesL0ActiveCount
            })}
          </span>
          <span className="recent-transition-block__val-percent">
            {formatPercent(signedPercentage, 0)}
          </span>
        </p>
        {approvalStatus && (
          <StyledApprovalStatus
            className="recent-transition-block__sub-val-status text-sm font-regular"
            $isMajorityOffline={approvalStatus.isMajorityOffline}
          >
            {approvalStatus.status}
          </StyledApprovalStatus>
        )}
      </div>
    </StyledWrapper>
  );
}

export default RecentTransitionBlock;
