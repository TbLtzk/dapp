import React, { useEffect, useState } from 'react';

import ErrorInputMessage from 'components/Base/ErrorInputMessage';
import InputRadio from 'components/Base/Form/InputRadio';

function RadioBtnGroup ({ name, values = [], labels = [], formData, errors, register, handleChange = () => {} }) {
  const [activeValue, setActiveValue] = useState('');

  useEffect(() => {
    if (formData) {
      setActiveValue(formData[name]);
    }
  }, [formData, name]);

  return (
    <div>
      {values.map((value, i) => {
        const valueField = value.replace(/ /g, '-').toLowerCase();
        return (
          <InputRadio
            key={i}
            ref={register({ required: 'Choose one option!' })}
            name={name}
            active={activeValue === valueField}
            checked={activeValue === valueField}
            handleChange={(event) => {
              setActiveValue(event.target.value);
              handleChange(event);
            }}
            label={labels[i] || value}
            value={valueField}
          />
        );
      })}
      <ErrorInputMessage message={errors[name]?.message} />
    </div>
  );
}

export default RadioBtnGroup;
