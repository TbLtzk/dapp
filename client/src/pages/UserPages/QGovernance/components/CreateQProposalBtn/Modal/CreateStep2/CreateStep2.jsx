import React, {useCallback, useState} from "react";
import {useSelector} from "react-redux";
import {formObject} from "store/selectors/voting/qproposals";

import {Row} from "react-bootstrap";
import Button from "components/Base/Buttons/Button";
import InputCheckbox from "components/Base/Form/InputCheckbox";

import {constUpdate} from "./constants";
import {SubTitle, SubTitleHighlightProposal} from "../styles";
import {useForm} from "react-hook-form";
import RadioBtnGroup from "pages/UserPages/QGovernance/components/CreateQProposalBtn/RadioBtnGroup";


function CreateStep2(props) {
    const {activeTab, activeTabTitle, register, errors} = props;
    const formData = useSelector(formObject);

    const contentSwitcher = useCallback(() => {
        switch (formData?.typeProposal) {
            case "constitution-update":
                return constUpdate;
            case "general-q-update":
                // return arrQRootNode;
                break;
            case "emergency-update":
                // return arrExpert;
                break;

            default:
                return '';
        }

    }, [activeTab]);

    return (
        <div>
            <p>
                Step 2
            </p>

        </div>
    );
}

export default CreateStep2;

