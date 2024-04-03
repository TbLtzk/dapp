import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { formatPercent } from '@q-dev/utils';
import styled from 'styled-components';

import { useRootNodesMonitoringContext } from '../../RootNodesMonitoringContext';

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

function ExclusionProposedBlock () {
  const { t } = useTranslation();

  const { rootNodesExclusionActive, rootNodesExclusionProposed, rootNodesL0Active } = useRootNodesMonitoringContext();

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
    </StyledWrapper>
  );
}

export default ExclusionProposedBlock;
