import styled from 'styled-components';

export const ButtonCustom = styled.button`
  align-items: center;
  width: ${(props) => (!props.width ? 'auto' : props.width)};
  max-width: ${(props) => (!props.width ? 'auto' : props.width)};
  min-width: ${(props) => (!props.width ? 'auto' : props.width)};
  position: ${(props) => (!props.position ? '' : props.position)};
  right: ${(props) => (!props.right ? '' : props.right)};
  top: ${(props) => (!props.top ? '' : props.top)};
  margin: ${(props) => (!props.margin ? '' : props.margin)};
  padding: 7px 11px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 13px;
  line-height: 18px;
  transition: 0.2s;
  border: 1px solid black;
  outline: none;

  border-color: ${(props) => {
    if (props.palette === 'dark') {
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
    if (props.palette === 'dark') {
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
    if (props.palette === 'dark') {
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
    if (props.palette === 'dark') {
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
    if (props.palette === 'dark') {
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
    if (props.palette === 'dark') {
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
    if (props.palette === 'dark') {
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
    if (props.palette === 'dark') {
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
    font-size: ${(props) => (props.iconfontsize ? props.iconfontsize : undefined)};
  }
`;
