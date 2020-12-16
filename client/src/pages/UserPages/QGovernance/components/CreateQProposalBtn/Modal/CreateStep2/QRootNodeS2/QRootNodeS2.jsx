import React, {useCallback} from "react";

import {useDispatch, useSelector} from "react-redux";
import {createdStepsLimit, formObject} from "store/selectors/voting/qproposals";
import {setCreatedStepsLimit} from "store/actions/action-creaters/voting/qproposals";

import RadioBtnGroup from "../../../RadioBtnGroup";
import InputGroup from "../../../InputGroup";

import {addRootNode, removeRootNode} from "./constants";

import {SubTitle, SubTitleBold, Descr} from "../../styles";

function QRootNodeS2(props) {
    const {activeTab, register, errors} = props;
    const formData = useSelector(formObject);

    const dispatch = useDispatch();

    const switchContentOnTypeProposal = useCallback(() => {
        switch (formData?.first) {
            case "add-a-new-root-node":
                return (
                    <>
                        <SubTitle>{addRootNode.subtitle}</SubTitle>
                        <InputGroup
                            labelsArr={addRootNode.inputTitleDescr}
                            inputArr={addRootNode.inputs}
                            inputsObj={addRootNode.inputsObj}
                            register={register}
                            errors={errors}
                        />
                        <SubTitle>{addRootNode.radioBtnTitle}</SubTitle>
                        <RadioBtnGroup
                            radioArr={addRootNode.radioBtnDown}
                            register={register}
                            errors={errors}
                            nameArr={addRootNode.radioBtnDownName}
                            handleChange={(value) => {
                                // value.target.value === "no"
                                //     ? dispatch(setCreatedStepsLimit(2))
                                //     : dispatch(setCreatedStepsLimit(3)) ;
                            }}
                        />
                        <SubTitle>{addRootNode.inputTitleDown}</SubTitle>
                        <InputGroup
                            inputArr={addRootNode.inputDown}
                            inputsObj={addRootNode.inputDownObj}
                            register={register}
                            errors={errors}
                        />
                    </>
                );
            case "remove-a-current-root-node":
                return (
                    <>
                        <SubTitle>{removeRootNode.subtitle}</SubTitle>
                        <InputGroup
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

    }, [activeTab, register, errors]);

    return (
        <div>
            {switchContentOnTypeProposal()}
        </div>
    );
}

export default QRootNodeS2;

