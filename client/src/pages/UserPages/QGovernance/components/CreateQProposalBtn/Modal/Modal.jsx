import React, {useMemo, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {setCreateProposalObj} from "store/actions/action-creaters/voting/qproposals";
import {formObject} from "store/selectors/voting/qproposals";
import {useForm} from "react-hook-form";

import ModalWindow from "components/Base/ModalWindow";
import CreateStep1 from "./CreateStep1";
import CreateStep2 from "./CreateStep2";

import {Title, Descr} from "./styles"


function Modal(props) {
    const {modalShow, onHide, activeTab, activeTabTitle} = props;
    const [stepCounter, setStepCounter] = useState(1);
    const [stepLimit, setStepLimit] = useState(3);
    const [disabledContinueBtn, setDisabledContinueBtn] = useState(true);
    // const [dataObj, setData] = useState({});
    const {register, errors, handleSubmit} = useForm();
    const dispatch = useDispatch();

    const formData = useSelector(formObject);

    const switchProposalContentDependsOnType = useMemo(() => {
        console.log("stepCounter", stepCounter);
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
                        onDataChanged={(value) => {
                            console.log("value", value.target.value);
                            setDisabledContinueBtn(false)
                        }}
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
            default:
                return null;
        }

    }, [activeTab, stepCounter]);


    const onNext = (data) => {
        dispatch(setCreateProposalObj({...formData, ...data}));
        // setCreateProposalObj
        // setData({...dataObj, ...data});
        // setData({[stepCounter]: {...dataObj, ...data}});
        console.log("data", data);
        stepCounter < stepLimit ? setStepCounter(step => step + 1) : setDisabledContinueBtn(true)
    };


    return (
        <ModalWindow
            show={modalShow}
            onHide={onHide}
            backBtnTitle={
                stepCounter !== 1 ? "Back" : null
            }
            backBtnHandler={() => {
                setStepCounter(step => step - 1);
                setDisabledContinueBtn(false)
            }}
            continueBtnTitle={
                stepLimit !== stepCounter ? "Next" : "Confirm"
            }
            disabled={disabledContinueBtn}
            continueBtnHandler={handleSubmit(onNext)}
            content={
                <>
                    <Title style={{textTransform: "capitalize"}}>{activeTabTitle}</Title>
                    <Descr>Step {stepCounter} of 3</Descr>
                    <form>
                        {switchProposalContentDependsOnType}
                    </form>
                </>
            }
        />
    );
}

export default Modal;

