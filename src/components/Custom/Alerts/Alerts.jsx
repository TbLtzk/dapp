import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setTransactionLoadingError } from 'store/actions/action-creaters/transaction-handler'

import { errorMessage } from 'store/selectors/transaction-handler'
import AlertMessage from 'components/Base/AlertMessage/AlertMessage'

function Alert () {
  const dispatch = useDispatch()
  const [alertShow, setAlertShow] = useState(false)

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
      setAlertShow(true)
    }
  }
  const handleAlertShow = () => {
    setAlertShow(false)
    dispatch(setTransactionLoadingError(null))
  }

  useEffect(() => {
    transactionHanlder()
  }, [errorTransaction, dispatch])

  return (
        <>
            {errorTransaction === null
              ? null
              : (
                <div style={{ position: 'absolute', right: '5%', zIndex: '50' }}>
                    <AlertMessage
                        type="danger"
                        header={createAlert(errorTransaction).title}
                        content={createAlert(errorTransaction).message}
                        show={alertShow}
                        onClose={() => handleAlertShow()}
                    />
                </div>
                )}
        </>
  )
}

export default Alert
