import { DARK_COLORS, LIGHT_COLORS } from 'styles/colors';

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    currentTheme: string;
    isDarkTheme: boolean;
    colors: typeof LIGHT_COLORS | typeof DARK_COLORS;
    onChangeTheme: () => void;
  }
}
