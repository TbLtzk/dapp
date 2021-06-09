import React from 'react';

import { useSelector } from 'react-redux';
import { transactionLoading, errorMessage, transactionCounter } from 'store/selectors/transaction-handler';

import LoadingSpinner from 'components/Base/LoadingSpinner';

import { Wrap, Shadow, WrapLoading, WrapText } from './styles';

function LoadingTransaction() {
  const loading = useSelector(transactionLoading);
  const error = useSelector(errorMessage);
  const trCounter = useSelector(transactionCounter);

  const render = () => {
    if (loading === true || trCounter > 0) {
      return (
        <Wrap>
          <WrapLoading>
            <WrapText>
              <p>Loading</p>
              <LoadingSpinner type="light"/>
            </WrapText>
          </WrapLoading>
          <Shadow/>
        </Wrap>
      );
    }

    if (error === true) {
      return (
        <p>
          {error}
        </p>
      );
    }

    return '';
  };

  return render();
}

export default LoadingTransaction;
