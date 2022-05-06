import React from 'react';
import { useSelector } from 'react-redux';

import LoadingSpinner from 'components/Base/LoadingSpinner';

import { Shadow, Wrap, WrapLoading, WrapText } from './styles';

import { transactionLoadingSelector } from 'store/transaction-handler/selectors';

function LoadingTransaction () {
  const transactionLoading = useSelector(transactionLoadingSelector);

  return transactionLoading
    ? (
      <Wrap>
        <WrapLoading>
          <WrapText>
            <p>Loading</p>
            <LoadingSpinner type="light" />
          </WrapText>
        </WrapLoading>
        <Shadow />
      </Wrap>
    )
    : null;
}

export default LoadingTransaction;
