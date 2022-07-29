import styled from 'styled-components';

export const ProgressBarWrapper = styled.span<{ value: number }>`
  display: flex;
  align-items: center;
  span {
    background-color: ${(props) => {
      if (props.value <= 80) return props.theme.colors.success;
      if (props.value <= 98) return props.theme.colors.warning;
      return props.theme.colors.error;
    }};
    height: 8px;
    width: 8px;
    margin-right: 10px;
    border-radius: 4px;
  }
`;
