import { ReactNode, useState } from 'react';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';

import Toast from 'ui/Toast';

import TransactionModal from 'components/TransactionModal';
import Header from 'navigation/Header';
import Sidebar from 'navigation/Sidebar';

import { AppContainer } from './styles';

interface Props {
  children: ReactNode;
}

function Layout ({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AlertProvider
      template={({ message, options, close }) => <Toast
        type={options.type}
        text={String(message)}
        onClose={close}
      />}
      position={positions.TOP_RIGHT}
      timeout={8000}
      transition={transitions.SCALE}
      containerStyle={{
        width: 'auto',
        zIndex: '10001',
        pointerEvents: 'all',
        top: '80px',
        left: 'unset',
        right: '24px',
        gap: '12px',
      }}
    >
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
      </AppContainer>
      <TransactionModal/>
    </AlertProvider>
  );
}

export default Layout;
