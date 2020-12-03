import React from "react";
import {Col} from "react-bootstrap";

import LinkLikeBtn from "components/Base/LinkLikeBtn";
import LogoImg from "components/Base/LogoImg";

import {WrapContainer, WrapRow, WrapBlock, WrapLogo} from "./styles"

function NotAuth() {

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
                        />
                    </WrapBlock>
                </Col>
            </WrapRow>
        </WrapContainer>
    );

}

export default NotAuth;

