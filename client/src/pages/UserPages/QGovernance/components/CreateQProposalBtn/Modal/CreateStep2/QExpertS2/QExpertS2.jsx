import React, {useCallback} from "react";

import {useDispatch, useSelector} from "react-redux";
import {createdStepsLimit, formObject} from "store/selectors/voting/qproposals";
import {setCreatedStepsLimit} from "store/actions/action-creaters/voting/qproposals";

import RadioBtnGroup from "../../../RadioBtnGroup";
import InputGroup from "../../../InputGroup";

import {addNewExpert, removeExpert, parameterVote} from "./constants";

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
                        <SubTitle>{removeExpert.subtitle}</SubTitle>
                        <Descr>{removeExpert.radioDescr}</Descr>
                        <RadioBtnGroup
                            radioArr={removeExpert.radioBtn}
                            register={register}
                            errors={errors}
                            nameArr={removeExpert.radioBtnName}
                            handleChange={(value) => {
                                // value.target.value === "no"
                                //     ? dispatch(setCreatedStepsLimit(2))
                                //     : dispatch(setCreatedStepsLimit(3)) ;
                            }}
                        />
                        <SubTitle>{removeExpert.subtitleInputUp}</SubTitle>
                        <InputGroup
                            inputArr={removeExpert.inputUp}
                            inputsObj={removeExpert.inputUpObj}
                            register={register}
                            errors={errors}
                        />
                        <SubTitle>{removeExpert.subtitleInputDown}</SubTitle>
                        <InputGroup
                            inputArr={removeExpert.inputDown}
                            inputsObj={removeExpert.inputDownObj}
                            register={register}
                            errors={errors}
                        />

                    </>
                );
            case "parameter-vote":
                return (
                    <>
                        <SubTitle>{parameterVote.subtitle}</SubTitle>
                        <Descr>{parameterVote.radioDescr}</Descr>
                        <RadioBtnGroup
                            radioArr={parameterVote.radioBtn}
                            register={register}
                            errors={errors}
                            nameArr={parameterVote.radioBtnName}
                            handleChange={(value) => {
                                // value.target.value === "no"
                                //     ? dispatch(setCreatedStepsLimit(2))
                                //     : dispatch(setCreatedStepsLimit(3)) ;
                            }}
                        />
                        <SubTitle>{parameterVote.subtitleInputUp}</SubTitle>
                        <InputGroup
                            inputArr={parameterVote.inputUp}
                            inputsObj={parameterVote.inputUpObj}
                            register={register}
                            errors={errors}
                        />
                        <SubTitle>{parameterVote.subtitleInputDown}</SubTitle>
                        <InputGroup
                            inputArr={parameterVote.inputDown}
                            inputsObj={parameterVote.inputDownObj}
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

export default QExpertS2;

