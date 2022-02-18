import React, { Fragment, useCallback } from 'react'
import { fields } from 'constants/fieldsNaming'
import FormInput from 'components/Base/Form/FormInput'
import { isAddress } from 'func/useful'

const linkRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9äöü][äöüa-zA-Z0-9-_]+[äöüa-zA-Z0-9]\.[^\s]{2,100}|www\.[äöüa-zA-Z0-9][a-zA-Z0-9-]+[äöüaa-zA-Z0-9]\.[^\s]{2,100}|https?:\/\/(?:www\.|(?!www))[äöüa-zA-Z0-9]+\.[^\s]{2,100}|www\.[äöüa-zA-Z0-9]+\.[^\s]{2,100})/gm

function InputGroup ({ register, errors, inputArr, labelsArr, min, max, type }) {
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
        return register({ required: 'Field is required!' })
      }
      default: {
        return register({ required: 'Field is required!' })
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
