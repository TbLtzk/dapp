import React, {useCallback, useEffect, useMemo, useState, Fragment} from "react";

import {useSelector} from "react-redux";
import {formObject} from "store/selectors/voting/qproposals";

import FormInput from "components/Base/Form/FormInput";

import {Wrap} from "./styles";
import {
    addRootNode,
    removeRootNode
} from "pages/UserPages/QGovernance/components/CreateQProposalBtn/Modal/CreateStep2/QRootNodeS2/constants";
import {Descr} from "pages/UserPages/QGovernance/components/CreateQProposalBtn/Modal/styles";

function InputGroup(props) {
    const {register, errors, inputArr, inputsObj, labelsArr} = props;
    const formData = useSelector(formObject);
    const [valueInput, changeValueInput] = useState(() => {
        return formData.hasOwnProperty(inputArr[0]?.replace(/ /g, "-").toLowerCase())
            ? formData
            : {...formData, ...inputsObj};
    });

    const refType = useCallback((nameField) => {
        if (nameField !== "external-link") {
            return register({required: "Field is required!"})
        } else {
            return register({
                required: "Field is required!",
                pattern: {
                    value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
                    message: "Entered value does not match link format"
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
                            // key={i}
                            name={nameField}
                            onChange={(value) => {
                                const valObg = {[nameField]: value.target.value};
                                changeValueInput({...valueInput, ...valObg});
                            }}
                            value={val}
                            placeholder={label}
                            ref={refType(nameField)}
                            // ref={register({required: "Field is required!"})}
                            valid={errors[nameField]?.message}
                        />
                    </Fragment>
                )
            })}
        </Wrap>
    );
}

export default InputGroup;


