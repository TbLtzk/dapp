import React, {useCallback} from "react";

import {useDispatch, useSelector} from "react-redux";
import {
    setVoteProposalObj,
    setDisabledCreatedProposalBtn
} from "store/actions/action-creaters/voting/qproposals";

import RadioBtnGroup from "../../RadioBtnGroup";

import {SubTitle, SubTitleHighlightProposal} from "../styles";
import {arrRadioBtn} from "../constants";
import {formVoteObject} from "store/selectors/voting/qproposals";

function CreateStep1(props) {
    const {register, errors} = props;
    const dispatch = useDispatch();
    const formData = useSelector(formVoteObject);
    console.log("formData", formData);

    const onChooseProposal = useCallback((value) => {
        console.log("clean object");
        const radioVal = value.target.value;
        dispatch(setVoteProposalObj({first: radioVal}));
        dispatch(setDisabledCreatedProposalBtn(false));
    }, []);

    return (
        <div>
            <SubTitle>
                Please select type of Vote
            </SubTitle>

            <RadioBtnGroup
                register={register}
                errors={errors}
                nameArr="first"
                radioArr={arrRadioBtn}
                handleChange={onChooseProposal}
            />
        </div>
    );
}

export default CreateStep1;

