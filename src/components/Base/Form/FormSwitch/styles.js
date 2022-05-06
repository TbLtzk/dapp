import styled from 'styled-components';

export const SwitcherWrapper = styled.div`
  display: flex;
  font-size: 15px;
  padding-top: 0.5rem;

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

  .custom-switch .custom-control-input:checked ~ .custom-control-label::after {
    background-color: ${(props) => {
    if (props.palette === 'dark') {
      return props.theme.colors.oxfordBlueTint1;
    } else {
      return props.theme.colors.white;
    }
  }};
  }
  
`;
