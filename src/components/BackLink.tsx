import { Link } from 'react-router-dom';

import { Icon } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

import Button from 'components/Button';

import { RoutePaths } from 'constants/routes';

interface Props {
  to: RoutePaths;
  text?: string;
}

const StyledLink = styled(Link)`
  .back-link__btn {
    margin-bottom: 8px;
  }
`;

function BackLink ({ to, text }: Props) {
  return (
    <StyledLink to={to}>
      <Button
        block
        compact
        alwaysEnabled
        className="back-link__btn"
        look="ghost"
      >
        <Icon name="arrow-left" />
        <span>{text}</span>
      </Button>
    </StyledLink>
  );
}

export default BackLink;
