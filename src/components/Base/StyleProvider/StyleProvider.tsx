import { ReactNode } from 'react';

import { ThemeProvider } from 'styled-components';
import { darkColors, lightColors, THEMES } from 'styles/colors';
import { GlobalStyle } from 'styles/globalStyle';
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
        palette: theme,
        isDarkTheme,
        colors: isDarkTheme ? darkColors : lightColors,
        onChangeTheme: handleChangeTheme,
      }}
    >
      <GlobalStyle />
      <TextStyle />
      {children}
    </ThemeProvider>
  );
}

export default StyleProvider;
