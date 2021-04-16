import styled from 'styled-components';
import { Button } from 'react-bootstrap';

import { indents } from 'constants/style';

export const ButtonCustom = styled(Button)`
  width: ${(props) => (props.width === 'undefined' ? 'auto' : props.width)};
  ${(props) => props.theme.fontStyles.text.middle};
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: ${indents['20']};
  padding-right: ${indents['20']};
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
    }}!important;
    background-color: ${(props) => {
      switch (props.type) {
        case 'white':
          return 'transparent';
        case 'transparent':
          return 'transparent';
        default:
          return props.theme.colors.oxfordBlueTint2;
      }
    }}!important;
    border-color: ${(props) => {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint5;
        case 'transparent':
          return 'transparent';
        default:
          return props.theme.colors.oxfordBlueTint2;
      }
    }}!important;
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
    }}!important;
    background-color: ${(props) => {
      switch (props.type) {
        case 'white':
          return 'transparent';
        case 'transparent':
          return 'transparent';
        default:
          return props.theme.colors.oxfordBlueTint2;
      }
    }}!important;
    border-color: ${(props) => {
      switch (props.type) {
        case 'white':
          return props.theme.colors.oxfordBlueTint5;
        case 'transparent':
          return 'transparent';
        default:
          return props.theme.colors.oxfordBlueTint2;
      }
    }}!important;
  }
`;
