import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

import useChangesListener from './useChangesListener';

import { getBalances, setClearMessages } from 'store/transaction-handler/action-creators';
import { errorMessageSelector, successMessageSelector } from 'store/transaction-handler/selectors';

const useCommonAlert = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(errorMessageSelector);
  const successMessage = useSelector(successMessageSelector);
  const alert = useAlert();

  const handleErrorAlert = () => {
    alert.error(errorMessage);
    dispatch(setClearMessages());
  };

  const handleSuccessAlert = () => {
    dispatch(setClearMessages());
    dispatch(getBalances());
  };

  useChangesListener(errorMessage, handleErrorAlert);
  useChangesListener(successMessage, handleSuccessAlert);
};

export default useCommonAlert;
