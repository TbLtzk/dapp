import React, {forwardRef} from "react";
import {Form} from "react-bootstrap";
import ErrorInputMessage from "components/Base/ErrorInputMessage";

const FormInput = forwardRef((props, ref) => {
    const {name, type, placeholder, valid, onChange} = props;
    return (
        <Form.Group controlId="formBasicEmail">
            <Form.Control
                type={type}
                placeholder={placeholder}
                name={name}
                ref={ref}
                onChange={onChange}
            />
            <ErrorInputMessage message={valid}/>
        </Form.Group>
    );
});

export default FormInput;

