import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { formatPercent } from '@q-dev/utils';
import styled from 'styled-components';

import Button from 'components/Button';

import { useL0GovernanceActions } from '../../L0GovernanceActionsContext';
import { useRootNodesMonitoringContext } from '../../RootNodesMonitoringContext';

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
  showGovernanceActions: boolean;
}

function ExclusionProposedBlock ({ showGovernanceActions }: Props) {
  const { t } = useTranslation();

  const { rootNodesExclusionActive, rootNodesExclusionProposed, rootNodesL0Active } = useRootNodesMonitoringContext();
  const { cosignExclusionList } = useL0GovernanceActions();

  const {
    phase: cosignPhase,
    isGovPubAvailable,
    isCheckingGovPub,
    isLoadingProposed,
    hasProposed,
    hasAlreadySigned,
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

  const signersPercentage = useMemo(() => {
    if (rootNodesExclusionProposed?.signers?.length && rootNodesL0Active?.roots.length) {
      return rootNodesExclusionProposed.signers.length * 100 / rootNodesL0Active.roots.length;
    }

    return 0;
  }, [rootNodesExclusionProposed, rootNodesL0Active]);

  const isCosignRunning = cosignPhase === 'running';
  const isCosignDisabled = (
    isCheckingGovPub ||
    isLoadingProposed ||
    isGovPubAvailable === false ||
    !hasProposed ||
    hasAlreadySigned ||
    isCosignRunning ||
    cosignPhase === 'success'
  );

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
                  currentCount: rootNodesExclusionProposed?.signers?.length || 0,
                  fullCount: rootNodesL0Active?.roots.length || 0
                })}
              </span>
              <span className="exclusion-proposed-block__val-percent">
                {formatPercent(signersPercentage, 0)}
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
          <Button
            alwaysEnabled
            compact
            disabled={isCosignDisabled}
            loading={isCosignRunning}
            onClick={cosignProposedExclusionList}
          >
            {cosignButtonLabel}
          </Button>
        </MonitoringGovernanceFooter>
      )}
    </StyledWrapper>
  );
}

export default ExclusionProposedBlock;
