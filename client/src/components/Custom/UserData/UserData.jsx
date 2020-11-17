import React, {useEffect, useState} from "react";

import {drizzleReactHooks} from "@drizzle/react-plugin";
import {newContextComponents} from "@drizzle/react-components";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;
const {AccountData} = newContextComponents;

function UserData() {
    const {drizzle} = useDrizzle();
    const state = useDrizzleState(state => state);

    const [convertedBalance, setConvertedBalance] = useState(null);

    const balance = state.accountBalances[state.accounts[0]];
    useEffect(() => {
        if (balance){
            const convertBalance = drizzle.web3.utils.fromWei(balance, 'ether');
            setConvertedBalance(convertBalance);
        }
    },[balance]);


    return (
        <div>
            <p>Account: {state.accounts[0]}</p>
            <p>Account balance: {convertedBalance} ETH</p>
            {/*<p>Account balance: {state.accountBalances[state.accounts[0]]}</p>*/}
            {/*<AccountData*/}
            {/*    drizzle={drizzle}*/}
            {/*    drizzleState={state}*/}
            {/*    accounts={state.accounts}*/}
            {/*    accountIndex={0}*/}
            {/*    units={'ether'}*/}
            {/*/>*/}
        </div>
    );
}

export default UserData;

