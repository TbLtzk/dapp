import { ReactNode, useState } from 'react';

import { useWeb3Context } from 'context/Web3ContextProvider';

import NetworkWarning from 'components/NetworkWarning';
import TransactionLoader from 'components/TransactionLoader';
import Header from 'navigation/Header';
import Sidebar from 'navigation/Sidebar';

import { AppContainer } from './styles';

interface Props {
  children: ReactNode;
}

function Layout ({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isConnected, isRightNetwork } = useWeb3Context();

  return (
    <>
      { isConnected && !isRightNetwork
        ? <NetworkWarning />
        : (
          <AppContainer>
            <Sidebar
              open={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
            <div className="app__content">
              <Header onMenuClick={() => setSidebarOpen(true)} />
              <main className="app__main">
                <div className="app__main-content">{children}</div>
              </main>
            </div>
          </AppContainer>)
      }
      <TransactionLoader />
    </>
  );
}

export default Layout;
