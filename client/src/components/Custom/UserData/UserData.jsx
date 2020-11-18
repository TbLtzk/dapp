import React, {useEffect, useState} from "react";

import Web3 from 'web3';

import {drizzleReactHooks} from "@drizzle/react-plugin";
import {newContextComponents} from "@drizzle/react-components";
import Store from "contracts/Storage";
import ContractRegistry from "abi/ContractRegistry.abi";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;
const {AccountData} = newContextComponents;

const web3 = new Web3(Web3.givenProvider);
// const contractAddr = '0x97EaC1d4C5eA22dE6ba7292FA5d01a591Aac83A7';
// const SimpleContract = new web3.eth.Contract(Store, contractAddr);

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
    const contractConfig = {
        contractName: "0xc5bd57892163e9f76f657a53fe7cd971a1be9916",
        // web3Contract: new web3.eth.Contract(ContractRegistry)
    };
    const events = ['Mint'];

    // drizzle.addContract(contractConfig, events);

    return (
        <div>
            <p>Account: {state.accounts[0]}</p>
            <p>Account balance: {convertedBalance} Q</p>
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

