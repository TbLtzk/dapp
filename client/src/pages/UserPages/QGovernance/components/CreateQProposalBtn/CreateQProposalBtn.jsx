import React from "react";
import Web3 from 'web3';
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {useSelector} from "react-redux";
import {userAddressMetamask} from "store/selectors/user-inf";


import {Row, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlus} from "@fortawesome/free-solid-svg-icons"

import {WrapBtnBlock, ButtonCustom, BtnLabel} from "pages/UserPages/QGovernance/components/CreateQProposalBtn/styles";
import getWeb3 from "getWeb3";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

function CreateQProposalBtn() {
    const {drizzle} = useDrizzle();
    const state = useDrizzleState(state => state);
    const userAddress = useSelector(userAddressMetamask);

    const onCreateProposal = async () => {
        console.log("drizzle.contracts");
        try {
            const createProposal = await drizzle.contracts.RootsVoting.methods.createProposal.cacheSend(
                "new1", userAddress, "0x66316FfA38490d4d072F34EF7D7BA64Ce6b4478e",{from: userAddress});
            console.log("createProposal", createProposal)
        }catch (e) {
            console.log(`Root node membership proposal failed: ${e}`)
        }

        // const dummyHash = '0819';
        // const zeroAddress = '0x00';
        //
        // const createProposal = await drizzle.contracts.ConstitutionVoting.methods.createProposal.cacheSend(
        //     dummyHash, userAddress, `www.q.org/addRoot-${userAddress.substr(2, 4)}`, {from: userAddress})
        // ;

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

