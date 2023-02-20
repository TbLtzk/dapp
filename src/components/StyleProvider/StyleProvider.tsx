import { ReactNode } from 'react';

import { ThemeProvider } from 'styled-components';
import { DARK_COLORS, LIGHT_COLORS, THEMES } from 'styles/colors';
import { GlobalStyle } from 'styles/globalStyle';
import { ResetStyle } from 'styles/reset';
import { TextStyle } from 'styles/text';

import useLocalStorage from 'hooks/useLocalStorage';

interface Props {
  children: ReactNode;
}

function StyleProvider ({ children }: Props) {
  const [theme, setTheme] = useLocalStorage('theme', THEMES.dark);

  const isDarkTheme = theme === THEMES.dark;

  const handleChangeTheme = () => {
    setTheme(isDarkTheme ? THEMES.light : THEMES.dark);
  };

  return (
    <ThemeProvider
      theme={{
        currentTheme: theme,
        isDarkTheme,
        colors: isDarkTheme ? DARK_COLORS : LIGHT_COLORS,
        onChangeTheme: handleChangeTheme,
      }}
    >
      <ResetStyle />
      <GlobalStyle />
      <TextStyle />
      {children}
    </ThemeProvider>
  );
}

export default StyleProvider;
