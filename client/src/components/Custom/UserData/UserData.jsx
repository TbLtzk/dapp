import React, {useEffect, useState} from "react";

import Web3 from 'web3';
import getWeb3 from "getWeb3";

import {drizzleReactHooks} from "@drizzle/react-plugin";
import {newContextComponents} from "@drizzle/react-components";
import Store from "contracts/Storage";
import ContractRegistry from "abi/ContractRegistry.abi";
import ContractTest from "./ContractTest";

let registryABI = [{
    "inputs": [{
        "internalType": "address[]",
        "name": "_maintainersList",
        "type": "address[]"
    }, {"internalType": "string[]", "name": "_keys", "type": "string[]"}, {
        "internalType": "address[]",
        "name": "_addresses",
        "type": "address[]"
    }], "stateMutability": "nonpayable", "type": "constructor"
}, {
    "inputs": [{"internalType": "string", "name": "_key", "type": "string"}],
    "name": "contains",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "string", "name": "_key", "type": "string"}],
    "name": "getAddress",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getContracts",
    "outputs": [{
        "components": [{"internalType": "string", "name": "key", "type": "string"}, {
            "internalType": "address",
            "name": "addr",
            "type": "address"
        }], "internalType": "struct ContractRegistry.Pair[]", "name": "", "type": "tuple[]"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "keys",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "leaveMaintainers",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "string", "name": "_key", "type": "string"}],
    "name": "mustGetAddress",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "string", "name": "_key", "type": "string"}, {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
    }], "name": "setAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "string[]", "name": "_keys", "type": "string[]"}, {
        "internalType": "address[]",
        "name": "_addresses",
        "type": "address[]"
    }], "name": "setAddresses", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_maintainer", "type": "address"}],
    "name": "setMaintainer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}];

let addressOfRegistry = '0xc5bd57892163e9f76f657a53fe7cd971a1be9916';


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
        if (drizzle) {
            // console.log(addContract())
        }

        if (balance) {
            const convertBalance = drizzle.web3.utils.fromWei(balance, 'ether');
            setConvertedBalance(convertBalance);
        }
    }, [balance]);

     useEffect(async () => {
        if (drizzle.contracts) {
            console.log('drizzle.contracts', drizzle.contractList[0].methods)


            async function contractRegistry() {
              await (drizzle.contracts.ContractRegistry.methods.getAddress("governance.rootNodes").call(async function (err, address) {
                  console.log('get address from registry err: ' + err);
                  console.log(address);
              }));

            }
            await contractRegistry();

            async function rootGetMembers() {
                await (drizzle.contracts.Root.methods.getMembers().call(async function (err, address) {
                    console.log('get members err: ' + err);
                    console.log('root members', address);
                }));

            }
            await rootGetMembers();

            async function checkUserOnRoot() {
                await (drizzle.contracts.Root.methods.checkMember('0x00Ec0A77f6813dB9c01C65d2E2a086EE60e69ed7').call(async function (err, address) {
                    console.log(' checkUserOnRoot err: ' + err);
                    console.log('checkUserOnRoot', address);
                }));

            }
            await checkUserOnRoot();
            // const contractConfig = {
            //     contractName: addressOfRegistry,
            //     web3Contract: new web3.eth.Contract(registryABI)
            // };
            // const events = ['Mint'];

            // drizzle.addContract(contractConfig, events);
            // 0xc5bd57892163e9f76f657a53fe7cd971a1be9916
        }

    },[]);

    console.log(drizzle);
    console.log(drizzle.contracts);

    async function addContract() {
        try {
            const web3 = await getWeb3();
            const registryContract = new web3.eth.Contract(registryABI, addressOfRegistry);
            console.log('registryContract', registryContract);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    }

    // const f = addContract();
    // console.log(f);

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

