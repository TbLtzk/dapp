import styled from 'styled-components';

export const CheckWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: 'OpenSans', sans-serif;
  line-height: 1;

  .form-check {
    padding-left: 0;
  }
  
  input,
  label {
    cursor: pointer;
    margin: 0;
  }

  label {
    margin-bottom: 0;
    margin-left: 0.5rem;
  }

  .custom-control-input:checked ~ .custom-control-label::before {
    border-color: ${(props) => {
    if (props.palette === 'dark') {
      return props.theme.colors.white;
    } else {
      return props.theme.colors.oxfordBlueTint1;
    }
  }};
    background-color: ${(props) => {
    if (props.palette === 'dark') {
      return props.theme.colors.white;
    } else {
      return props.theme.colors.oxfordBlueTint1;
    }
  }};
  }

  .custom-check .custom-control-input:checked ~ .custom-control-label::after {
    background-color: ${(props) => {
    if (props.palette === 'dark') {
      return props.theme.colors.oxfordBlueTint1;
    } else {
      return props.theme.colors.white;
    }
  }};
  }
`;
