import { media } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

export const ValidatorsOverviewContainer = styled.div`
    margin-top: 12px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    ${media.lessThan('medium')} {
      grid-template-columns: 1fr;
    }

    .field_item {
      display: grid;
      gap: 4px;
      align-content: start;
      padding: 24px ;

      ${media.lessThan('medium')} {
        padding: 8px 0;
      }

      &:not(:first-child) {
        ${media.greaterThan('medium')} {
          border-left: 1px solid ${({ theme }) => theme.colors.borderSecondary};
        }
      }
    }
`;
