import { ReactNode } from 'react';

import styled, { ThemeProvider } from 'styled-components';
import { darkColors, lightColors, THEMES } from 'styles/colors';
import { GlobalStyle } from 'styles/globalStyle';
import { TextStyle } from 'styles/text';

import LoadingTransaction from 'components/Custom/LoadingTransaction';
import Header from 'navigation/Header';
import Sidebar from 'navigation/Sidebar';

import useLocalStorage from 'hooks/useLocalStorage';

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
`;

interface Props {
  children: ReactNode;
}

function StyleLayout ({ children }: Props) {
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
      <PageContainer>
        <Sidebar />
        <div className="app-content">
          <Header />
          {children}
        </div>
      </PageContainer>
      <LoadingTransaction />
    </ThemeProvider>
  );
}

export default StyleLayout;
