import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const ButtonCustom = styled(Button)`
  align-items: center;
  width: ${(props) => (!props.width ? 'auto' : props.width)};
  max-width: ${(props) => (!props.width ? 'auto' : props.width)};
  min-width: ${(props) => (!props.width ? 'auto' : props.width)};
  padding: 7px 11px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 13px;
  line-height: 18px;

  border-color: ${(props) => {
    switch (props.type) {
      case 'white':
        return props.theme.colors.oxfordBlueTint5;
      case 'transparent':
        return 'transparent';
      default:
        return props.theme.colors.oxfordBlueTint2;
    }
  }};
  background-color: ${(props) => {
    switch (props.type) {
      case 'white':
        return 'transparent';
      case 'transparent':
        return 'transparent';
      default:
        return props.theme.colors.oxfordBlueTint2;
    }
  }};
  color: ${(props) => {
    switch (props.type) {
      case 'white':
        return props.theme.colors.oxfordBlueTint5;
      case 'transparent':
        return props.theme.colors.oxfordBlueTint5;
      default:
        return props.theme.colors.white;
    }
  }};
  border-radius: 3px;

  &:disabled {
    color: ${(props) => {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlue;
        case 'usual':
          return props.theme.colors.white;
        case 'transparent':
          return props.theme.colors.oxfordBlueTint2;
        default:
          return props.theme.colors.oxfordBlue;
      }
    }};
    background-color: ${(props) => {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint2;
        case 'usual':
          return props.theme.colors.whiteGrey;
        case 'transparent':
          return 'transparent';
        default:
          return props.theme.colors.oxfordBlueTint2;
      }
    }};
    border-color: ${(props) => {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint2;
        case 'usual':
          return props.theme.colors.whiteGrey;
        case 'transparent':
          return 'transparent';
        default:
          return props.theme.colors.oxfordBlueTint2;
      }
    }};
    opacity: 1;
    box-shadow: none;
  }

  &:hover {
    color: ${(props) => {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlue;
        case 'transparent':
          return props.theme.colors.oxfordBlue;
        default:
          return props.theme.colors.oxfordBlue;
      }
    }};
    background-color: ${(props) => {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint5;
        case 'transparent':
          return props.theme.colors.oxfordBlueTint5;
        default:
          return props.theme.colors.neonGreen;
      }
    }};
    border-color: ${(props) => {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint5;
        case 'transparent':
          return props.theme.colors.oxfordBlueTint5;
        default:
          return props.theme.colors.neonGreen;
      }
    }};
  }

  &:active {
    color: ${(props) => {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint5;
        case 'transparent':
          return props.theme.colors.oxfordBlueTint5;
        default:
          return props.theme.colors.white;
      }
    }} !important;
    background-color: ${(props) => {
      switch (props.type) {
        case 'white':
          return 'transparent';
        case 'transparent':
          return 'transparent';
        default:
          return props.theme.colors.oxfordBlueTint2;
      }
    }} !important;
    border-color: ${(props) => {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint5;
        case 'transparent':
          return 'transparent';
        default:
          return props.theme.colors.oxfordBlueTint2;
      }
    }} !important;
  }

  &:focus {
    color: ${(props) => {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint5;
        case 'transparent':
          return props.theme.colors.oxfordBlueTint5;
        default:
          return props.theme.colors.white;
      }
    }} !important;
    background-color: ${(props) => {
      switch (props.type) {
        case 'white':
          return 'transparent';
        case 'transparent':
          return 'transparent';
        default:
          return props.theme.colors.oxfordBlueTint2;
      }
    }} !important;
    border-color: ${(props) => {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint5;
        case 'transparent':
          return 'transparent';
        default:
          return props.theme.colors.oxfordBlueTint2;
      }
    }} !important;
  }

  .btn-icon {
    margin: ${(props) => {
      if (props.title) {
        if (props.isiconpositionright) {
          return '0 0 0 10px';
        } else {
          return '0 10px 0 0';
        }
      } else {
        return '0';
      }
    }};
    font-size: ${(props) => props.iconfontsize ? props.iconfontsize : undefined};
  }
}
`;
