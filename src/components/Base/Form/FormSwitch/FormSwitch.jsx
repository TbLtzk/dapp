import React from 'react'
import { Form } from 'react-bootstrap'
import { SwitcherWrapper } from './styles'

const FormSwitch = ({ label, checked, onChange, id }) => {
  return (
        <SwitcherWrapper>
            <Form.Check onChange={onChange} type="switch" id={id} checked={checked} />
            <div>{label}</div>
        </SwitcherWrapper>
  )
}

export default FormSwitch
