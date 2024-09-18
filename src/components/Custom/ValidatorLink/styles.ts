import styled from 'styled-components';

export const StyledValidatorLink = styled.a`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  color: ${({ theme }) => theme.colors.textSecondary};
  padding-right: 4px;
  transition: all 200ms ease;
  font-size: 14px;
  line-height: 1;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    text-decoration: underline;
  }

  .validator-link__icon {
    font-size: 14px;
    line-height: 1;
  }
`;
