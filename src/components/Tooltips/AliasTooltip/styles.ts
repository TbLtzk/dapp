import styled from 'styled-components';

export const AliasIcon = styled.span`
  display: grid;
  place-items: center;
  font-size: 8px;
  line-height: 1;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.buttonTextPrimary};
  background-color: ${({ theme }) => theme.colors.successMain};
  font-weight: 600;
`;

export const TooltipContent = styled.div`
  .tooltip-address {
    display: inline-flex;
    font-weight: 600;
  }
`;
