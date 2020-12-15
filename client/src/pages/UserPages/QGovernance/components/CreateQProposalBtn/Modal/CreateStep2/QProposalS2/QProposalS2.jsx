import React, {useCallback, useMemo, useState} from "react";

import {useSelector} from "react-redux";
import {formObject} from "store/selectors/voting/qproposals";

import RadioBtnGroup from "../../../RadioBtnGroup";
import {SubTitle, SubTitleHighlightProposal} from "../../styles";
import {constUpdate} from "./constants";


function QProposalS2(props) {
    const {activeTab, activeTabTitle, register, errors, onDataChanged} = props;
    const formData = useSelector(formObject);

    return (
        <div>
            <SubTitle>
                {constUpdate.radioBtnUpTitle}
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

export default QProposalS2;

