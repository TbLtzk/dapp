import React, {useEffect, useState} from "react";

import {Row, Col} from "react-bootstrap";

import RootNodePanel from "components/Custom/RootNodePanel";
import UserData from "components/Custom/UserData";

import {WrapContainer} from "pages/UserPages/QGovernance/QMainTabs/QDashboard/styles"
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {roundBalance} from "func/useful";


const {useDrizzle, useDrizzleState} = drizzleReactHooks;

function QDashboard() {
    const {drizzle} = useDrizzle();
    const state = useDrizzleState(state => state);

    const [currentBlockHeight, setCurrentBlockHeight] = useState(null);

    console.log('State', state);

    useEffect(() => {
        if (drizzle) {
            // drizzle.web3.eth.getBalance(userAddress, (err, balance) => {
            //     const userBalance = drizzle.web3.utils.fromWei(balance, "ether");
            //     setCurrentBlockHeight(roundBalance(userBalance));
            // });
        }
    }, [state]);

    return (
        <Row>
            <Col xs={6}>
                <div>
                    <p>Q current Block Height: {state?.currentBlock?.number}</p>
                    <UserData/>
                </div>
            </Col>
            <Col xs={6}>
                <RootNodePanel/>
            </Col>
        </Row>

    );
}

export default QDashboard;

