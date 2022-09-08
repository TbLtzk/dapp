import { ReactNode } from 'react';

import { darkColors, GlobalStyle, lightColors, ResetStyle, TextStyle, THEMES } from '@q-dev/q-ui-kit';
import { ThemeProvider } from 'styled-components';

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
        palette: theme,
        isDarkTheme,
        colors: isDarkTheme ? darkColors : lightColors,
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
