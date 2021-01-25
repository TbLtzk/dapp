import React, { useCallback } from 'react';

import SavingAndBorrowingContent from '../SavingAndBorrowingContent';
import DecentralizedAuctions from '../DecentralizedAuctions';

function TabContent(props) {
  const { activeTab } = props;

  const content = useCallback(() => {
    if (activeTab === 'decentralized-saving-borrowing') {
      return <SavingAndBorrowingContent/>;
    } else if (activeTab === 'decentralized-auctions') {
      return <DecentralizedAuctions/>;
    }

  }, [activeTab]);

  return (
    <>
      {content()}
    </>
  );
}

export default TabContent;

