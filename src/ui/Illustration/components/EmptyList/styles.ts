import styled from 'styled-components';

import { getEmptyListColor } from './colors';

export const StyledEmptyList = styled.svg`
  .bg {
    fill: ${({ theme }) => getEmptyListColor(theme, 'bg')};
  }

  .item-bg {
    fill: ${({ theme }) => getEmptyListColor(theme, 'itemBg')};
  }

  .item-primary {
    fill: ${({ theme }) => getEmptyListColor(theme, 'itemPrimary')};
  }

  .item-secondary {
    fill: ${({ theme }) => getEmptyListColor(theme, 'itemSecondary')};
  }
`;
