import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled, { ThemeProvider } from 'styled-components';
import { darkColors, lightColors, THEMES } from 'styles/colors';
import { GlobalStyle } from 'styles/globalStyle';
import { TypographyStyle } from 'styles/typography';

import LoadingTransaction from 'components/Custom/LoadingTransaction';
import Header from 'components/Navigations/Header';
import Sidebar from 'components/Navigations/Sidebar';

import { setTheme } from 'store/theme/action-creators';
import { theme } from 'store/theme/selectors';

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
`;

function StyleLayout ({ children }) {
  const dispatch = useDispatch();
  const currentTheme = useSelector(theme);

  useEffect(() => {
    switch (localStorage['theme-mode']) {
      case THEMES.light:
      case THEMES.dark:
        dispatch(setTheme(localStorage['theme-mode'] || THEMES.dark));
        break;
      default:
        dispatch(setTheme(THEMES.dark));
    }
  }, [dispatch]);

  return (
    <ThemeProvider
      theme={{
        palette: currentTheme,
        colors: currentTheme === THEMES.light
          ? lightColors
          : darkColors
      }}
    >
      <GlobalStyle />
      <TypographyStyle />
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
