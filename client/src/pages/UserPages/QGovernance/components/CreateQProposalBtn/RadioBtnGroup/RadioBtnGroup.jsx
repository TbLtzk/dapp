import React, {useEffect, useState} from "react";

import {useSelector} from "react-redux";
import {formObject} from "store/selectors/voting/proposals";

import InputRadio from "components/Base/Form/InputRadio";
import ErrorInputMessage from "components/Base/ErrorInputMessage";

import {Wrap} from "./styles";

function RadioBtnGroup(props) {
    const {nameArr, handleChange, register, errors, radioArr, formData} = props;
    const [activeRadioBtn, setActiveRadioBtn] = useState('');

    // const formData = useSelector(formObject);

    useEffect(() => {
        setActiveRadioBtn(formData[nameArr]);
    },[formData]);

    return (
        <Wrap>
            {radioArr?.map((value, i) => {
                const valueField = value.replace(/ /g, "-").toLowerCase();
                const name = nameArr + "[]";
                return (
                    <InputRadio
                        key={i}
                        name={name}
                        active={activeRadioBtn === valueField}
                        checked={activeRadioBtn === valueField}
                        handleChange={(value) => {
                            setActiveRadioBtn(value.target.value);
                            handleChange(value);
                        }}
                        label={value}
                        value={valueField}
                        ref={register({required: "Choose one option!"})}
                    />
                )
            })}
            <ErrorInputMessage message={errors[nameArr]?.message}/>
        </Wrap>
    );
}

export default RadioBtnGroup;

