import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setTransactionLoadingError } from 'store/actions/action-creaters/transaction-handler'

import { errorMessage } from 'store/selectors/transaction-handler'
import { useAlert } from 'react-alert'

function Alert () {
  const dispatch = useDispatch()
  const alert = useAlert()

  const errorTransaction = useSelector(errorMessage)

  const createAlert = (error) => {
    if (error.message) {
      const message = error.message.split(':')
      return { title: message[0], message: message[1] }
    }
    if (error.status === false) {
      return { title: 'Error', message: 'Not enough balance on wallet account' }
    } else {
      return { title: 'Unknown type of error', message: 'No additional info' }
    }
  }

  const transactionHanlder = () => {
    if (errorTransaction !== null) {
      const errorAlert = createAlert(errorTransaction)
      alert.error(
                <>
                    <p style={{ fontSize: '13px' }}>{errorAlert.title}</p>
                    <p style={{ fontSize: '12px' }}>{errorAlert.message}</p>
                </>
      )
      dispatch(setTransactionLoadingError(null))
    }
  }

  useEffect(() => {
    transactionHanlder()
  }, [errorTransaction, dispatch])

  return <></>
}

export default Alert
