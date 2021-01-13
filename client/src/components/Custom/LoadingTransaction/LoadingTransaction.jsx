import React from 'react';

import { useSelector } from 'react-redux';
import { transactionLoading, errorMessage, transactionCounter } from 'store/selectors/transaction-handler';

import LoadingSpinner from 'components/Base/LoadingSpinner';

import { Col } from 'react-bootstrap';
import { Wrap, Shadow, WrapLoading, WrapText, Text } from './styles';

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
              <Text>Loading</Text>
              <LoadingSpinner type="light"/>
            </WrapText>
          </WrapLoading>
          <Shadow/>
        </Wrap>
      );
    }

    if (error === true) {
      return (
        <Col xs={12}>
          <p>
            {error}
          </p>
        </Col>
      );
    }

    return '';
  };

  return render();
}

export default LoadingTransaction;
