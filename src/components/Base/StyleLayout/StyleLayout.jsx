import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from 'constants/style';

const StyleLayout = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default StyleLayout;
