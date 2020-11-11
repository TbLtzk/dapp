import React from "react";

import Header from "components/Navigarions/Header";
import Routes from "navigation/Routes";

import {WrapContainer} from "./styles"

function MainContainer() {

    return (
        <>
            <Header/>
            <WrapContainer fluid>
                <Routes/>
            </WrapContainer>
        </>

    );
}

export default MainContainer;

