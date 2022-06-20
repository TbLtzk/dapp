import styled, { css } from 'styled-components';

export const StepsWrapper = styled.div`
  ${(p: { $step: number }) => css`
    & > *:not(:nth-child(${p.$step})) {
      display: none;
    }
  `}
`;
