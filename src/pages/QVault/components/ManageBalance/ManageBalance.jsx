import React from 'react';

import CustomBlock from 'components/Base/CustomBlock';

import SendForm from './components/SendForm';
import TransferForm from './components/TransferForm';
import WithdrawForm from './components/WithdrawForm';

function ManageBalance () {
  return (
    <CustomBlock style={{ gap: '15px' }}>
      <h1>Manage Balance</h1>
      <div style={{ display: 'grid', gap: '15px' }}>
        <TransferForm />
        <WithdrawForm />
        <SendForm />
      </div>
    </CustomBlock>
  );
}

export default ManageBalance;
