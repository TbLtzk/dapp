import styled from 'styled-components';

export const ColorTitle = styled.div`
  font-size: 13px;
  line-height: 18px;
  color: ${(props) => {
    switch (props.color) {
      case 'white':
        return props.theme.colors.circleWhite;
      case 'dark':
        return props.theme.colors.circleDark;
      default:
        return props.theme.colors.circleWhite;
    }
  }};
`;


