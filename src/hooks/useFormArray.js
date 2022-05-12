import { useCallback, useMemo, useState } from 'react';

import { uniqueId } from 'lodash';

function useFormArray ({
  minCount = 0,
  maxCount = Infinity,
  onSubmit = () => {},
}) {
  const createForm = () => {
    const id = uniqueId();
    return {
      id,
      onChange: (form) => {
        setForms((prev) => prev.map(e => {
          return e.id === id ? { ...e, ...form } : e;
        }));
      }
    };
  };

  const getInitialForms = () => {
    if (minCount === 0) return [];

    const result = [];
    for (let i = 0; i < minCount; i++) {
      result.push(createForm());
    }

    return result;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forms, setForms] = useState(getInitialForms());

  const validate = () => {
    return forms
      .map(form => form.validate())
      .every(val => val);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await onSubmit(forms.map(e => e.values));
    setIsSubmitting(false);
  };

  const reset = () => {
    setForms(getInitialForms());
  };

  const append = () => {
    if (forms.length >= maxCount) return;
    setForms((prev) => [...prev, createForm()]);
  };

  const remove = (id) => {
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

    append: useCallback(append, [forms]),
    remove: useCallback(remove, [forms]),
  };
}

export default useFormArray;
