import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Icon } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

import Button from 'components/Button';

import { RoutePaths } from 'constants/routes';

const StyledLink = styled(Link)`
  .dashboard-link__btn {
    margin-bottom: 8px;
  }
`;

function DashboardLink () {
  const { t } = useTranslation();

  return (
    <StyledLink to={RoutePaths.dashboard}>
      <Button
        block
        compact
        alwaysEnabled
        className="dashboard-link__btn"
        look="ghost"
      >
        <Icon name="arrow-left" />
        <span>{t('DASHBOARD')}</span>
      </Button>
    </StyledLink>
  );
}

export default DashboardLink;
