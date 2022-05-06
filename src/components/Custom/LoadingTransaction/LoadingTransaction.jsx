import React from 'react';
import { useSelector } from 'react-redux';

import LoadingSpinner from 'components/Base/LoadingSpinner';

import { Shadow, Wrap, WrapLoading, WrapText } from './styles';

import { transactionCounter, transactionLoading } from 'store/transaction-handler/selectors';

function LoadingTransaction () {
  const loading = useSelector(transactionLoading);
  const trCounter = useSelector(transactionCounter);

  if (loading || trCounter) {
    return (
      <Wrap>
        <WrapLoading>
          <WrapText>
            <p>Loading</p>
            <LoadingSpinner type="light" />
          </WrapText>
        </WrapLoading>
        <Shadow />
      </Wrap>
    );
  }
  return null;
}

export default LoadingTransaction;
