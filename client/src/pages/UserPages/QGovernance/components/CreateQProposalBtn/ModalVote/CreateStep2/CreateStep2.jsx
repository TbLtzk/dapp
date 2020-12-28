import React, {useCallback} from "react";

import {useSelector} from "react-redux";
import {formVoteObject} from "store/selectors/voting/proposals";
import {basicVote, constitutionCheck, communityVeto} from "./constants";
import {SubTitle, Descr} from "pages/UserPages/QGovernance/components/CreateQProposalBtn/ModalVote/styles";
import RadioBtnGroup from "../../RadioBtnGroup";

function CreateStep2(props) {
    const {activeTab, register, errors} = props;
    const formData = useSelector(formVoteObject);

    const contentSwitcher = useCallback(() => {
        switch (formData?.first) {
            case "basic-vote-on-proposal":
                return (
                    <>
                        <SubTitle>{basicVote.subtitle}</SubTitle>
                        <Descr>{basicVote.radioBtnDescr}</Descr>
                        <RadioBtnGroup
                            formData={formData}
                            radioArr={basicVote.radioBtn}
                            register={register}
                            errors={errors}
                            nameArr={basicVote.radioBtnName}
                            handleChange={(value) => {
                            }}
                        />
                    </>
                );
            case "constitution-check":
                return (
                    <>
                        <SubTitle>{constitutionCheck.subtitle}</SubTitle>
                        <Descr>{constitutionCheck.radioBtnDescr}</Descr>
                        <RadioBtnGroup
                            formData={formData}
                            radioArr={constitutionCheck.radioBtn}
                            register={register}
                            errors={errors}
                            nameArr={constitutionCheck.radioBtnName}
                            handleChange={(value) => {
                            }}
                        />
                    </>
                );
            case "q-community-veto":
                return (
                    <>
                        <SubTitle>{communityVeto.subtitle}</SubTitle>
                        <Descr>{communityVeto.radioBtnDescr}</Descr>
                        <RadioBtnGroup
                            formData={formData}
                            radioArr={communityVeto.radioBtn}
                            register={register}
                            errors={errors}
                            nameArr={communityVeto.radioBtnName}
                            handleChange={(value) => {
                            }}
                        />
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

export default CreateStep2;

