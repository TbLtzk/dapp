import React from "react";

import Dashboard from "./Dashboard";
import WelcomePage from "./WelcomePage";
import Header from "components/Navigations/Header";

import {WrapContainer} from "./styles"

function RootUserPages(props) {
    const {location} = props;

    const componentSwitcher = () => {
        switch (location.pathname) {
            case '/dashboard':
                return <Dashboard/>;
            case '/welcome':
                return <WelcomePage/>;
            default:
                return <Dashboard/>;
        }
    };

    return (
        <>
            <Header/>
            <WrapContainer fluid>
                <h3>Root user pages</h3>
                {componentSwitcher()}
            </WrapContainer>
        </>

    );
}

export default RootUserPages;

