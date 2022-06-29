import { darkColors, lightColors, THEMES } from 'styles/colors';

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: keyof typeof THEMES
    colors: typeof lightColors | typeof darkColors;
  }
}
