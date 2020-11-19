import React, {Component, useEffect, useState} from "react";

import Web3 from 'web3';
import getWeb3 from "../../../getWeb3";

import {drizzleReactHooks} from "@drizzle/react-plugin";
import {newContextComponents} from "@drizzle/react-components";
import Store from "contracts/Storage";
import ContractRegistry from "abi/ContractRegistry.abi";
let registryABI = [{"inputs":[{"internalType":"address[]","name":"_maintainersList","type":"address[]"},{"internalType":"string[]","name":"_keys","type":"string[]"},{"internalType":"address[]","name":"_addresses","type":"address[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"_key","type":"string"}],"name":"contains","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_key","type":"string"}],"name":"getAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContracts","outputs":[{"components":[{"internalType":"string","name":"key","type":"string"},{"internalType":"address","name":"addr","type":"address"}],"internalType":"struct ContractRegistry.Pair[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"keys","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"leaveMaintainers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_key","type":"string"}],"name":"mustGetAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_key","type":"string"},{"internalType":"address","name":"_addr","type":"address"}],"name":"setAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"_keys","type":"string[]"},{"internalType":"address[]","name":"_addresses","type":"address[]"}],"name":"setAddresses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_maintainer","type":"address"}],"name":"setMaintainer","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let addressOfRegistry = '0xc5bd57892163e9f76f657a53fe7cd971a1be9916';

let rootABI = [{"inputs":[{"internalType":"address","name":"_registry","type":"address"},{"internalType":"address[]","name":"rootsAddressesArray","type":"address[]"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_root","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"CommittedStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_root","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"WithdrawalAnnounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_root","type":"address"},{"indexed":false,"internalType":"address","name":"_paidTo","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[{"internalType":"address","name":"_rootAddress","type":"address"}],"name":"addRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_root","type":"address"},{"internalType":"uint256","name":"_slashingProposalId","type":"uint256"}],"name":"addSlashingProposal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"announceWithdrawal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_root","type":"address"},{"internalType":"uint256","name":"_amountToSlash","type":"uint256"}],"name":"applySlashing","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"rootAddress","type":"address"},{"internalType":"address","name":"newRootAddress","type":"address"}],"name":"changeRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"toCheck","type":"address"}],"name":"checkMember","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"commitStake","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"rootAddress","type":"address"}],"name":"deleteRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMembers","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"root","type":"address"}],"name":"getRootNodeStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_root","type":"address"}],"name":"getSlashingProposalIds","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getStakes","outputs":[{"components":[{"internalType":"address","name":"root","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"internalType":"struct Roots.Stake[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"pendingSlashingProposals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_root","type":"address"}],"name":"purgePendingSlashings","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address payable","name":"payTo","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"withdrawals","outputs":[{"internalType":"bool","name":"pending","type":"bool"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"}];
let addressRoot = '0x1eA6420BCe02021D01de7D66A4C2e0C706912C47';


class ContractTest extends Component {
    componentDidMount = async () => {
        console.log('ContractTest');
        try {
            console.log('ContractTest2');
            // Get network provider and web3 instance.
            const web3 = await getWeb3();
            console.log('ContractTest2', web3);
            const registryContract = new web3.eth.Contract(registryABI, addressOfRegistry);
            console.log('registryContract', registryContract);
            console.log('registryContract.methods', registryContract.methods);

            async function info() {
                await (registryContract.methods.getAddress("governance.rootNodes").call(async function (err, address) {
                    // console.log('get address from registry err: ' + err);
                    console.log('address: ' + address);
                }));
            }
            await info();
            const rootContract = new web3.eth.Contract(rootABI, addressRoot);
            console.log('rootContract', rootContract);
            console.log('rootContract.methods', rootContract.methods);

            async function rootNode() {
                await (rootContract.methods.getMembers().call(async function (err, address) {
                    // console.log('get address from registry err: ' + err);
                    console.log('rootNode: ' + address);
                }));
                await (rootContract.methods.checkMember('0x00Ec0A77f6813dB9c01C65d2E2a086EE60e69ed7').call(async function (err, address) {
                    // console.log('get address from registry err: ' + err);
                    console.log('checkMember: ' + address);
                }));

            }
            await rootNode()
            // Use web3 to get the user's accounts.
            // const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            // const networkId = await web3.eth.net.getId();
            // const deployedNetwork = SimpleStorageContract.networks[networkId];
            // const instance = new web3.eth.Contract(
            //     SimpleStorageContract.abi,
            //     deployedNetwork && deployedNetwork.address,
            // );

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            // this.setState({ web3, accounts, contract: instance }, this.runExample);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    render(){
        return (
            <div className="ContractTest">
                <p>ContractTest</p>
            </div>
        );
    }

}

export default ContractTest;
