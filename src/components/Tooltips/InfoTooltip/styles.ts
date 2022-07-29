import styled from 'styled-components';

export const InfoIcon = styled.i`
  font-size: 16px;
  line-height: 1;
  padding: 0 8px;
  color: ${(p) => p.theme.colors.textDisabled};
  transition: all 200ms ease;

  &:hover {
    color: ${(p) => p.theme.colors.textPrimary};
  }
`;
