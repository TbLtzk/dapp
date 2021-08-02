import React, { forwardRef } from 'react'
import { Form } from 'react-bootstrap'
import { SwitcherWrapper } from './styles'

const FormSwithch = forwardRef((props, ref) => {
  const {
    label,
    name,
    checked,
    onChange,
    id,
    palette
  } = props
  return (
    <SwitcherWrapper
      palette={palette}
    >
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check
          onChange={onChange}
          type="switch"
          name={name}
          id={id}
          checked={checked}
          label={label}
        />
      </Form.Group>
    </SwitcherWrapper>
  )
})

export default FormSwithch
