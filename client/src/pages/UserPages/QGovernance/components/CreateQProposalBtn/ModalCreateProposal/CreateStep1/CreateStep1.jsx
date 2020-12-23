import React, {useCallback} from "react";

import {useDispatch} from "react-redux";
import {
    setCreatedStepsLimit,
    setCreateProposalObj,
    setDisabledCreatedProposalBtn
} from "store/actions/action-creaters/voting/qproposals";

import RadioBtnGroup from "../../RadioBtnGroup";

import {SubTitle, SubTitleHighlightProposal} from "../styles";

function CreateStep1(props) {
    const {activeTab, activeTabTitle, register, errors, radioArr} = props;
    const dispatch = useDispatch();

    const onChooseProposal = useCallback((value) => {
        console.log("clean object");
        const radioVal = value.target.value;
        dispatch(setCreateProposalObj({first: radioVal}));
        dispatch(setDisabledCreatedProposalBtn(false));

        switch (activeTab) {
            case "q-proposals":
                switch (radioVal) {
                    case "constitution-update":
                        dispatch(setCreatedStepsLimit(4));
                        break;
                    case "general-q-update":
                        dispatch(setCreatedStepsLimit(3));
                        break;
                    case "emergency-update":
                        dispatch(setCreatedStepsLimit(3));
                        break;
                }
                break;
            default:
                return [];
        }
    }, []);

    return (
        <div>
            <SubTitle>
                Please select type of <SubTitleHighlightProposal>{activeTabTitle}</SubTitleHighlightProposal>
            </SubTitle>

            <RadioBtnGroup
                register={register}
                errors={errors}
                nameArr="first"
                radioArr={radioArr}
                handleChange={onChooseProposal}
            />
        </div>
    );
}

export default CreateStep1;

