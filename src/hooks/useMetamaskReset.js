import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { successMessageSelector } from 'store/transaction-handler/selectors';

function useMetamaskReset (formType = '', form) {
  const metamaskSuccess = useSelector(successMessageSelector);

  useEffect(() => {
    if (metamaskSuccess?.type === formType) {
      form.reset();
    }
  }, [metamaskSuccess]);
}

export default useMetamaskReset;
