import { media } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

export const StyledWrapper = styled.div<{ gridArea: string }>`
  grid-area: ${({ gridArea }) => gridArea};

  .row {
    display: flex;
    width: 100%;
    margin-bottom: 20px;

    ${media.lessThan('medium')} {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    > * {
      &:first-child {
        width: 50%;

        ${media.lessThan('medium')} {
          width: auto;
        }
      }
      &:last-child {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;
