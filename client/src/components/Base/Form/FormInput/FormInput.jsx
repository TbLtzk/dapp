import React, {forwardRef} from "react";
import {Form} from "react-bootstrap";

import ErrorInputMessage from "components/Base/ErrorInputMessage";
import {InputWrapper} from "components/Base/Form/FormInput/styles"

const FormInput = forwardRef((props, ref) => {
    const {name, type, placeholder, valid, align, onChange} = props;
    return (
        <InputWrapper
            controlId="formBasicEmail"
            align={align}
        >
            <Form.Control
                type={type}
                placeholder={placeholder}
                name={name}
                ref={ref}
                onChange={onChange}
            />
            <ErrorInputMessage message={valid}/>
        </InputWrapper>
    );
});

export default FormInput;

