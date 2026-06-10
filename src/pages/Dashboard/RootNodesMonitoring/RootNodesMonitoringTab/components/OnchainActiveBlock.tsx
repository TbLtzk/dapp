import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Icon } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

import Button from 'components/Button';
import { useL0GovernanceActionGuard } from 'pages/L0Governance/hooks/useL0GovernanceActionGuard';

import { useL0GovernanceActions } from '../../L0GovernanceActionsContext';
import { useRootNodesMonitoringContext } from '../../RootNodesMonitoringContext';

import GovernanceActionButton from './GovernanceActionButton';
import MonitoringGovernanceFooter from './MonitoringGovernanceFooter';

import { RoutePaths } from 'constants/routes';

const StyledWrapper = styled.div<{$isEqual: boolean}>`
  padding: 24px 16px 16px 24px;

  .onchain-active-block__main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .onchain-active-block__val {
    margin-top: 4px;
    color: ${({ theme, $isEqual }) => $isEqual ? theme.colors.successMain : theme.colors.errorMain};
  }

  .onchain-active-block__sub-val {
    margin-top: 16px;
  }
`;

interface Props {
  showGovernanceActions: boolean;
}

function OnchainActiveBlock ({ showGovernanceActions }: Props) {
  const { t } = useTranslation();

  const { rootNodesOnchainDiffList, rootNodesOnchainList } = useRootNodesMonitoringContext();
  const { proposeRootList } = useL0GovernanceActions();

  const {
    phase: proposePhase,
    proposeFromOnchainPanel,
  } = proposeRootList;

  const diffCount = useMemo(() => {
    return rootNodesOnchainDiffList
      .filter((i) => !i.isL0Active || !i.isOnchain)
      .length;
  }, [rootNodesOnchainDiffList]);

  const isEqualLists = useMemo(() => !diffCount, [diffCount]);

  const isProposeRunning = proposePhase === 'running';

  const proposeGuard = useL0GovernanceActionGuard('propose-root', {
    phase: proposePhase,
    isOnchainPanelEmpty: rootNodesOnchainList.length === 0,
  });

  const proposeButtonLabel = (() => {
    if (isProposeRunning) return t('L0_PROPOSE_IN_PROGRESS');
    if (proposePhase === 'success') return t('L0_PROPOSE_SUBMITTED');
    return t('L0_PROPOSE_FROM_ONCHAIN_PANEL');
  })();

  return (
    <StyledWrapper className="block" $isEqual={isEqualLists}>
      <div className="onchain-active-block__main">
        <div>
          <h2 className="text-lg">{t('ONCHAIN_ACTIVE_LISTS')}</h2>
          <p className="onchain-active-block__val text-xl font-semibold">
            {isEqualLists ? t('EQUAL_LISTS_STATUS') : t('NOT_EQUAL_LISTS_STATUS')}
          </p>
          <Trans
            className="onchain-active-block__sub-val text-sm font-light"
            i18nKey="DIFFERENCES_COUNT"
            parent="p"
            values={{ count: diffCount }}
            components={{
              countWrapper: <span className="font-regular" />
            }}
          />
        </div>

        <Link to={RoutePaths.dashboardRootNodesMonitoringOnchainActiveDifference}>
          <Button
            icon
            alwaysEnabled
            block
            look="ghost"
          >
            <Icon name="chevron-right" />
          </Button>
        </Link>
      </div>

      {showGovernanceActions && (
        <MonitoringGovernanceFooter>
          <GovernanceActionButton
            guard={proposeGuard}
            loading={isProposeRunning || proposeGuard.isChecking}
            onClick={proposeFromOnchainPanel}
          >
            {proposeButtonLabel}
          </GovernanceActionButton>
        </MonitoringGovernanceFooter>
      )}
    </StyledWrapper>
  );
}

export default OnchainActiveBlock;
