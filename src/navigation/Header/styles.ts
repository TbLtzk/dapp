import styled from 'styled-components';

export const StyledHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.blockBorder};
  height: 72px;
  min-width: 832px;
  background-color: ${(props) => props.theme.colors.block};
  
  .header__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px 32px;
  }

  .header__actions {
    display: flex;
    gap: 8px;
  }
`;
