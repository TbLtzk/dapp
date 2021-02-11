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
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "remark",
            "type": "string"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "votingStartTime",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "votingEndTime",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "requiredQuorum",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "requiredMajority",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "vetoEndTime",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "vetoThreshold",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "proposalExecutionP",
                "type": "uint256"
              }
            ],
            "internalType": "struct IVoting.VotingParams",
            "name": "params",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "weightFor",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "weightAgainst",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "vetosCount",
                "type": "uint256"
              }
            ],
            "internalType": "struct IVoting.VotingCounters",
            "name": "counters",
            "type": "tuple"
          },
          {
            "internalType": "bool",
            "name": "executed",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct IVoting.BaseProposal",
        "name": "_proposal",
        "type": "tuple"
      }
    ],
    "name": "ProposalCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "QuorumReached",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum IVoting.VotingOption",
        "name": "_votingOption",
        "type": "uint8"
      }
    ],
    "name": "RootVoted",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "proposalCount",
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
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "proposals",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "remark",
            "type": "string"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "votingStartTime",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "votingEndTime",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "requiredQuorum",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "requiredMajority",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "vetoEndTime",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "vetoThreshold",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "proposalExecutionP",
                "type": "uint256"
              }
            ],
            "internalType": "struct IVoting.VotingParams",
            "name": "params",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "weightFor",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "weightAgainst",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "vetosCount",
                "type": "uint256"
              }
            ],
            "internalType": "struct IVoting.VotingCounters",
            "name": "counters",
            "type": "tuple"
          },
          {
            "internalType": "bool",
            "name": "executed",
            "type": "bool"
          }
        ],
        "internalType": "struct IVoting.BaseProposal",
        "name": "base",
        "type": "tuple"
      },
      {
        "internalType": "address",
        "name": "proposer",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "candidate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amountToSlash",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "voted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
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
        "internalType": "string",
        "name": "_remark",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_candidate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_percentage",
        "type": "uint256"
      }
    ],
    "name": "createProposal",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "voteFor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "voteAgainst",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getStatus",
    "outputs": [
      {
        "internalType": "enum IVoting.ProposalStatus",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "execute",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getProposal",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "remark",
            "type": "string"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "votingStartTime",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "votingEndTime",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "requiredQuorum",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "requiredMajority",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "vetoEndTime",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "vetoThreshold",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "proposalExecutionP",
                "type": "uint256"
              }
            ],
            "internalType": "struct IVoting.VotingParams",
            "name": "params",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "weightFor",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "weightAgainst",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "vetosCount",
                "type": "uint256"
              }
            ],
            "internalType": "struct IVoting.VotingCounters",
            "name": "counters",
            "type": "tuple"
          },
          {
            "internalType": "bool",
            "name": "executed",
            "type": "bool"
          }
        ],
        "internalType": "struct IVoting.BaseProposal",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getSlashingVictim",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getSlashingProposer",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getProposalStats",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "requiredQuorum",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "currentQuorum",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "requiredMajority",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "currentMajority",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "vetoThreshold",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "currentVetoPercentage",
            "type": "uint256"
          }
        ],
        "internalType": "struct IVoting.VotingStats",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "isProposalPending",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getProposalStartTime",
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
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getVotingWeight",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
;
