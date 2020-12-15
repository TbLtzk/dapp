import React, {useCallback, useMemo, useState} from "react";

import {useSelector} from "react-redux";
import {formObject} from "store/selectors/voting/qproposals";

import {SubTitle, SubTitleHighlightProposal} from "../styles";
import RadioBtnGroup from "../../RadioBtnGroup";

function CreateStep1(props) {
    const {activeTab, activeTabTitle, register, errors, onDataChanged} = props;
    const formData = useSelector(formObject);

    return (
        <div>
            <SubTitle>
                Please select type of <SubTitleHighlightProposal>{activeTabTitle}</SubTitleHighlightProposal>
            </SubTitle>

            <RadioBtnGroup
                register={register}
                errors={errors}
                activeTab={activeTab}
                handleChange={(value) => {
                    onDataChanged(value);
                }}
            />
        </div>
    );
}

export default CreateStep1;

