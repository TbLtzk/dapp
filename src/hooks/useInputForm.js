import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { successMessageSelector } from 'store/transaction-handler/selectors';

function useInputForm (formType = '', params = {}) {
  const form = useForm(params);
  const shouldResetInput = useSelector(successMessageSelector);
  const [currentType, setCurrentType] = useState(null);

  useEffect(() => {
    if (formType === currentType && !!shouldResetInput) {
      const values = form.getValues();
      const emptyForm = Object.fromEntries(Object.entries(values).map(([key, _]) => [key, '']));
      form.reset(emptyForm);
    }
    setCurrentType(null);
  }, [shouldResetInput]);

  return { ...form, setCurrentType };
}

export default useInputForm;
