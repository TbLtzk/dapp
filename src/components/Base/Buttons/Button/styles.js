import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const ButtonCustom = styled(Button)`
  align-items: center;
  width: ${(props) => (!props.width ? 'auto' : props.width)};
  max-width: ${(props) => (!props.width ? 'auto' : props.width)};
  min-width: ${(props) => (!props.width ? 'auto' : props.width)};
  position: ${(props) => (!props.position ? 'auto' : props.position)};
  right: ${(props) => (!props.right ? 'auto' : props.right)};
  top: ${(props) => (!props.top ? 'auto' : props.top)};
  margin: ${(props) => (!props.margin ? 'auto' : props.margin)};
  padding: 7px 11px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 13px;
  line-height: 18px;

  border-color: ${(props) => {
    if (props.palette === 'dark' && props.variant === 'primary') {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint5;
        case 'transparent':
          return 'transparent';
        default:
          return props.theme.colors.oxfordBlueTint2;
      }
    } else {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint5;
        case 'transparent':
          return 'transparent';
        default:
          return props.theme.colors.oxfordBlueTint2;
      }
    }
  }};
  background-color: ${(props) => {
    if (props.palette === 'dark' && props.variant === 'primary') {
      switch (props.type) {
        case 'white':
          return 'transparent';
        case 'transparent':
          return 'transparent';
        default:
          return props.theme.colors.oxfordBlueTint2;
      }
    } else {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint5;
        case 'transparent':
          return props.theme.colors.oxfordBlueTint5;
        default:
          return props.theme.colors.oxfordBlueTint5;
      }
    }
  }};
  color: ${(props) => {
    if (props.palette === 'dark' && props.variant === 'primary') {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint5;
        case 'transparent':
          return props.theme.colors.oxfordBlueTint5;
        default:
          return props.theme.colors.white;
      }
    } else {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlue;
        case 'transparent':
          return props.theme.colors.oxfordBlue;
        default:
          return props.theme.colors.oxfordBlue;
      }
    }
  }};
  border-radius: 3px;

  &:disabled {
    color: ${(props) => {
    if (props.palette === 'dark' && props.variant === 'primary') {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlue;
        case 'transparent':
          return props.theme.colors.oxfordBlueTint2;
        default:
          return props.theme.colors.oxfordBlue;
      }
    } else {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlue;
        case 'transparent':
          return props.theme.colors.oxfordBlue;
        default:
          return props.theme.colors.oxfordBlue;
      }
    }
  }};
    background-color: ${(props) => {
    if (props.palette === 'dark' && props.variant === 'primary') {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint2;
        case 'transparent':
          return 'transparent';
        default:
          return props.theme.colors.circleDark;
      }
    } else {
      switch (props.type) {
        case 'white':
          return props.theme.colors.circleDark;
        case 'transparent':
          return props.theme.colors.circleDark;
        default:
          return props.theme.colors.circleDark;
      }
    }
  }};
    border-color: ${(props) => {
    if (props.palette === 'dark' && props.variant === 'primary') {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint2;
        case 'transparent':
          return 'transparent';
        default:
          return props.theme.colors.oxfordBlueTint2;
      }
    } else {
      switch (props.type) {
        case 'white':
          return props.theme.colors.circleDark;
        case 'transparent':
          return 'transparent';
        default:
          return props.theme.colors.circleDark;
      }
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
    if (props.palette === 'dark' && props.variant === 'primary') {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint5;
        case 'transparent':
          return props.theme.colors.oxfordBlueTint5;
        default:
          return props.theme.colors.neonGreen;
      }
    } else {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint4;
        case 'transparent':
          return props.theme.colors.oxfordBlueTint4;
        default:
          return props.theme.colors.oxfordBlueTint4;
      }
    }
  }};
    border-color: ${(props) => {
    if (props.palette === 'dark' && props.variant === 'primary') {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint5;
        case 'transparent':
          return props.theme.colors.oxfordBlueTint5;
        default:
          return props.theme.colors.neonGreen;
      }
    } else {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint4;
        case 'transparent':
          return props.theme.colors.oxfordBlueTint4;
        default:
          return props.theme.colors.oxfordBlueTint4;
      }
    }
  }};
  }

    &:focus {
      box-shadow: ${(props) => (props.palette === 'light' ? 'none !important' : 'auto')};
      border: ${(props) => (props.palette === 'light' ? '4px solid' : 0)};
      color: ${(props) => {
      if (props.palette === 'dark' && props.variant === 'primary') {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint5;
        case 'transparent':
          return props.theme.colors.oxfordBlueTint5;
        default:
          return props.theme.colors.white;
      }
      } else {
        switch (props.type) {
          case 'white':
            return props.theme.colors.oxfordBlue;
          case 'transparent':
            return props.theme.colors.oxfordBlue;
          default:
            return props.theme.colors.oxfordBlue;
        }
      }
    }};
    background-color: ${(props) => {
    if (props.palette === 'dark' && props.variant === 'primary') {
      switch (props.type) {
        case 'white':
          return 'transparent';
        case 'transparent':
          return 'transparent';
        default:
          return props.theme.colors.oxfordBlueTint2;
      }
    } else {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint5;
        case 'transparent':
          return props.theme.colors.oxfordBlueTint5;
        default:
          return props.theme.colors.oxfordBlueTint5;
      }
    }
  }
  };
    border-color: ${(props) => {
    if (props.palette === 'dark' && props.variant === 'primary') {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint5;
        case 'transparent':
          return 'transparent';
        default:
          return props.theme.colors.oxfordBlueTint2;
      }
    } else {
      switch (props.type) {
        case 'white':
          return props.theme.colors.activeLinks;
        case 'transparent':
          return props.theme.colors.activeLinks;
        default:
          return props.theme.colors.activeLinks;
      }
    }
  }}
  };

  &:active {
    box-shadow: none !important;
    color: ${(props) => {
    if (props.palette === 'dark' && props.variant === 'primary') {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint5;
        case 'transparent':
          return props.theme.colors.oxfordBlueTint5;
        default:
          return props.theme.colors.white;
      }
    } else {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlue;
        case 'transparent':
          return props.theme.colors.oxfordBlue;
        default:
          return props.theme.colors.oxfordBlue;
      }
    }
  }} !important;
    background-color: ${(props) => {
    if (props.palette === 'dark' && props.variant === 'primary') {
      switch (props.type) {
        case 'white':
          return 'transparent';
        case 'transparent':
          return 'transparent';
        default:
          return props.theme.colors.oxfordBlueTint2;
      }
    } else {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint6;
        case 'transparent':
          return props.theme.colors.oxfordBlueTint6;
        default:
          return props.theme.colors.oxfordBlueTint6;
      }
    }
  }} !important;
    border-color: ${(props) => {
    if (props.palette === 'dark' && props.variant === 'primary') {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint5;
        case 'transparent':
          return 'transparent';
        default:
          return props.theme.colors.oxfordBlueTint2;
      }
    } else {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint6;
        case 'transparent':
          return props.theme.colors.oxfordBlueTint6;
        default:
          return props.theme.colors.oxfordBlueTint6;
      }
    }
  }}!important;
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
