import { media } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

export const LinksContainer = styled.div`
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.colors.blockBorder};
  padding-top: 16px;

  // TODO: Remove when aliasing link is removed from sidebar
  ${media.lessThan('huge')} {
    padding-top: 8px;
  }

  .ecosystem-link {
    display: flex;
    outline: none;

    &:hover {
      text-decoration: none;
    }
  }
`;
