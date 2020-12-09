import Web3 from "web3";
import {Drizzle} from "@drizzle/store";

import {contractsToAbi} from '../mapping/contract-to-abi'
import {contractsToAddresses} from "../mapping/contract-to-address";

const web3 = new Web3(Web3.givenProvider);

const optionsDrizzleBase = {
    web3: {
        fallback: {
            type: "ws",
            url: "ws://54.187.245.252:8545",
        },
    },
}

const optionsDrizzleRegistry = {
    contracts: [
        {
            contractName: 'ContractRegistry',
            web3Contract: new web3.eth.Contract(contractsToAbi['ContractRegistry'], contractsToAddresses['ContractRegistry'])
        }
    ],
    ...optionsDrizzleBase
};

const optionsDrizzle = () => {
    let contracts = [];
    for (let contractName in contractsToAddresses) {
        if (contractName in contractsToAddresses && contractName in contractsToAbi) {
            contracts.push({
                contractName: contractName,
                web3Contract: new web3.eth.Contract(contractsToAbi[contractName], contractsToAddresses[contractName])
            })
        } else {
            console.warn(`${contractName} missing in mapping when creating drizzle config!`);
        }
    }
    return {contracts: contracts,  ...optionsDrizzleBase}
};

export const drizzleRegistry = new Drizzle(optionsDrizzleRegistry);
export const drizzle = new Drizzle(optionsDrizzle());