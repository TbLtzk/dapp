import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setErrorMessage, setTransactionLoadingError } from 'store/actions/action-creaters/transaction-handler'

import { errorMessage } from 'store/selectors/transaction-handler'
import { useAlert } from 'react-alert'

function Alert () {
  const dispatch = useDispatch()

  const error = useSelector(errorMessage)
  const alert = useAlert()

  const errorHandler = () => {
    if (error !== null) {
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
