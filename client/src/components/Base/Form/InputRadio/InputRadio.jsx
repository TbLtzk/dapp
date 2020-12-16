import React, {forwardRef} from "react";
import {Form} from "react-bootstrap";

import ErrorInputMessage from "components/Base/ErrorInputMessage";

import {RadioBtn} from "./styles"

const InputRadio = forwardRef((props, ref) => {
    const {active, label, name, value, checked, handleChange} = props;
    return (
        <Form.Group controlId={value}>
            <RadioBtn
                active={Number(active)}
                type="radio"
                ref={ref}
                label={label}
                name={name}
                value={value}
                checked={checked}
                onChange={handleChange}
            />
        </Form.Group>
    );
});

export default InputRadio;

