import styled from 'styled-components';

export const VersionsContainer = styled.div`
  .version-group {
    border-top: 1px solid ${({ theme }) => theme.colors.blockDivider};
    padding-top: 16px;
  }

  .version-group-items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;
