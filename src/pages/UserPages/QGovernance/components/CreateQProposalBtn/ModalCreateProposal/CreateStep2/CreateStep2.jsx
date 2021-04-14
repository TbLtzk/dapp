import React, {useCallback} from "react";

import QProposalS2 from "./QProposalS2";
import QRootNodeS2 from "./QRootNodeS2";
import QExpertS2 from "./QExpertS2";
import SlashingS2 from "./SlashingS2";

function CreateStep2(props) {
    const {activeTab, register, errors} = props;

    const contentSwitcher = useCallback(() => {
        switch (activeTab) {
            case "q-proposals":
                return <QProposalS2 register={register} errors={errors}/>;
            case "q-root-node-panel":
                return <QRootNodeS2 register={register} errors={errors}/>;
            case "q-expert-proposals":
                return <QExpertS2 register={register} errors={errors}/>;
            case "slashing-proposals":
                return <SlashingS2 register={register} errors={errors}/>;
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

