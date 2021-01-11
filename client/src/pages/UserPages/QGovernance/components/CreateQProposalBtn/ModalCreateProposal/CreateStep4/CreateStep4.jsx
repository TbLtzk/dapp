import React, {useCallback} from "react";

import {useSelector} from "react-redux";
import {formObject} from "store/selectors/voting/proposals";

import {SubTitle, SummarText, SummarTextLink, SummarTextType} from "../styles";

function CreateStep4(props) {
    const {activeTab} = props;
    const formData = useSelector(formObject);

    const contentSwitcher = useCallback(() => {
        switch (activeTab) {
            case "q-proposals":
                if (formData["change-constitution-parameter"] === "yes") {
                    return (
                        <div>
                            <SubTitle>Chosen data:</SubTitle>
                            <SummarText>Type: <SummarTextType>{formData?.first?.replace(/-/g, " ")}</SummarTextType></SummarText>
                            <SummarText>Classification: <SummarTextType>{formData?.classification?.replace(/-/g, " ")}</SummarTextType></SummarText>
                            <SummarText>External link:</SummarText>
                            <SummarTextLink>{formData["external-link"]}</SummarTextLink>
                            <SummarText style={{marginBottom: 0}}>Hash:</SummarText>
                            <SummarText>{formData.hash}</SummarText>
                            <SummarText>Change Constitution Parameter: {formData["change-constitution-parameter"]}</SummarText>
                            <SummarText>Parameter key: {formData["parameter-key"]}</SummarText>
                            <SummarText>Type Proposal: {formData["type-proposal"]}</SummarText>
                            <SummarText>Value: {formData["value"]}</SummarText>
                        </div>
                    )
                }
                break;
            default:
                return null;
        }

    }, [activeTab]);

    return (
        <>
            {contentSwitcher()}
        </>
    );
}

export default CreateStep4;

