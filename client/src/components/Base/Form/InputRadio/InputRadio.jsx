import React, {forwardRef} from "react";
import {Form} from "react-bootstrap";

import {RadioBtn} from "./styles"

const InputRadio = forwardRef((props, ref) => {
    const {active, label, name, value, checked, handleChange} = props;
    console.log("active",active);
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

