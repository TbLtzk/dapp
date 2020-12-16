import React, {useCallback} from "react";

import {useDispatch, useSelector} from "react-redux";
import {createdStepsLimit, formObject} from "store/selectors/voting/qproposals";
import {setCreatedStepsLimit} from "store/actions/action-creaters/voting/qproposals";

import RadioBtnGroup from "../../../RadioBtnGroup";
import InputGroup from "../../../InputGroup";

import {addNewExpert, removeRootNode} from "./constants";

import {SubTitle, SubTitleBold, Descr} from "../../styles";

function QExpertS2(props) {
    const {activeTab, register, errors} = props;
    const formData = useSelector(formObject);

    const dispatch = useDispatch();

    const switchContentOnTypeProposal = useCallback(() => {
        switch (formData?.first) {
            case "add-a-new-expert":
                return (
                    <>
                        <SubTitle>{addNewExpert.subtitle}</SubTitle>
                        <Descr>{addNewExpert.radioDescr}</Descr>
                        <RadioBtnGroup
                            radioArr={addNewExpert.radioBtn}
                            register={register}
                            errors={errors}
                            nameArr={addNewExpert.radioBtnName}
                            handleChange={(value) => {
                                // value.target.value === "no"
                                //     ? dispatch(setCreatedStepsLimit(2))
                                //     : dispatch(setCreatedStepsLimit(3)) ;
                            }}
                        />
                        <SubTitle>{addNewExpert.subtitleInputUp}</SubTitle>
                        <InputGroup
                            inputArr={addNewExpert.inputUp}
                            inputsObj={addNewExpert.inputUpObj}
                            register={register}
                            errors={errors}
                        />
                        <SubTitle>{addNewExpert.subtitleInputDown}</SubTitle>
                        <InputGroup
                            inputArr={addNewExpert.inputDown}
                            inputsObj={addNewExpert.inputDownObj}
                            register={register}
                            errors={errors}
                        />

                    </>
                );
            case "remove-a-current-expert":
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
                // parameter-vote
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

export default QExpertS2;

