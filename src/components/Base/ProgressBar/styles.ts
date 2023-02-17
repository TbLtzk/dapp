import styled from 'styled-components';

export const ProgressBarWrapper = styled.span<{ value: number }>`
  display: flex;
  align-items: center;
  &::before {
    display: inline-block;
    content: '';
    border-radius: 0.375rem;
    height: 8px;
    width: 8px;
    margin-right: 4px;
    background-color: ${(props) => {
      if (props.value <= 80) return props.theme.colors.successMain;
      if (props.value <= 98) return props.theme.colors.warningPrimary;
      return props.theme.colors.errorMain;
    }};
  }
`;
