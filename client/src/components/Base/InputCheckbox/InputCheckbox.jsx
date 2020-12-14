import React from "react";
import {Form} from "react-bootstrap";

import './styles.scss';


function InputCheckbox({label, name, value, checked, handleChange}) {
    return (
        <Form.Group controlId="formBasicCheckbox">
            <Form.Check
                type="checkbox"
                label={label}
                name={name}
                value={value}
                checked={checked}
                onChange={handleChange}
            />
        </Form.Group>
    );
};

export default InputCheckbox;

