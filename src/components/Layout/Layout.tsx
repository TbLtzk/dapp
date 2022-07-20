import { ReactNode } from 'react';

import LoadingTransaction from 'components/Custom/LoadingTransaction';
import Header from 'navigation/Header';
import Sidebar from 'navigation/Sidebar';

import { AppContainer } from './styles';

interface Props {
  children: ReactNode;
}

function Layout ({ children }: Props) {
  return (
    <>
      <AppContainer>
        <Sidebar />
        <div className="app__content">
          <Header />
          <main className="app__main">
            <div className="app__main-content">
              {children}
            </div>
          </main>
        </div>
      </AppContainer>
      <LoadingTransaction />
    </>
  );
}

export default Layout;
