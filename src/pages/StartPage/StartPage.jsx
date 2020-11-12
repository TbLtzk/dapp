import React from "react";
import {Col} from "react-bootstrap";

import LinkLikeBtn from "components/Base/LinkLikeBtn";
import LogoImg from "components/Base/LogoImg";

import {WrapContainer, WrapRow, WrapBlock, WrapLogo} from "./styles"

function StartPage() {

    return (
        <WrapContainer fluid>
            <WrapRow>
                <Col xs={12}>
                    <WrapBlock>
                        <WrapLogo>
                            <LogoImg/>
                        </WrapLogo>
                        <LinkLikeBtn
                            type="white"
                            title="Connect with Metamask"
                            path="start-configurations"
                            // handleButton={() => {
                            //     console.log('click');
                            //     window.ethereum.request({method: 'eth_requestAccounts'});
                            // }}
                        />
                    </WrapBlock>
                </Col>
            </WrapRow>
        </WrapContainer>
    );

}

export default StartPage;

