import Storage from './contracts/SimpleStorage'
const options = {
  contracts: [Storage],
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
