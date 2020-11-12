import React from "react";

import UserOpenActions from "./UserOpenActions";
import QGovernance from "./QGovernance";
import Executive from "./Executive";
import Header from "components/Navigarions/Header";

import {WrapContainer} from "./styles"

function UserPages(props) {
    const {location} = props;

    const componentSwitcher = () => {
        switch (location.pathname) {
            case '/my-open-actions':
                return <UserOpenActions/>;
            case '/q-governance':
                return <QGovernance/>;
            case '/executive':
                return <Executive/>;
            default:
                return <UserOpenActions/>;
        }
    };

    return (
        <>
            <Header/>
            <WrapContainer fluid>
                <h3>User pages</h3>
                {componentSwitcher()}
            </WrapContainer>
        </>
    );
}

export default UserPages;

