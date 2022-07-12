import styled from 'styled-components';

export const BalanceCardContent = styled.div`
  display: grid;
  gap: 16px;
  
  .balance-card-block {
    display: grid;
    gap: 16px;
    padding-top: 16px;
    border-top: 1px solid ${({ theme }) => theme.colors.blockDivider};
  }
`;
