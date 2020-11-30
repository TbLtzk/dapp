import React from "react";
import {Row, Col} from "react-bootstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlus} from "@fortawesome/free-solid-svg-icons"

import {WrapBtnBlock, ButtonCustom, BtnLabel} from "./styles";

function CreateQProposalBtn() {

    return (
        <WrapBtnBlock>
            <ButtonCustom
                variant="primary"
                onClick={()=>{console.log("create proposal")}}
            >
                <FontAwesomeIcon icon={faPlus}/>
            </ButtonCustom>
            <BtnLabel>Create Q Proposal</BtnLabel>
        </WrapBtnBlock>

    );
}

export default CreateQProposalBtn;

