import styled from 'styled-components';

export const ProgressBarWrapper = styled.span`
  display: flex;
  align-items: center;
  span {
    background-color: ${(props) =>
    props.value <= 80
      ? props.theme.colors.neonGreen
      : props.value < 98
        ? props.theme.colors.validationError
        : props.theme.colors.red};
    height: 8px;
    width: 30px;
    margin: 0px 10px 5px;
    border-radius: 4px;
  }
`;
