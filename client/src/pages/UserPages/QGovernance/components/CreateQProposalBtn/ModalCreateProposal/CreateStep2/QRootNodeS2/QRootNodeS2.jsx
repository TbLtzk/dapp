import React, {useCallback, useState} from "react";

import {useSelector} from "react-redux";
import {formObject} from "store/selectors/voting/proposals";

import RadioBtnGroup from "../../../RadioBtnGroup";
import InputGroup from "../../../InputGroup";

import {addRootNode, removeRootNode} from "./constants";

import {SubTitle} from "../../styles";

function QRootNodeS2(props) {
    const {activeTab, register, errors} = props;
    const formData = useSelector(formObject);

    const [showAddress, setShowAddress] =
        useState(formData["remove-current"] === "yes");

    const switchContentOnTypeProposal = useCallback(() => {
        switch (formData?.first) {
            case "add-a-new-root-node":
                return (
                    <>
                        <SubTitle>{addRootNode.subtitle}</SubTitle>
                        <InputGroup
                            formData={formData}
                            labelsArr={addRootNode.inputTitleDescr}
                            inputArr={addRootNode.inputs}
                            inputsObj={addRootNode.inputsObj}
                            register={register}
                            errors={errors}
                        />
                        <SubTitle>{addRootNode.radioBtnTitle}</SubTitle>
                        <RadioBtnGroup
                            formData={formData}
                            radioArr={addRootNode.radioBtnDown}
                            register={register}
                            errors={errors}
                            nameArr={addRootNode.radioBtnDownName}
                            handleChange={(value) => {
                                value.target.value === "no"
                                    ? setShowAddress(false)
                                    : setShowAddress(true)
                            }}
                        />
                        {!showAddress ? null :
                            <>
                                <SubTitle>{addRootNode.inputTitleDown}</SubTitle>
                                <InputGroup
                                    formData={formData}
                                    inputArr={addRootNode.inputDown}
                                    inputsObj={addRootNode.inputDownObj}
                                    register={register}
                                    errors={errors}
                                />
                            </>
                        }
                    </>
                );
            case "remove-a-current-root-node":
                return (
                    <>
                        <SubTitle>{removeRootNode.subtitle}</SubTitle>
                        <InputGroup
                            formData={formData}
                            labelsArr={removeRootNode.inputTitleDescr}
                            inputArr={removeRootNode.inputs}
                            inputsObj={removeRootNode.inputsObj}
                            register={register}
                            errors={errors}
                        />
                    </>
                );
            default:
                return null;
        }

    }, [activeTab, register, errors, showAddress]);

    return (
        <div>
            {switchContentOnTypeProposal()}
        </div>
    );
}

export default QRootNodeS2;

