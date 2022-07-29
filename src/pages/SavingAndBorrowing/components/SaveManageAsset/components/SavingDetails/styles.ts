
import styled from 'styled-components';

export const SavingDetailsContainer = styled.div`
  display: grid;
  gap: 8px;

  .details-group {
    border-top: 1px solid ${({ theme }) => theme.colors.blockDivider};
    padding-top: 8px;
  }

  .details-group-items {
    margin-top: 8px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
  }
`;
