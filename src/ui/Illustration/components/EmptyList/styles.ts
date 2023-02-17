import styled from 'styled-components';

export const StyledEmptyList = styled.svg`
  .bg {
    fill: ${({ theme }) => theme.colors.listBackgroundPrimary};
  }

  .item-bg {
    fill: ${({ theme }) => theme.colors.listBackgroundSecondary};
  }

  .item-primary {
    fill: ${({ theme }) => theme.colors.listPrimary};
  }

  .item-secondary {
    fill: ${({ theme }) => theme.colors.listSecondary};
  }
`;
