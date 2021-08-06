import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  setTransactionLoadingError,
  setTransactionLoadingSuccess
} from 'store/actions/action-creaters/transaction-handler'

import { errorMessage, successMessage } from 'store/selectors/transaction-handler'
import { useAlert } from 'react-alert'

function Alert () {
  const dispatch = useDispatch()
  const alert = useAlert()

  const errorTransaction = useSelector(errorMessage)
  const successTransaction = useSelector(successMessage)

  const createAlert = (obj) => {
    if (obj.status === undefined) {
      return { title: 'User denied transaction', info: obj.message }
    } else {
      return { title: 'Transaction denied', info: 'User do not have enough Q' }
    }
  }

  const transactionHanlder = () => {
    if (errorTransaction !== null) {
      const errorAlert = createAlert(errorTransaction)
      alert.error(
                <div style={{ textAlign: 'center' }}>
                    <h6> {errorAlert.title} </h6>
                    <p> {errorAlert.info} </p>
                </div>
      )
      dispatch(setTransactionLoadingError(null))
    }
    if (successTransaction !== null) {
      alert.success(
                <div style={{ textAlign: 'center' }}>
                    <h6> Success transaction </h6>
                </div>
      )
      dispatch(setTransactionLoadingSuccess(null))
    }
  }

  useEffect(() => {
    transactionHanlder()
  }, [errorTransaction, successTransaction, dispatch])

  return <></>
}

export default Alert
