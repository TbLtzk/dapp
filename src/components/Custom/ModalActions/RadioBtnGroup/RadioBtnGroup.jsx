import React, { useEffect, useState } from 'react'

import InputRadio from 'components/Base/Form/InputRadio'
import ErrorInputMessage from 'components/Base/ErrorInputMessage'

function RadioBtnGroup ({
  name,
  values = [],
  labels = [],
  formData,
  errors,
  register,
  handleChange
}) {
  const [activeValue, setActiveValue] = useState('')

  useEffect(() => {
    if (formData) {
      setActiveValue(formData[name])
    }
  }, [formData, name])

  return (
        <div>
            {values.map((value, i) => {
              const valueField = value.replace(/ /g, '-').toLowerCase()
              return (
                    <InputRadio
                        key={i}
                        name={name}
                        active={activeValue === valueField}
                        checked={activeValue === valueField}
                        handleChange={(event) => {
                          setActiveValue(event.target.value)
                          handleChange(event)
                        }}
                        label={labels[i] || value}
                        value={valueField}
                        ref={register({ required: 'Choose one option!' })}
                    />
              )
            })}
            <ErrorInputMessage message={errors[name]?.message} />
        </div>
  )
}

export default RadioBtnGroup
