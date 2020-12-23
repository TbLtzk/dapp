import React, {useCallback, useState, Fragment} from "react";

import {useSelector} from "react-redux";
import {formObject} from "store/selectors/voting/qproposals";

import FormInput from "components/Base/Form/FormInput";

import {Wrap} from "./styles";
import {Descr} from "../ModalCreateProposal/styles";

function InputGroup(props) {
    const {register, errors, inputArr, inputsObj, labelsArr} = props;
    const formData = useSelector(formObject);
    const [valueInput, changeValueInput] = useState(() => {
        return formData.hasOwnProperty(inputArr[0]?.replace(/ /g, "-").toLowerCase())
            ? formData
            : {...formData, ...inputsObj};
    });

    const refType = useCallback((nameField) => {
        if (nameField !== "external-link" && nameField !== "address") {
            return register({required: "Field is required!"})
        } else {
            let valueValid = '';
            if (nameField === "external-link"){
                valueValid =  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
            }else if (nameField === "address") {
                valueValid = /^(0x)?[0-9a-f]{40}$/i;
            }
            return register({
                required: "Field is required!",
                pattern: {
                    value: valueValid,
                    message: "Entered value does not match to current format"
                }
            })
        }

    }, []);

    return (
        <Wrap>
            {inputArr?.map((label, i) => {
                const nameField = label.replace(/ /g, "-").toLowerCase();
                let val = valueInput[nameField];
                return (
                    <Fragment key={i}>
                        {labelsArr ? <Descr>{labelsArr[i]}</Descr> : null}
                        <FormInput
                            name={nameField}
                            onChange={(value) => {
                                const valObg = {[nameField]: value.target.value};
                                changeValueInput({...valueInput, ...valObg});
                            }}
                            value={val}
                            placeholder={label}
                            ref={refType(nameField)}
                            valid={errors[nameField]?.message}
                        />
                    </Fragment>
                )
            })}
        </Wrap>
    );
}

export default InputGroup;


