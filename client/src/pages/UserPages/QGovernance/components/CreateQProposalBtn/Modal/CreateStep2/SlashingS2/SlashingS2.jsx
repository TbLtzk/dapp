import React, {useCallback} from "react";

import {useDispatch, useSelector} from "react-redux";
import {createdStepsLimit, formObject} from "store/selectors/voting/qproposals";
import {setCreatedStepsLimit} from "store/actions/action-creaters/voting/qproposals";

import RadioBtnGroup from "../../../RadioBtnGroup";
import InputGroup from "../../../InputGroup";

import {rootSlashing, validatorSlashing} from "./constants";

import {SubTitle, SubTitleBold, Descr} from "../../styles";

function SlashingS2(props) {
    const {activeTab, register, errors} = props;
    const formData = useSelector(formObject);

    const dispatch = useDispatch();

    const switchContentOnTypeProposal = useCallback(() => {
        switch (formData?.first) {
            case "root-node-slashing":
                return (
                    <>
                        <SubTitle>{rootSlashing.subtitle}</SubTitle>
                        <InputGroup
                            labelsArr={rootSlashing.inputTitleDescr}
                            inputArr={rootSlashing.inputs}
                            inputsObj={rootSlashing.inputsObj}
                            register={register}
                            errors={errors}
                        />
                        <SubTitle>{rootSlashing.inputTitleDown}</SubTitle>
                        <InputGroup
                            inputArr={rootSlashing.inputDown}
                            inputsObj={rootSlashing.inputDownObj}
                            register={register}
                            errors={errors}
                        />
                    </>
                );
            case "validator-node-slashing":
                return (
                    <>
                        <SubTitle>{validatorSlashing.subtitle}</SubTitle>
                        <InputGroup
                            labelsArr={validatorSlashing.inputTitleDescr}
                            inputArr={validatorSlashing.inputs}
                            inputsObj={validatorSlashing.inputsObj}
                            register={register}
                            errors={errors}
                        />
                        <SubTitle>{validatorSlashing.inputTitleDown}</SubTitle>
                        <InputGroup
                            inputArr={validatorSlashing.inputDown}
                            inputsObj={validatorSlashing.inputDownObj}
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

export default SlashingS2;

