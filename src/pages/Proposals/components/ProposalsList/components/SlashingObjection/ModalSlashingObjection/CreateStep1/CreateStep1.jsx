import React from 'react';
import { useSelector } from 'react-redux';

import FormInput from 'components/Base/Form/FormInput';
import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup';

import { formObject } from 'store/modal-handler/selectors';

import { fieldTypes } from 'constants/fieldTypes';
import { slashingTypes } from 'constants/slashingTypes';

function CreateStep1 ({ activeTab, register, errors, setValue }) {
  const formData = useSelector(formObject);

  switch (activeTab) {
    case slashingTypes.castObjection:
      return (
        <div>
          <h2>The target of a slashing proposal has the right tp object the slashing.</h2>
          <FormInput
            invertedColors
            refType={fieldTypes.externalLinkOptional}
            name="external-link"
            placeholder="External Link"
            label="Please provide a reference link to external source giving details of your objection"
            error={errors['external-link']?.message}
            register={register}
          />
        </div>
      );
    case slashingTypes.proposerRemark:
      return (
        <div>
          <h2>As the slashing objection proposer please provide a valid reason.</h2>
          <FormInput
            invertedColors
            refType={fieldTypes.proposerRemark}
            name="proposer-remark"
            placeholder="Proposer remark"
            label="Please provide a remark about the objection"
            error={errors['proposer-remark']?.message}
            register={register}
          />
        </div>
      );
    case slashingTypes.proposeDecision:
      return (
        <div>
          <h2>Members of the Root Node Panel check the objection and propose decision to confirm.</h2>
          <FormInput
            invertedColors
            refType={fieldTypes.externalLink}
            name="external-link"
            placeholder="External Link"
            label="Please provide a reference link to external source giving details of your decision"
            error={errors['external-link']?.message}
            register={register}
          />
          <FormInput
            invertedColors
            refType={fieldTypes.percentValue}
            name="%-value"
            placeholder="%-Value"
            label="Please provide the adjusted percentage for slashing"
            error={errors['%-value']?.message}
            register={register}
            setValue={setValue}
          />
          <h2>Did the target of the slashing neglect a formal appeal?</h2>
          <RadioBtnGroup
            formData={formData}
            values={['Yes', 'No']}
            register={register}
            errors={errors}
            name="target-slashing-appeal"
            handleChange={() => {}}
          />
        </div>
      );
    default:
      return null;
  }
}

export default CreateStep1;
