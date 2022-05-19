import styled, { css } from 'styled-components';

export const StepsWrapper = styled.div`
  ${(p) => css`
    & > *:not(:nth-child(${p.$step})) {
      display: none;
    }
  `}
`;
