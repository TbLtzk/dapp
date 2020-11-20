import React, {useEffect, useState} from "react";

import {drizzleReactHooks} from "@drizzle/react-plugin";
import {newContextComponents} from "@drizzle/react-components";

import ContractRegistryService from "api/contracts/ContractRegistryService"
import RootService from "api/contracts/RootService"

const {useDrizzle, useDrizzleState} = drizzleReactHooks;
const {AccountData} = newContextComponents;

function UserData() {
    const {drizzle} = useDrizzle();
    const state = useDrizzleState(state => state);
    const contractRegistry = new ContractRegistryService(drizzle);
    const rootService = new RootService(drizzle);

    const [convertedBalance, setConvertedBalance] = useState(null);

    const balance = state.accountBalances[state.accounts[0]];
    useEffect(() => {
        if (balance) {
            const convertBalance = drizzle.web3.utils.fromWei(balance, 'ether');
            setConvertedBalance(convertBalance);
        }
    }, [balance]);

    useEffect(async () => {
        if (drizzle.contracts) {
            contractRegistry.getAddress().then((address) => {
                console.log('get root contract address', address);
            });
            rootService.getRootMembers().then((members) => {
                console.log('get root members', members);
            });
            rootService.checkMemberIsRoot(state.accounts[0]).then((isRootMember) => {
                console.log('isRootMember', isRootMember);
            });
            // rootService.checkMemberIsRoot('0x00Ec0A77f6813dB9c01C65d2E2a086EE60e69ed7').then((isRootMember) => {console.log('isRootMember', isRootMember);});
            rootService.getMemberCount().then((memberCount) => {
                console.log('memberCount', memberCount);
            });
            rootService.getRootNodeStake('0x6A39B688d591Ea00C9EA69658438794204B5cC62').then((nodeStake) => {
                console.log('getRootNodeStake', nodeStake);
            });

        }

    }, [drizzle.contracts]);

    console.log(drizzle.contracts);

    return (
        <div>
            <p>Account: {state.accounts[0]}</p>
            <p>Account balance: {convertedBalance} Q</p>
            {/*<ContractTest/>*/}
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

