import React, {useMemo, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {
    setCreatedStepsLimit,
    setCreateProposalObj,
    setStepCounter,
    setDisabledCreatedProposalBtn,
    createProposal
} from "store/actions/action-creaters/voting/qproposals";
import {
    formObject,
    createdStepsLimit,
    stepCounterModal,
    disabledContinueProposalBtn
} from "store/selectors/voting/qproposals";
import {useForm} from "react-hook-form";

import ModalWindow from "components/Base/ModalWindow";
import CreateStep1 from "./CreateStep1";
import CreateStep2 from "./CreateStep2";
import CreateStep3 from "./CreateStep3";

import {arrExpert, arrQProposal, arrQRootNode, arrSlashing} from "./constants";

import {Title, Descr} from "./styles"
import {userAddressMetamask} from "store/selectors/user-inf";
import {drizzleReactHooks} from "@drizzle/react-plugin";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

function Modal(props) {
    const {modalShow, onHide, activeTab, activeTabTitle} = props;
    const {drizzle} = useDrizzle();
    const {register, errors, handleSubmit} = useForm();
    const dispatch = useDispatch();

    const formData = useSelector(formObject);
    const stepLimit = useSelector(createdStepsLimit);
    const stepCounter = useSelector(stepCounterModal);
    const disabledContinueBtn = useSelector(disabledContinueProposalBtn);

    const userAddress = useSelector(userAddressMetamask);

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
        // console.log("stepCounter", stepCounter);
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
            // createProposalTest();
            onHide();
        }
        // stepCounter < stepLimit ? dispatch(setStepCounter(stepCounter + 1)) :
        //     dispatch(createProposal(drizzle, {...formData, ...data}));
        // onHide();
        // createProposalTest();

        console.log("Limit");
        // dispatch(setDisabledCreatedProposalBtn(true))
        // stepCounter < stepLimit ? setStepCounter(step => step + 1) : setDisabledContinueBtn(true)
    };
    // console.log("formData", formData);

    const createProposalTest = async () => {
        // const NEW_CONSTITUTION_HASH = '0xc81ff8689878486c77098faba9d872fd6b0ab442fa97d9c76ff94c5c56d6a6a9'.toLowerCase();
        // const createProposal = await drizzle.contracts.ConstitutionVoting.methods.createProposal.cacheSend(
        //     "https://example1.com", 0, NEW_CONSTITUTION_HASH, {from: userAddress});
        // const result = await drizzle.contracts.GeneralUpdateVoting.methods.createProposal("https://example1.com").send(
        //     {from: userAddress});
        // const result = await drizzle.contracts.EmergencyUpdateVoting.methods.createProposal("https://example1.com").send(
        //     {from: userAddress});

        console.log("createProposal", result);
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
                // setDisabledContinueBtn(false)
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

export default Modal;

