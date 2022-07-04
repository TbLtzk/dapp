import { useCallback, useMemo, useState } from 'react';

import { uniqueId } from 'lodash';

import useForm from './useForm';

type Form = ReturnType<typeof useForm>

function useFormArray<T extends never[]> ({
  minCount = 0,
  maxCount = Infinity,
  onSubmit = (_: T) => {},
}) {
  const [forms, setForms] = useState(getInitialForms());
  const [isSubmitting, setIsSubmitting] = useState(false);

  function getInitialForms () {
    return new Array(minCount).fill(null).map(createForm);
  };

  function createForm () {
    const id = uniqueId();
    const onChange = (form: Form) => {
      setForms((prev) => prev.map(e => {
        return e.id === id ? { ...e, ...form } : e;
      }));
    };

    return { id, onChange } as { id: string, onChange: (form: Form) => void } & Form;
  };

  const validate = () => {
    return forms
      .map(form => form.validate())
      .every(val => val);
  };

  const submit = (e: Event) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    onSubmit(forms.map(e => e.values) as T);
    setIsSubmitting(false);
  };

  const reset = () => {
    setForms(getInitialForms());
  };

  const appendForm = () => {
    if (forms.length >= maxCount) return;
    setForms((prev) => [...prev, createForm()]);
  };

  const removeForm = (id: string) => {
    if (forms.length <= minCount) return;
    setForms((prev) => prev.filter(e => e.id !== id));
  };

  return {
    forms,
    isSubmitting,
    isValid: useMemo(() => {
      return forms.every(e => e.isValid);
    }, [forms]),

    validate: useCallback(validate, [forms]),
    submit: useCallback(submit, [forms]),
    reset: useCallback(reset, [forms]),

    appendForm: useCallback(appendForm, [forms]),
    removeForm: useCallback(removeForm, [forms]),
  };
}

export default useFormArray;
