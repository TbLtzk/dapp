import styled from 'styled-components';
import { THEMES } from 'constants/colors';

export const ThemesWrp = styled.div`
  width: 10px;
  height: 10px;
  background: ${(props) => {
    switch (props.curenttheme) {
      case THEMES.dark:
        return props.theme.colors.white;
      case THEMES.light:
        return props.theme.colors.white;
      default:
        return props.theme.colors.white;
    }
  }};
  border-radius: 100%;
  cursor: pointer;
`;
