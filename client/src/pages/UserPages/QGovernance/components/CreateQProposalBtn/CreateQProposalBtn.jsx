import React, {useEffect, useMemo, useState} from "react";
import Web3 from 'web3';
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {useDispatch, useSelector} from "react-redux";
import {userAddressMetamask} from "store/selectors/user-inf";
import {BigNumber} from "bignumber.js";


import Modal from "./Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlus} from "@fortawesome/free-solid-svg-icons"

import {QExpert, QProposal, QRootNode, QSlashing} from "./constants";
import {WrapBtnBlock, ButtonCustom, BtnLabel} from "./styles";
import {getRootsVotingProposals} from "store/actions/action-creaters/voting/roots-voting";
import {
    setCreatedStepsLimit,
    setCreateProposalObj,
    setStepCounter
} from "store/actions/action-creaters/voting/qproposals";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

function CreateQProposalBtn(props) {
    const {activeTab} = props;
    const {drizzle} = useDrizzle();
    const state = useDrizzleState(state => state);
    const userAddress = useSelector(userAddressMetamask);
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();

    const activeTabTitle = useMemo(() => {
        // return activeTab.replace(/-/g, " ")
        switch (activeTab) {
            case "q-proposals":
                return QProposal;
            case "q-root-node-panel":
                return QRootNode;
            case "q-expert-proposals":
                return QExpert;
            case "slashing-proposals":
                return QSlashing;
            default:
                return QProposal;
        }
    }, [activeTab]);


    const getPercentageFormat = (number) => {
        return bn(1e+27).multipliedBy(number).dividedBy(100);
    };

    function bn(number) {
        return new BigNumber(number);
    }


    const onCreateProposal = async () => {
        dispatch(setStepCounter(1));
        setModalShow(true);
        switch (activeTab) {
            case "q-proposals":
                dispatch(setCreatedStepsLimit(3));
                break;
            case "q-root-node-panel":
                dispatch(setCreatedStepsLimit(2));
                break;
            case "q-expert-proposals":
                dispatch(setCreatedStepsLimit(2));
                break;
            case "slashing-proposals":
                dispatch(setCreatedStepsLimit(2));
                break;
            default:
                return QProposal;
        }
        const NEW_CONSTITUTION_HASH = '0xc81ff8689878486c77098faba9d872fd6b0ab442fa97d9c76ff94c5c56d6a6a9'.toLowerCase();
        const percentage = getPercentageFormat(60);
        // console.log("percentage", percentage);
        // console.log("userAddress", typeof userAddress);
        // dispatch(getRootsVotingProposals(rootsVotingService))
        try {
            //RootsVoting
            // const createProposal = await drizzle.contracts.RootsVoting.methods.createProposal.cacheSend(
            //     "new1", userAddress, "0x66316FfA38490d4d072F34EF7D7BA64Ce6b4478e",{from: userAddress});
            // console.log("createProposal", createProposal);

            //ConstitutionVoting
            // const createProposal = await drizzle.contracts.ConstitutionVoting.methods.createProposal.cacheSend(
            //     "https://example1.com", 0, NEW_CONSTITUTION_HASH, {from: userAddress});
            // console.log("createProposal", createProposal);

            //ValidatorsSlashingVoting
            //address validator governance.validators
            // const createProposal = await drizzle.contracts.ValidatorsSlashingVoting.methods.createProposal.cacheSend(
            //     'https://ethereum1.org', "0x6a39b688d591ea00c9ea69658438794204b5cc62", percentage, {from: userAddress});
            // console.log("createProposal", createProposal);

            //RootNodesSlashingVoting
            //address validator governance.validators
            // const createProposal = await drizzle.contracts.RootNodesSlashingVoting.methods.createProposal.cacheSend(
            //     'https://ethereum1.org', "0x66316FfA38490d4d072F34EF7D7BA64Ce6b4478e", percentage, {from: userAddress});
            // console.log("createProposal", createProposal);

            //EPQFI_MembershipVoting
            // const createProposal = await drizzle.contracts.EPQFI_MembershipVoting.methods.createAddExpertProposal.cacheSend(
            //     'https://ethereum.org', "0x00Ec0A77f6813dB9c01C65d2E2a086EE60e69ed7",  {from: userAddress});
            // console.log("createProposal", createProposal);
            //EPDR_MembershipVoting
            // const createProposal = await drizzle.contracts.EPDR_MembershipVoting.methods.createAddExpertProposal.cacheSend(
            //     'https://ethereum1.org', "0x00Ec0A77f6813dB9c01C65d2E2a086EE60e69ed7",  {from: userAddress});
            // console.log("createProposal", createProposal);
            //EPQFI_ParametersVoting
            // const createProposal = await drizzle.contracts.EPQFI_ParametersVoting.methods.createAddrProposal.cacheSend(
            //     'https://ethereum.org', "test2", userAddress, {from: userAddress});
            // console.log("createProposal", createProposal);
            //EPDR_ParametersVoting
            // const createProposal = await drizzle.contracts.EPDR_ParametersVoting.methods.createAddrProposal.cacheSend(
            //     'https://ethereum.org', "test5", userAddress, {from: userAddress});
            // console.log("createProposal", createProposal);

        } catch (e) {
            console.log(`Root node proposal failed: ${e}`)
        }

        // const dummyHash = '0819';
        // const zeroAddress = '0x00';
        //
        // const createProposal = await drizzle.contracts.ConstitutionVoting.methods.createProposal.cacheSend(
        //     dummyHash, userAddress, `www.q.org/addRoot-${userAddress.substr(2, 4)}`, {from: userAddress})
        // ;

    };

    return (
        <>
            <WrapBtnBlock>
                <ButtonCustom
                    variant="primary"
                    onClick={onCreateProposal}
                >
                    <FontAwesomeIcon icon={faPlus}/>
                </ButtonCustom>
                <BtnLabel>Create {activeTabTitle}</BtnLabel>
            </WrapBtnBlock>

            <Modal
                activeTab={activeTab}
                activeTabTitle={activeTabTitle}
                modalShow={modalShow}
                onHide={() => {
                    setModalShow(false);
                    dispatch(setCreateProposalObj({}));
                }}
            />
        </>

    );
}

export default CreateQProposalBtn;

