import styled from 'styled-components';

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 32px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.blockBorder};
  height: 72px;
  min-width: 832px;

  .header-actions {
    display: flex;
    gap: 8px;
  }
`;
