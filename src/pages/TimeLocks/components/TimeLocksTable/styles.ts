import styled from 'styled-components';

export const TimeLocksTableContent = styled.div`
  display: grid;
  gap: 16px;
  
  .time-locks-block {
    padding-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.blockDivider};
  }
`;

export const ContentWrap = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: baseline;
  gap: 16px;
`;

export const BalanceValueWrap = styled.div`
  display: grid;
  gap: 4px;
  margin-bottom: 16px;
`;
