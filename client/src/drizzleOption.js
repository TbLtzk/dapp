import Storage from './contracts/SimpleStorage'
import ContractRegistry from './contracts/ContractRegistry'
const options = {
  contracts: [],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://54.187.245.252:8545",
    },
  },
};
// const options = {
//   contracts: [Storage],
//   web3: {
//     fallback: {
//       type: "ws",
//       url: "ws://54.187.245.252:8545",
//     },
//   },
// };
export default options;
