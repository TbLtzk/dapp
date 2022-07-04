import { darkColors, lightColors, THEMES } from 'styles/colors';

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: keyof typeof THEMES;
    theme: keyof typeof THEMES;
    isDarkTheme: boolean;
    colors: typeof lightColors | typeof darkColors;
    onChangeTheme: () => void;
  }
}
