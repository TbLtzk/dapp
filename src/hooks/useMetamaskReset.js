import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { successMessageSelector } from 'store/transaction-handler/selectors';

function useMetamaskReset (formType, onReset) {
  const metamaskSuccess = useSelector(successMessageSelector);

  useEffect(() => {
    if (metamaskSuccess?.type === formType) {
      onReset();
    }
  }, [metamaskSuccess]);
}

export default useMetamaskReset;
