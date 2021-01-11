import React, { useCallback } from 'react';

import { useSelector } from 'react-redux';
import { formObject } from 'store/selectors/voting/proposals';

import InputGroup from '../../InputGroup';
import RadioBtnGroup from 'pages/UserPages/QGovernance/components/CreateQProposalBtn/RadioBtnGroup';

import { constUpdate } from './constants';

import { SubTitle, SummarText, SummarTextLink, SummarTextType } from '../styles';

function CreateStep3(props) {
  const { activeTab, register, errors } = props;
  const formData = useSelector(formObject);

  const showCommonData = (children) => {
    return (
      <div>
        <SubTitle>Chosen data:</SubTitle>
        <SummarText>Type:
          <SummarTextType> {formData?.first?.replace(/-/g, ' ')}</SummarTextType>
        </SummarText>
        {children}
      </div>
    );
  };

  const contentSwitcher = useCallback(() => {
    switch (activeTab) {
      case 'q-proposals':
        if (formData?.first === 'emergency-update' || formData?.first === 'general-q-update') {
          return showCommonData(
            <SummarText>External link: {formData['external-link']}</SummarText>
          );
        } else if (formData?.first === 'constitution-update') {
          if (formData['change-constitution-parameter'] === 'no') {
            return showCommonData(
              <>
                <SummarText>Classification: <SummarTextType>{formData?.classification?.replace(/-/g, ' ')}</SummarTextType></SummarText>
                <SummarText>External link:</SummarText>
                <SummarTextLink>{formData['external-link']}</SummarTextLink>
                <SummarText style={{ marginBottom: 0 }}>Hash:</SummarText>
                <SummarText>{formData.hash}</SummarText>
                <SummarText>Change Constitution
                  Parameter: {formData['change-constitution-parameter']}</SummarText>
              </>
            );
          } else {
            return (
              <div>
                <SubTitle>{constUpdate.inputTitle}</SubTitle>
                <SubTitle>{constUpdate.radioBtnTitle}</SubTitle>
                <RadioBtnGroup
                  formData={formData}
                  radioArr={constUpdate.radioBtn}
                  register={register}
                  errors={errors}
                  nameArr={constUpdate.radioBtnName}
                  handleChange={(value) => {
                  }}
                />
                <InputGroup
                  formData={formData}
                  inputArr={constUpdate.inputs}
                  inputsObj={constUpdate.inputsObj}
                  register={register}
                  errors={errors}
                />
              </div>

            );
          }
        }
        break;
      case 'q-root-node-panel':
        return showCommonData(
          <>
            <SummarText>External link: {formData['external-link']}</SummarText>
            {formData.first === 'add-a-new-root-node'
              ? <>
                <SummarText style={{ marginBottom: 0 }}>Hash:</SummarText>
                <SummarText>{formData.hash}</SummarText>
                <SummarText>Remove a current Root Node: {formData['remove-current']}</SummarText>
                {formData['remove-current'] === 'no' ? null :
                  <SummarText>Root Node to Remove: {formData.address}</SummarText>
                }
              </>
              : <>
                <SummarText>Root Node to Remove: {formData.address}</SummarText>
                <SummarText>External link:</SummarText>
                <SummarTextLink>{formData['external-link']}</SummarTextLink>
              </>
            }
          </>
        );
      case 'slashing-proposals' :
        return showCommonData(
          <>
            <SummarText>Candidate to Slash: {formData.address}</SummarText>
            <SummarText>Stake Amount to slash: {formData['%-value']}%</SummarText>
            <SummarText>External link:</SummarText>
            <SummarTextLink>{formData['external-link']}</SummarTextLink>
          </>
        );
      case 'q-expert-proposals':
        return showCommonData(
          <>
            <SummarText>Panel to add an Expert:
              <SummarTextType> {formData['type-proposal']?.replace(/-/g, ' ')}</SummarTextType>
            </SummarText>
            <SummarText>External link:</SummarText>
            <SummarTextLink>{formData['external-link']}</SummarTextLink>
            {formData?.first !== 'parameter-vote'
              ? <SummarText>Candidate Q Address: {formData.address}</SummarText>
              : <>
                <SummarText>Key-Name: {formData.key}</SummarText>
                <SummarText>Type of parameter: {formData['type-value-proposal']}</SummarText>
                <SummarText>Value for Parameter: {formData.value}</SummarText>
              </>
            }
          </>
        );
      default:
        return null;
    }

  }, [activeTab, register, errors]);

  return (
    <>
      {contentSwitcher()}
    </>
  );
}

export default CreateStep3;

