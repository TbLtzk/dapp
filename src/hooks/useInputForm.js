import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { successMessageSelector } from 'store/transaction-handler/selectors';

function useInputForm (formType = '', params = {}) {
  const form = useForm(params);
  const metamaskSucess = useSelector(successMessageSelector);

  useEffect(() => {
    if (metamaskSucess?.type === formType) {
      const values = form.getValues();
      const emptyForm = Object.fromEntries(Object.entries(values).map(([key, _]) => [key, '']));
      form.reset(emptyForm);
    }
  }, [metamaskSucess]);

  return form;
}

export default useInputForm;
