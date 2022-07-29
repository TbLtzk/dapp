import styled from 'styled-components';

export const AliasIcon = styled.span`
  display: grid;
  place-items: center;
  font-size: 8px;
  line-height: 1;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  color: ${(p) => p.theme.colors.textInverted};
  background-color: ${(p) => p.theme.palette === 'dark'
    ? p.theme.colors.success
    : p.theme.colors.textPrimary
  };
  font-weight: 600;
`;

export const TooltipContent = styled.div`
  .tooltip-address {
    display: inline-flex;
    font-weight: 600;
  }
`;
