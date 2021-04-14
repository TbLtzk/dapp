import React, {useEffect, useState} from "react";

import InputRadio from "components/Base/Form/InputRadio";
import ErrorInputMessage from "components/Base/ErrorInputMessage";

import {Wrap} from "../styles";

function RadioBtnGroup(props) {
  const {nameArr, handleChange, register, errors, radioArr, formData} = props;
  const [activeRadioBtn, setActiveRadioBtn] = useState('');

  // const formData = useSelector(formObject);
  useEffect(() => {
    if (formData){
      setActiveRadioBtn(formData[nameArr]);
    }
  }, [formData, nameArr]);

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

