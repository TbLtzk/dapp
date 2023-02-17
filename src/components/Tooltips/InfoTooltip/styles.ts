import styled from 'styled-components';

export const InfoIcon = styled.i`
  font-size: 16px;
  line-height: 1;
  padding: 0 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 200ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;
