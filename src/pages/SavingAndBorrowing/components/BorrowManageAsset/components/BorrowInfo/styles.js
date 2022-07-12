
import styled from 'styled-components';

export const BorrowInfoContainer = styled.div`
  display: grid;
  gap: 8px;

  .info-group {
    border-top: 1px solid ${({ theme }) => theme.colors.blockDivider};
    padding-top: 8px;
  }

  .info-group-items {
    margin-top: 8px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
  }
`;
