import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Icon } from '@q-dev/q-ui-kit';
import { useAnimateNumber } from '@q-dev/react-hooks';
import { formatNumber } from '@q-dev/utils';
import styled from 'styled-components';

import Button from 'components/Button';

import { useRootNodes } from 'store/root-nodes/hooks';

import { RoutePaths } from 'constants/routes';

const StyledWrapper = styled.div`
  grid-area: total-root;
  padding: 24px 16px 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .total-root__val {
    margin-top: 4px;
  }

  .total-root__inactive {
    margin-top: 16px;
  }
`;

function TotalRootNodes () {
  const { t } = useTranslation();
  const { rootMembers, getRootMembers } = useRootNodes();
  const rootNodesRef = useAnimateNumber(rootMembers.length, ' ', val => formatNumber(val, 0));

  useEffect(() => {
    getRootMembers();
  }, []);

  return (
    <StyledWrapper className="block">
      <div>
        <h2 className="text-lg">{t('TOTAL_ROOT_NODES')}</h2>
        <p ref={rootNodesRef} className="total-root__val text-xl font-semibold">0</p>
        <p className="total-root__inactive text-sm font-light">
          {t('INACTIVE_COUNT', { value: 0 })}
        </p>
      </div>

      <Link to={RoutePaths.dashboardRootNodesMonitoring}>
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

export default TotalRootNodes;
