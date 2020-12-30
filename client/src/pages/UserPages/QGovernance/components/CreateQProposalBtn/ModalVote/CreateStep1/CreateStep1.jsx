import React, {useCallback} from "react";

import {useDispatch, useSelector} from "react-redux";
import {
  setVoteProposalObj,
  setDisabledCreatedProposalBtn
} from "store/actions/action-creaters/voting/proposals";

import RadioBtnGroup from "../../RadioBtnGroup";

import {SubTitle} from "../styles";
import {arrRadioBtn} from "./constants";
import {formVoteObject} from "store/selectors/voting/proposals";

function CreateStep1(props) {
  const {register, errors} = props;
  const dispatch = useDispatch();
  const formData = useSelector(formVoteObject);

  const onChooseProposal = useCallback((value) => {
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
            formData={formData}
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

