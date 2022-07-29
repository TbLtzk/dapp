import { useSelector } from 'react-redux';

import Spinner from 'ui/Spinner';

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
            <Spinner size={32} />
          </WrapText>
        </WrapLoading>
        <Shadow />
      </Wrap>
    )
    : null;
}

export default LoadingTransaction;
