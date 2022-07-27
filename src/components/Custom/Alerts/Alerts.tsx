import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

import { setTransactionLoadingError, setTransactionLoadingSuccess } from 'store/transaction-handler/action-creators';
import { errorMessageSelector, successMessageSelector } from 'store/transaction-handler/selectors';

function Alerts () {
  const dispatch = useDispatch();

  const errorMessage = useSelector(errorMessageSelector);
  const successMessage = useSelector(successMessageSelector);
  const alert = useAlert();

  useEffect(() => {
    if (errorMessage) {
      alert.error(errorMessage);
      dispatch(setTransactionLoadingError(null));
    }
    if (successMessage) {
      dispatch(setTransactionLoadingSuccess(null));
    }
  }, [errorMessage, successMessage, dispatch]);

  return null;
}

export default Alerts;
