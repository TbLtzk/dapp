import { darkColors, lightColors } from '@q-dev/q-ui-kit';

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: string;
    isDarkTheme: boolean;
    colors: typeof lightColors | typeof darkColors;
    onChangeTheme: () => void;
  }
}
