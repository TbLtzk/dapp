import React, {useCallback, useState} from "react";
import {useSelector} from "react-redux";
import {formObject} from "store/selectors/voting/qproposals";

import QProposalS2 from "./QProposalS2";
import QRootNodeS2 from "./QRootNodeS2";

function CreateStep2(props) {
    const {activeTab, activeTabTitle, register, errors} = props;
    const formData = useSelector(formObject);

    const contentSwitcher = useCallback(() => {
        switch (activeTab) {
            case "q-proposals":
                return <QProposalS2 register={register} errors={errors}/>;
            case "q-root-node-panel":
                return <QRootNodeS2 register={register} errors={errors}/>;
            case "q-expert-proposals":
            // return arrExpert;
            case "slashing-proposals":
            // return arrSlashing;
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

export default CreateStep2;

