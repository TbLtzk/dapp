import { darkColors, lightColors } from 'styles/colors';

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: string;
    isDarkTheme: boolean;
    colors: typeof lightColors | typeof darkColors;
    onChangeTheme: () => void;
  }
}
