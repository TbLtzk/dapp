import { ReactNode } from 'react';

import styled from 'styled-components';

import LoadingTransaction from 'components/Custom/LoadingTransaction';
import Header from 'navigation/Header';
import Sidebar from 'navigation/Sidebar';

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
`;

interface Props {
  children: ReactNode;
}

function Layout ({ children }: Props) {
  return (
    <>
      <PageContainer>
        <Sidebar />
        <div className="app-content">
          <Header />
          {children}
        </div>
      </PageContainer>
      <LoadingTransaction />
    </>
  );
}

export default Layout;
