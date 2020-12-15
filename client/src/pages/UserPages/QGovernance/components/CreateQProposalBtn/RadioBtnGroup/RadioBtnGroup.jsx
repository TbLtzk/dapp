import React, {useCallback, useEffect, useMemo, useState} from "react";

import {useSelector} from "react-redux";
import {formObject} from "store/selectors/voting/qproposals";
import InputRadio from "components/Base/Form/InputRadio";

import {arrQProposal, arrQRootNode, arrSlashing, arrExpert} from "./constants";

import {Wrap} from "./styles";

function RadioBtnGroup(props) {
    const {activeTab, handleChange, register, errors} = props;
    const [activeRadioBtn, setActiveRadioBtn] = useState('');

    const formData = useSelector(formObject);

    useEffect(() => {
        setActiveRadioBtn(formData?.typeProposal);
    },[formData]);

    const checkboxArr = useMemo(() => {
        switch (activeTab) {
            case "q-proposals":
                return arrQProposal;
            case "q-root-node-panel":
                return arrQRootNode;
            case "q-expert-proposals":
                return arrExpert;
            case "slashing-proposals":
                return arrSlashing;
            default:
                return [];
        }

    }, [activeTab]);

    return (
        <Wrap>
            {checkboxArr?.map((value, i) => {
                const nameField = value.replace(/ /g, "-").toLowerCase();
                return (
                    <InputRadio
                        key={i}
                        name="typeProposal[]"
                        active={activeRadioBtn === nameField}
                        // name={nameField}
                        checked={activeRadioBtn === nameField}
                        handleChange={(value) => {
                            setActiveRadioBtn(value.target.value);
                            handleChange(value);
                        }}
                        label={value}
                        value={nameField}
                        ref={register}
                        valid={errors[nameField]?.message}
                    />
                )
            })}
        </Wrap>
    );
}

export default RadioBtnGroup;

