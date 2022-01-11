import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setErrorMessage, setTransactionLoadingError } from 'store/transaction-handler/action-creators'

import { errorMessage } from 'store/transaction-handler/selectors'
import { useAlert } from 'react-alert'

function Alert () {
  const dispatch = useDispatch()

  const error = useSelector(errorMessage)
  const alert = useAlert()

  const errorHandler = () => {
    if (error) {
      alert.error(error)
      dispatch(setErrorMessage(null))
      dispatch(setTransactionLoadingError(null))
    }
  }

  useEffect(() => {
    errorHandler()
  }, [error, dispatch])

  return <></>
}

export default Alert
