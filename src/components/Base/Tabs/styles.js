import styled from 'styled-components';

import { indents } from 'constants/style';

export const TabsStyle = styled.div`
  .tabs__titles {
    display: flex;
    .tab__title {
      cursor: pointer;
      padding: 6px 12px 12px 0;
    }

    .active {
      color: ${(p) => p.theme.colors.neonGreen};
    }
  }

  .tabs__content {
    display: grid;
    grid-template-columns: minmax(100px, 2fr) minmax(100px, 1fr);
    grid-column-gap: ${indents['15']};

    .title {
      display: flex;
    }

    .tab__content {
      display: none;
    }

    .active {
      display: block;
    }
  }
`;
