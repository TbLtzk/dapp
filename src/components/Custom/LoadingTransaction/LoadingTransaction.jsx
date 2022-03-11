import React from 'react'

import { useSelector } from 'react-redux'
import { transactionLoading, transactionCounter } from 'store/transaction-handler/selectors'

import LoadingSpinner from 'components/Base/LoadingSpinner'

import { Wrap, Shadow, WrapLoading, WrapText } from './styles'

function LoadingTransaction () {
  const loading = useSelector(transactionLoading)
  const trCounter = useSelector(transactionCounter)

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
    )
  }
  return null
}

export default LoadingTransaction
