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
    return { header: 'Error', text: error }
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

  return <></>
}

export default Alert
