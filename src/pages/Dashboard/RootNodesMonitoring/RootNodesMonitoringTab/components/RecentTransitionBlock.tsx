import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { formatPercent } from '@q-dev/utils';
import styled from 'styled-components';
import { ObservedCosignatureStatus } from 'typings/root-nodes';

import { useRootNodesMonitoringContext } from '../../RootNodesMonitoringContext';
import { getCosignatureStatusColor } from '../helpers/cosignature-status-colors';
import {
  COSIGNATURE_TRANSITION_BLOCK_DELTA,
  getCosignatureStatus,
} from '../helpers/table-collect-data';

import MonitoringGovernanceFooter from './MonitoringGovernanceFooter';

const SIGNED_PERCENTAGE_MINORITY = 50;

const presenceI18nKeyByStatus: Record<ObservedCosignatureStatus, string> = {
  online: 'RN_CONNECTED_PRESENCE_ONLINE',
  offline: 'RN_CONNECTED_PRESENCE_OFFLINE',
  'waiting-approval': 'RN_CONNECTED_PRESENCE_AWAITING',
};

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

const StyledConnectedPresence = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
`;

const StyledPresenceAccent = styled.span<{$status: ObservedCosignatureStatus}>`
  color: ${({ theme, $status }) => getCosignatureStatusColor(theme, $status)};
`;

interface Props {
  showGovernanceActions: boolean;
  connectedRootAccount?: string;
}

function RecentTransitionBlock ({ showGovernanceActions, connectedRootAccount }: Props) {
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

    if (delta >= COSIGNATURE_TRANSITION_BLOCK_DELTA) return null;

    const firstBlockSigned = latestCosignatureMetrics.byAddress
      .filter(({ lastObservedApproval }) => lastObservedApproval.block > 0)
      .length;

    const firstBlockSignedPercentage = firstBlockSigned / rootNodesL0ActiveCount * 100;
    const isMajorityOffline = firstBlockSignedPercentage <= SIGNED_PERCENTAGE_MINORITY;

    return {
      status: isMajorityOffline ? t('MAJORITY_IS_OFFLINE') : t('COLLECTING_APPROVALS'),
      isMajorityOffline: isMajorityOffline
    };
  }, [blockHeight, latestCosignatureMetrics, rootNodesL0ActiveCount, t]);

  const connectedPresenceStatus = useMemo((): ObservedCosignatureStatus | null => {
    if (!showGovernanceActions || !connectedRootAccount) return null;

    return getCosignatureStatus(connectedRootAccount, latestCosignatureMetrics, blockHeight);
  }, [blockHeight, connectedRootAccount, latestCosignatureMetrics, showGovernanceActions]);

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

      {connectedPresenceStatus && (
        <MonitoringGovernanceFooter className="monitoring-governance-footer--presence">
          <StyledConnectedPresence>
            <Trans
              i18nKey={presenceI18nKeyByStatus[connectedPresenceStatus]}
              components={{
                accent: <StyledPresenceAccent $status={connectedPresenceStatus} />,
              }}
            />
          </StyledConnectedPresence>
        </MonitoringGovernanceFooter>
      )}
    </StyledWrapper>
  );
}

export default RecentTransitionBlock;
