import styled from 'styled-components';

export const InfoIcon = styled.i`
  font-size: 16px;
  line-height: 1;
  padding: 0 8px;
  color: ${(p) => p.theme.palette === 'dark' || p.$invertedColors
    ? p.theme.colors.oxfordBlueTint3
    : p.theme.colors.oxfordBlueTint2
  };
  transition: all 200ms ease;

  &:hover {
    color: ${(p) => p.$invertedColors
      ? p.theme.colors.oxfordBlueTint1
      : p.theme.colors.white
    };
  }
`;
