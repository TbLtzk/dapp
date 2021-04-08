import { ContractRegistryInstance } from '@q-dev/q-js-sdk';
import Web3 from 'web3';


const web3 = new Web3(Web3.givenProvider);
web3.eth.handleRevert = true;


export const CONTRACT_REGISTRY_ADDRESS = '0xc3E589056Ece16BCB88c6f9318e9a7343b663522'

export const contractRegistryInstance = new ContractRegistryInstance(web3, CONTRACT_REGISTRY_ADDRESS)
