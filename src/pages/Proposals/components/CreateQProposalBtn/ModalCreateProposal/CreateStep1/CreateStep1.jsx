import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup';

import {
  setCreatedStepsLimit,
  setCreateProposalObj,
  setDisabledCreatedProposalBtn
} from 'store/voting/proposals/action-creators';
import { formObject } from 'store/voting/proposals/selectors';

import { CONTRACT_TYPES } from 'constants/contracts';

function CreateStep1 ({ activeTab, activeTabTitle, register, errors, radioArr }) {
  const dispatch = useDispatch();
  const formData = useSelector(formObject);

  const onChooseProposal = useCallback((event) => {
    const { value } = event.target;
    dispatch(setCreateProposalObj({ first: value }));
    dispatch(setDisabledCreatedProposalBtn(false));

    switch (activeTab) {
      case 'q-proposals':
        switch (value) {
          case CONTRACT_TYPES.constitutionUpdate:
            dispatch(setCreatedStepsLimit(4));
            break;
          case CONTRACT_TYPES.generalQUpdate:
          case CONTRACT_TYPES.emergencyUpdate:
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
      <h2>Please select type of {activeTabTitle}</h2>
      <RadioBtnGroup
        name="first"
        formData={formData}
        register={register}
        errors={errors}
        values={radioArr}
        handleChange={onChooseProposal}
      />
    </div>
  );
}

export default CreateStep1;
