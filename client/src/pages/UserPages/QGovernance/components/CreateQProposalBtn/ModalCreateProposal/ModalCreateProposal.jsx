import React, {useMemo, useState} from "react";

import {drizzleReactHooks} from "@drizzle/react-plugin";
import {useDispatch, useSelector} from "react-redux";
import {
    setCreateProposalObj,
    setStepCounter,
    setDisabledCreatedProposalBtn,
    createProposal
} from "store/actions/action-creaters/voting/proposals";
import {
    formObject,
    createdStepsLimit,
    stepCounterModal,
    disabledContinueProposalBtn
} from "store/selectors/voting/proposals";

import {useForm} from "react-hook-form";

import ModalWindow from "components/Base/ModalWindow";
import CreateStep1 from "./CreateStep1";
import CreateStep2 from "./CreateStep2";
import CreateStep3 from "./CreateStep3";
import CreateStep4 from "./CreateStep4";

import {arrExpert, arrQProposal, arrQRootNode, arrSlashing} from "./constants";
import {Title, Descr} from "./styles"

const {useDrizzle} = drizzleReactHooks;

function ModalCreateProposal(props) {
    const {modalShow, onHide, activeTab, activeTabTitle} = props;
    const {drizzle} = useDrizzle();
    const {register, errors, handleSubmit} = useForm();
    const dispatch = useDispatch();

    const formData = useSelector(formObject);
    const stepLimit = useSelector(createdStepsLimit);
    const stepCounter = useSelector(stepCounterModal);
    const disabledContinueBtn = useSelector(disabledContinueProposalBtn);

    const radioArrFirstStep = useMemo(() => {
        switch (activeTab) {
            case "q-proposals":
                return arrQProposal;
            case "q-root-node-panel":
                return arrQRootNode;
            case "q-expert-proposals":
                return arrExpert;
            case "slashing-proposals":
                return arrSlashing;
            default:
                return [];
        }

    }, [activeTab]);

    const switchProposalContentDependsOnType = useMemo(() => {
        console.log("formData", formData);
        switch (stepCounter) {
            case 1:
                return (
                    <CreateStep1
                        formData={formData}
                        activeTab={activeTab}
                        activeTabTitle={activeTabTitle}
                        register={register}
                        errors={errors}
                        radioArr={radioArrFirstStep}
                    />
                );
            case 2:
                return (
                    <CreateStep2
                        formData={formData}
                        activeTab={activeTab}
                        activeTabTitle={activeTabTitle}
                        register={register}
                        errors={errors}
                    />
                );
            case 3:
                return (
                    <CreateStep3
                        formData={formData}
                        activeTab={activeTab}
                        activeTabTitle={activeTabTitle}
                        register={register}
                        errors={errors}
                    />
                );
            case 4:
                return (
                    <CreateStep4
                        formData={formData}
                        activeTab={activeTab}
                    />
                );
            default:
                return null;
        }

    }, [activeTab, stepCounter, register, errors, stepLimit]);

    const onNext = (data) => {
        console.log("data", data);
        dispatch(setCreateProposalObj({...formData, ...data}));
        if (stepCounter < stepLimit) {
            dispatch(setStepCounter(stepCounter + 1))
        } else {
            dispatch(createProposal(drizzle, {...formData, ...data}));
            onHide();
        }

        console.log("Transaction Sent");
    };

    return (
        <ModalWindow
            show={modalShow}
            onHide={onHide}
            backBtnTitle={
                stepCounter !== 1 ? "Back" : null
            }
            backBtnHandler={() => {
                dispatch(setStepCounter(stepCounter - 1));
                dispatch(setDisabledCreatedProposalBtn(false));
            }}
            continueBtnTitle={
                stepLimit !== stepCounter ? "Next" : "Confirm"
            }
            disabled={disabledContinueBtn}
            continueBtnHandler={handleSubmit(onNext)}
            content={
                <>
                    <Title style={{textTransform: "capitalize"}}>{activeTabTitle}</Title>
                    <Descr>Step {stepCounter} of {stepLimit}</Descr>
                    <form>
                        {switchProposalContentDependsOnType}
                    </form>
                </>
            }
        />
    );
}

export default ModalCreateProposal;

