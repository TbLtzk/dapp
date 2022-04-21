import React, { useEffect, useState } from 'react'

import InputRadio from 'components/Base/Form/InputRadio'
import ErrorInputMessage from 'components/Base/ErrorInputMessage'

function RadioBtnGroup ({ nameArr, handleChange, register, errors, radioArr, formData }) {
  const [activeRadioBtn, setActiveRadioBtn] = useState('')

  useEffect(() => {
    if (formData) {
      setActiveRadioBtn(formData[nameArr])
    }
  }, [formData, nameArr])
  console.log()

  return (
        <div>
            {radioArr?.map((value, i) => {
              const valueField = value.replace(/ /g, '-').toLowerCase()
              const name = nameArr + '[]'
              return (
                    <InputRadio
                        key={i}
                        name={name}
                        active={activeRadioBtn === valueField}
                        checked={activeRadioBtn === valueField}
                        handleChange={(value) => {
                          setActiveRadioBtn(value.target.value)
                          handleChange(value)
                        }}
                        label={value}
                        value={valueField}
                        ref={register({ required: 'Choose one option!' })}
                    />
              )
            })}
            <ErrorInputMessage message={errors[nameArr]?.message} />
        </div>
  )
}

export default RadioBtnGroup
