import styled from 'styled-components';

export const LinksContainer = styled.div`
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.colors.blockBorder};
  padding-top: 16px;

  .ecosystem-link {
    display: flex;
    outline: none;

    &:hover {
      text-decoration: none;
    }
  }

  .ecosystem-link-icon {
  }
`;
