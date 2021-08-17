import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setTransactionLoadingError } from 'store/actions/action-creaters/transaction-handler'

import { errorMessage } from 'store/selectors/transaction-handler'
import { useAlert } from 'react-alert'

function Alert () {
  const dispatch = useDispatch()

  const errorTransaction = useSelector(errorMessage)
  const alert = useAlert()

  const createAlert = (error) => {
    if (error.message) {
      const message = error.message.split(':')
      return { title: message[0], info: message[1] }
    }
    if (error.status === false) {
      return { title: 'Error', info: 'Not enough balance on wallet account' }
    } else {
      return { title: 'Unknown type of error', info: 'No additional info' }
    }
  }

  const transactionHanlder = () => {
    if (errorTransaction !== null) {
      const getAlert = createAlert(errorTransaction)
      alert.error(getAlert)
      dispatch(setTransactionLoadingError(null))
    }
  }

  useEffect(() => {
    transactionHanlder()
  }, [errorTransaction, dispatch])

  return (
        <></>
  )
}

export default Alert
