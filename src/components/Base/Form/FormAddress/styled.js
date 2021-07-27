import styled from 'styled-components'

export const AddressWrapper = styled.div`
    width: 100%;
    & input {
    background-color: ${(props) => {
        if (props.palette === 'dark') {
            return props.theme.colors.oxfordBlueTint1;
        } else {
            return 'transparent';
        }
    }};
    &:focus {
      outline: none;
      background: ${(props) => {
        if (props.palette === 'dark') {
            return props.theme.colors.oxfordBlueTint1;
        } else {
            return 'transparent';
        }
    }};
      color: ${(props) => {
        if (props.palette === 'dark') {
            return props.theme.colors.white;
        } else {
            return props.theme.colors.black;
        }
    }}
    }
  }
`