import Storage from './contracts/SimpleStorage'
import {contractRegistryConfig, rootConfig} from "api/contracts/contants"

const options = {
  contracts: [contractRegistryConfig, rootConfig],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://54.187.245.252:8545",
    },
  },
};

export default options;
