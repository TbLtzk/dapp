import { useCallback, useState } from 'react';

interface MultiStepFormProps<T> {
  initialValues?: T,
  onConfirm?: (_: T) => void,
}

export default function useMultiStepForm<T> ({
  initialValues = {} as T,
  onConfirm = (_: T) => {},
}: MultiStepFormProps<T>) {
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState({ ...initialValues });

  const goNext = (proposal = {}) => {
    setValues((prev) => ({ ...prev, ...proposal }));
    setStepIndex(stepIndex + 1);
  };

  const goBack = () => {
    setStepIndex(stepIndex - 1);
  };

  const confirm = () => {
    onConfirm(values);
  };

  const reset = () => {
    setStepIndex(0);
    setValues({ ...initialValues });
  };

  return {
    stepIndex,
    values,
    goNext: useCallback(goNext, [values, stepIndex]),
    goBack: useCallback(goBack, [values, stepIndex]),
    confirm: useCallback(confirm, [values, stepIndex]),
    reset: useCallback(reset, [values, stepIndex])
  };
}
