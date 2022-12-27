import TransactionModal from './components/TransactionModal';

import { useTransaction } from 'store/transaction/hooks';

function TransactionLoader () {
  const { pendingTransactions } = useTransaction();

  return (
    <>
      {pendingTransactions.map(tx => (
        <TransactionModal key={tx.id} transaction={tx} />
      ))}
    </>
  );
}

export default TransactionLoader;
