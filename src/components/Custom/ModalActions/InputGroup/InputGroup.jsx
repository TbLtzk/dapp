import React, { Fragment, useCallback } from 'react'
import { fields } from 'constants/fieldsNaming'
import FormInput from 'components/Base/Form/FormInput'
import { isAddress } from 'func/useful'
import { from1to100Regex, hashRegex, linkRegex } from 'constants/regex'

function InputGroup ({ register, errors, inputArr, labelsArr, min, max, type, setValue }) {
  const getRefType = useCallback((inputType) => {
    switch (inputType) {
      case fields.externalLink: {
        return register({
          required: 'Field is required!',
          validate: (link) => (link.match(linkRegex) ? true : 'Link not valid')
        })
      }
      case fields.address: {
        return register({
          required: 'Field is required!',
          validate: (address) => (isAddress(address) ? true : 'Address not valid')
        })
      }
      case fields.bid: {
        return register({
          required: 'Field is required!',
          validate: (value) => (value.match(hashRegex) ? true : 'Hash not valid')
        })
      }
      case fields.hash: {
        return register({
          required: 'Field is required!',
          validate: (hash) => (hash.match(hashRegex) ? true : 'Hash not valid')
        })
      }
      case fields.value: {
        return register({
          required: 'Field is required!',
          validate: (value) => {
            console.log(value)
            if (Number(value) > 100) {
              setValue(fields.value, '100')
              return true
            } else {
              return value.match(from1to100Regex) ? true : 'Percentage value not valid'
            }
          }
        })
      }
      default: {
        return register({
          required: 'Field is required!',
          validate: (value) => (value.length >= 70 ? 'Maximum length reached' : true)
        })
      }
    }
  }, [])

  return (
        <div>
            {inputArr?.map((label, i) => {
              const nameField = label.replace(/ /g, '-').toLowerCase()

              return (
                    <Fragment key={label}>
                        {labelsArr ? <h4>{labelsArr[i]}</h4> : null}
                        <FormInput
                            palette="dark"
                            min={min}
                            max={max}
                            type={type}
                            placeholder={label}
                            name={nameField}
                            valid={errors[nameField]?.message}
                            ref={getRefType(nameField)}
                        />
                    </Fragment>
              )
            })}
        </div>
  )
}

export default InputGroup
