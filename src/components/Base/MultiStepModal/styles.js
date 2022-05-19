import styled, { css } from 'styled-components';

export const StepsWrapper = styled.div`
  display: contents;

  ${(p) => css`
    & > div {
      display: contents;

      &:not(:nth-child(${p.$step})) {
        display: none;
      }
    }
  `}
`;
