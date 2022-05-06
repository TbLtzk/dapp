import React from 'react'
import { useSelector } from 'react-redux'

import { transactionLoadingSelector } from 'store/transaction-handler/selectors'
import LoadingSpinner from 'components/Base/LoadingSpinner'

import { Wrap, Shadow, WrapLoading, WrapText } from './styles'

function LoadingTransaction () {
  const transactionLoading = useSelector(transactionLoadingSelector)

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
    : null
}

export default LoadingTransaction
