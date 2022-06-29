import styled from 'styled-components';

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 32px 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.oxfordBlueTint2};
  height: 72px;

  .header-actions {
    display: flex;
    gap: 8px;
  }
`;
