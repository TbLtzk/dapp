import React, {useCallback, useState} from "react";

import {useSelector} from "react-redux";
import {formObject} from "store/selectors/voting/qproposals";

import InputGroup from "../../InputGroup";
import {constUpdate} from "./constants";


import {SubTitle} from "../styles";

function CreateStep3(props) {
    const {activeTab, register, errors} = props;
    const formData = useSelector(formObject);

    const contentSwitcher = useCallback(() => {
        switch (activeTab) {
            case "q-proposals":
                return (
                    <div>
                        <SubTitle>{constUpdate.inputTitle}</SubTitle>
                        <InputGroup
                            inputArr={constUpdate.inputs}
                            inputsObj={constUpdate.inputsObj}
                            register={register}
                            errors={errors}
                        />
                    </div>

                );
            // case "q-root-node-panel":
            // case "q-expert-proposals":
            // case "slashing-proposals":
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

