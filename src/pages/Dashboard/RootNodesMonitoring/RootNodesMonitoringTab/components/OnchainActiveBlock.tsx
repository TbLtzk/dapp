import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Icon } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

import Button from 'components/Button';

import { useRootNodesMonitoring } from 'store/root-nodes/hooks';

import { RoutePaths } from 'constants/routes';

const StyledWrapper = styled.div<{$isEqual: boolean}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 16px 16px 24px;

  .onchain-active-block__val {
    margin-top: 4px;
    color: ${({ theme, $isEqual }) => $isEqual ? theme.colors.successMain : theme.colors.errorMain};
  }

  .onchain-active-block__sub-val {
    margin-top: 16px;
  }
`;

function OnchainActiveBlock () {
  const { t } = useTranslation();

  const { rootNodesOnchainDiffList } = useRootNodesMonitoring();

  const diffCount = useMemo(() => {
    return rootNodesOnchainDiffList
      .filter((i) => !i.isL0Active || !i.isOnchain)
      .length;
  }, [rootNodesOnchainDiffList]);

  const isEqualLists = useMemo(() => !diffCount, [diffCount]);

  return (
    <StyledWrapper className="block" $isEqual={isEqualLists}>
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
    </StyledWrapper>
  );
}

export default OnchainActiveBlock;
