import React, {useCallback, useState} from "react";

import {useSelector} from "react-redux";
import {formObject} from "store/selectors/voting/qproposals";

import InputGroup from "../../InputGroup";
import {constUpdate} from "./constants";


import {SubTitle} from "../styles";
import {addRootNode} from "pages/UserPages/QGovernance/components/CreateQProposalBtn/Modal/CreateStep2/QRootNodeS2/constants";
import RadioBtnGroup from "pages/UserPages/QGovernance/components/CreateQProposalBtn/RadioBtnGroup";

function CreateStep3(props) {
    const {activeTab, register, errors} = props;
    const formData = useSelector(formObject);

    const contentSwitcher = useCallback(() => {
        switch (activeTab) {
            case "q-proposals":
                return (
                    <div>
                        <SubTitle>{constUpdate.inputTitle}</SubTitle>
                        <SubTitle>{constUpdate.radioBtnTitle}</SubTitle>
                        <RadioBtnGroup
                            radioArr={constUpdate.radioBtn}
                            register={register}
                            errors={errors}
                            nameArr={constUpdate.radioBtnName}
                            handleChange={(value) => {
                                // value.target.value === "no"
                                //     ? dispatch(setCreatedStepsLimit(2))
                                //     : dispatch(setCreatedStepsLimit(3)) ;
                            }}
                        />
                        <InputGroup
                            inputArr={constUpdate.inputs}
                            inputsObj={constUpdate.inputsObj}
                            register={register}
                            errors={errors}
                        />
                    </div>

                );
            default:
                return null;
        }

    }, [activeTab, register, errors]);

    return (
        <>
            {contentSwitcher()}
        </>
    );
}

export default CreateStep3;

