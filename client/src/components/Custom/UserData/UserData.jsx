import React, {useEffect, useState} from "react";

import {drizzleReactHooks} from "@drizzle/react-plugin";
import {useSelector} from "react-redux";
import {userAddressMetamask} from "store/selectors/user-inf";

import ContractRegistryService from "api/contracts/ContractRegistryService"
import RootService from "api/contracts/RootService"

import {roundBalance} from "func/useful";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

function UserData() {
    const {drizzle} = useDrizzle();
    const state = useDrizzleState(state => state);
    // const contractRegistry = new ContractRegistryService(drizzle);
    // const rootService = new RootService(drizzle);
    const [userBalance, setUserBalance] = useState(null);
    const userAddress = useSelector(userAddressMetamask);

    const [convertedBalance, setConvertedBalance] = useState(null);

    // const balance = state.accountBalances[state.accounts[0]];
    // useEffect(() => {
    //     if (balance) {
    //         const convertBalance = drizzle.web3.utils.fromWei(balance, 'ether');
    //         setConvertedBalance(convertBalance);
    //     }
    // }, [balance]);

    useEffect(() => {
        if (drizzle) {
            drizzle.web3.eth.getBalance(userAddress, (err, balance) => {
                const userBalance = drizzle.web3.utils.fromWei(balance, "ether");
                setUserBalance(roundBalance(userBalance));
            });
        }
    }, [state]);

    useEffect(async () => {
        // if (drizzle.contracts) {
        //     contractRegistry.getAddress().then((address) => {
        //         console.log('get root contract address', address);
        //     });
        //     rootService.getRootMembers().then((members) => {
        //         console.log('get root members', members);
        //     });
        //     rootService.checkMemberIsRoot(state.accounts[0]).then((isRootMember) => {
        //         console.log('isRootMember', isRootMember);
        //     });
        //     // rootService.checkMemberIsRoot('0x00Ec0A77f6813dB9c01C65d2E2a086EE60e69ed7').then((isRootMember) => {console.log('isRootMember', isRootMember);});
        //     rootService.getMemberCount().then((memberCount) => {
        //         console.log('memberCount', memberCount);
        //     });
        //     rootService.getRootNodeStake('0x6A39B688d591Ea00C9EA69658438794204B5cC62').then((nodeStake) => {
        //         console.log('getRootNodeStake', nodeStake);
        //     });
        //
        // }

    }, [drizzle.contracts]);

    // console.log(drizzle.contracts);

    return (
        <div>
            <p>Account: {userAddress}</p>
            <p>Account balance: {userBalance}Q</p>
            {/*<p>Account balance: {convertedBalance} Q</p>*/}
        </div>
    );
}

export default UserData;

