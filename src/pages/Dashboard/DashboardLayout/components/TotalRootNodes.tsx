import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import Button from 'ui/Button';
import Icon from 'ui/Icon';

import useAnimateNumber from 'hooks/useAnimateNumber';

import { getRootMembers } from 'store/root-node/action-creators';
import { rootMembersSelector } from 'store/root-node/selectors';

import { RoutePaths } from 'constants/routes';
import { formatNumber } from 'utils/numbers';

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
  const dispatch = useDispatch();

  const rootNodes = useSelector(rootMembersSelector);
  const rootNodesRef = useAnimateNumber(rootNodes.length, ' ', val => formatNumber(val, 0));

  useEffect(() => {
    dispatch(getRootMembers());
  }, []);

  return (
    <StyledWrapper className="block">
      <div>
        <h2 className="text-lg">{t('TOTAL_ROOT_NODES')}</h2>
        <p ref={rootNodesRef} className="total-root__val text-xl font-semibold">0</p>
        <p className="total-root__inactive text-sm font-light">
          {t('INACTIVE_COUNT', { count: 0 })}
        </p>
      </div>

      <Link to={RoutePaths.dahboardRootNodesMonitoring}>
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
