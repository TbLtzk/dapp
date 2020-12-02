import React from "react";

import {drizzleReactHooks} from "@drizzle/react-plugin";
import {useSelector} from "react-redux";
import {userAddressMetamask} from "store/selectors/user-inf";


import {Row, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlus} from "@fortawesome/free-solid-svg-icons"

import {WrapBtnBlock, ButtonCustom, BtnLabel} from "./styles";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

function CreateQProposalBtn() {
    const {drizzle} = useDrizzle();
    const state = useDrizzleState(state => state);
    const userAddress = useSelector(userAddressMetamask);

    const onCreateProposal = async () => {
        const dummyHash = '0816';
        const zeroAddress = '0x0000000000000000000000000000000000000000';

        const createProposal = await drizzle.contracts.RootsVoting.methods.createProposal.cacheSend(
            dummyHash, userAddress, `www.q.org/addRoot-${userAddress.substr(2, 4)}`, zeroAddress, {from: userAddress});
        console.log("createProposal", createProposal)
    };

    return (
        <WrapBtnBlock>
            <ButtonCustom
                variant="primary"
                onClick={onCreateProposal}
            >
                <FontAwesomeIcon icon={faPlus}/>
            </ButtonCustom>
            <BtnLabel>Create Q Proposal</BtnLabel>
        </WrapBtnBlock>

    );
}

export default CreateQProposalBtn;

