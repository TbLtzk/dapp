import { media } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

export const StyledHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.blockBorder};
  height: 72px;
  background-color: ${(props) => props.theme.colors.block};
  
  .header__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px 32px;

    ${media.lessThan('medium')} {
      padding: 16px;
    }
  }

  .header__network {
    ${media.lessThan('medium')} {
      display: none;
    }
  }

  .header__menu {
    ${media.greaterThan('medium')} {
      display: none;
    }
  }

  .header__actions {
    display: flex;
    gap: 8px;
  }
`;
