import { useCallback, useMemo, useState } from 'react';

/**
 * @template FieldKey,FieldValue
 *
 * @param {object} opts Options.
 * @param {Record<FieldKey, FieldValue>} [opts.initialValues] Form fields.
 * @param {Record<FieldKey, unknown[]>} [opts.validators] Form validators.
 * @param {(form: Record<FieldKey, FieldValue>) => void | Promise<void>} [opts.onSubmit] Submit handler.
 *
 * @returns {{
 *   fields: Record<FieldKey, {
 *     value: FieldValue,
 *     error: string,
 *     onChange: () => void
 *   }>,
 *   values: Record<FieldKey, FieldValue>,
 *   errors: Record<FieldKey, string>,
 *   isSubmitting: boolean,
 *   isValid: boolean,
 *   submit: () => Promise<void>,
 *   validate: () => boolean,
 *   reset: () => void,
 * }}
 */
function useForm ({
  initialValues = {},
  validators = {},
  onSubmit = () => {}
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getDefaultErrors = useCallback(() => {
    return Object.keys(initialValues)
      .reduce((acc, key) => ({ ...acc, [key]: '' }), {});
  }, [initialValues]);

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(getDefaultErrors());

  const validate = () => {
    return Object.entries(values)
      .map(([key, value]) => validateField(key, value))
      .every(val => val);
  };

  const validateField = (key, value) => {
    for (const validator of validators[key] || []) {
      const { isValid, message } = validator(value, values);
      if (!isValid) {
        setErrors((prev) => ({ ...prev, [key]: message }));
        return false;
      }
    }

    setErrors((prev) => ({ ...prev, [key]: '' }));
    return true;
  };

  const submit = async (e) => {
    e?.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await onSubmit(values);
    setIsSubmitting(false);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors(getDefaultErrors());
  };

  return {
    fields: useMemo(() => {
      return Object.keys(values)
        .reduce((acc, key) => ({
          ...acc,
          [key]: {
            value: values[key],
            error: errors[key],
            onChange: (value) => {
              setValues((prev) => ({ ...prev, [key]: value }));
              validateField(key, value);
            }
          }
        }), {});
    }, [values, errors, validators]),

    values,
    errors,

    isSubmitting,
    isValid: useMemo(() => {
      return Object.values(errors).every(val => val === '');
    }, [errors]),

    validate: useCallback(validate, [values, errors, validators]),
    submit: useCallback(submit, [values]),
    reset: useCallback(reset, [values]),
  };
}

export default useForm;
