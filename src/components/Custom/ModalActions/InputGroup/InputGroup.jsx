import React, { useCallback, useState, Fragment } from 'react'
import { fields } from 'constants/fieldsNaming'
import FormInput from 'components/Base/Form/FormInput'

function InputGroup (props) {
  const {
    register, errors, inputArr, inputsObj, labelsArr, formData,
    onChangeInput, min, max, type
  } = props
  const [valueInput, changeValueInput] = useState(() => {
    if (formData) {
      if (Object.prototype.hasOwnProperty.call(formData, inputArr[0]?.replace(/ /g, '-').toLowerCase())) {
        return formData
      } else {
        return { ...formData, ...inputsObj }
      }
    } else {
      return { ...formData, ...inputsObj }
    }
  })

  const refType = useCallback((nameField, valueInput) => {
    if (nameField !== fields.externalLink && nameField !== fields.address) {
      if (nameField === fields.bid && valueInput.bid.length === 0) {
        return register({ required: 'Field is required!' })
      }
      if (nameField === fields.bid && (Object.values(valueInput)[1]?.length > 0)) {
        return
      }
      return register({ required: 'Field is required!' })
    } else {
      let valueValid = ''

      if (nameField === fields.externalLink) {
        /* eslint-disable-next-line no-useless-escape */
        valueValid = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
      } else if (nameField === 'address') {
        valueValid = /^(0x)?[0-9a-f]{40}$/i
      }
      return register({
        required: 'Field is required!',
        pattern: {
          value: valueValid,
          message: 'Entered value does not match to current format'
        }
      })
    }
  }, [])

  return (
    <div>
      {inputArr?.map((label, i) => {
        const nameField = label.replace(/ /g, '-')
          .toLowerCase()
        const val = valueInput[nameField]
        return (
          <Fragment key={i}>
            {labelsArr ? <h4>{labelsArr[i]}</h4> : null}
              <FormInput
              palette={'dark'}
              name={nameField}
              onChange={(value) => {
                const valObg = { [nameField]: value.target.value }
                changeValueInput({ ...valueInput, ...valObg })
                if (onChangeInput) onChangeInput(value.target.value)
              }}
              value={val}
              placeholder={label}
              ref={refType(nameField, valueInput)}
              valid={errors[nameField]?.message}
              min={min}
              max={max}
              type={type}
            />
          </Fragment>
        )
      })}
    </div>
  )
}

export default InputGroup
