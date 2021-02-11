/* eslint-disable */
export default [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_poolAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_claimerAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_exhibitedClaimAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_actuallyClaimedAmount",
        "type": "uint256"
      }
    ],
    "name": "ClaimAbandoned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_claimerAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_rewardAmount",
        "type": "uint256"
      }
    ],
    "name": "RewardTransferedToPiggyBank",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_registry",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_validator",
        "type": "address"
      }
    ],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_validator",
        "type": "address"
      }
    ],
    "name": "increase",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_validator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_rewardAmount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_abandonClaims",
        "type": "bool"
      }
    ],
    "name": "requestRewardTransfer",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
;
