import React from "react";

import QGovernance from "./QGovernance";
import EndedProposals from "./QGovernance/EndedProposals";
import PiggyBank from "./PiggyBank";
import Staking from "./Staking";

import Header from "components/Navigations/Header";
import LoadingTransaction from "components/Custom/LoadingTransaction";

import {WrapContainer} from "./styles"

function UserPages(props) {
    const {location} = props;

    const componentSwitcher = () => {
        switch (location.pathname) {
            case '/q-governance':
                return <QGovernance/>;
            case '/piggy-bank':
                return <PiggyBank/>;
            case '/staking':
                return <Staking/>;
            case '/ended-proposals':
                return <EndedProposals/>;
            default:
                return <QGovernance/>;
        }
    };

    return (
        <>
            <Header/>
            <WrapContainer fluid>
                {componentSwitcher()}
            </WrapContainer>
            <LoadingTransaction/>
        </>
    );
}

export default UserPages;

