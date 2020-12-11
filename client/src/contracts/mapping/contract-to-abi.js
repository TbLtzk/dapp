export const contractsToAbi = {
  ContractRegistry: [{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' }, {
    inputs: [{ internalType: 'string', name: '_key', type: 'string' }], name: 'contains', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function',
  }, {
    inputs: [{ internalType: 'string', name: '_key', type: 'string' }], name: 'getAddress', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function',
  }, {
    inputs: [],
    name: 'getContracts',
    outputs: [{
      components: [{ internalType: 'string', name: 'key', type: 'string' }, { internalType: 'address', name: 'addr', type: 'address' }], internalType: 'struct ContractRegistry.Pair[]', name: '', type: 'tuple[]',
    }],
    stateMutability: 'view',
    type: 'function',
  }, {
    inputs: [{ internalType: 'address[]', name: '_maintainersList', type: 'address[]' }, { internalType: 'string[]', name: '_keys', type: 'string[]' }, { internalType: 'address[]', name: '_addresses', type: 'address[]' }], name: 'initialize', outputs: [], stateMutability: 'nonpayable', type: 'function',
  }, {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], name: 'keys', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function',
  }, {
    inputs: [], name: 'leaveMaintainers', outputs: [], stateMutability: 'nonpayable', type: 'function',
  }, {
    inputs: [{ internalType: 'string', name: '_key', type: 'string' }], name: 'mustGetAddress', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function',
  }, {
    inputs: [{ internalType: 'string', name: '_key', type: 'string' }, { internalType: 'address', name: '_addr', type: 'address' }], name: 'setAddress', outputs: [], stateMutability: 'nonpayable', type: 'function',
  }, {
    inputs: [{ internalType: 'string[]', name: '_keys', type: 'string[]' }, { internalType: 'address[]', name: '_addresses', type: 'address[]' }], name: 'setAddresses', outputs: [], stateMutability: 'nonpayable', type: 'function',
  }, {
    inputs: [{ internalType: 'address', name: '_maintainer', type: 'address' }], name: 'setMaintainer', outputs: [], stateMutability: 'nonpayable', type: 'function',
  }, {
    inputs: [{ internalType: 'address', name: '_proxy', type: 'address' }, { internalType: 'address', name: '_newImplementation', type: 'address' }], name: 'upgradeContract', outputs: [], stateMutability: 'nonpayable', type: 'function',
  }],
  QPiggyBank: [{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' }, {
    anonymous: false,
    inputs: [{
      indexed: false, internalType: 'address', name: '_holder', type: 'address',
    }, {
      indexed: false, internalType: 'uint256', name: '_amount', type: 'uint256',
    }, {
      indexed: false, internalType: 'uint256', name: '_expiration', type: 'uint256',
    }],
    name: 'AssetsLocked',
    type: 'event',
  }, {
    anonymous: false,
    inputs: [{
      indexed: false, internalType: 'address', name: '_holder', type: 'address',
    }, {
      indexed: false, internalType: 'uint256', name: '_amount', type: 'uint256',
    }],
    name: 'AssetsUnlocked',
    type: 'event',
  }, {
    anonymous: false,
    inputs: [{
      indexed: false, internalType: 'address', name: '_holder', type: 'address',
    }, {
      indexed: false, internalType: 'uint256', name: '_expectedRewardAmount', type: 'uint256',
    }, {
      indexed: false, internalType: 'uint256', name: '_actualRewardAmount', type: 'uint256',
    }],
    name: 'RewardClaimed',
    type: 'event',
  }, {
    anonymous: false,
    inputs: [{
      indexed: false, internalType: 'uint256', name: '_newDepositAmount', type: 'uint256',
    }, {
      indexed: false, internalType: 'uint256', name: '_newBalance', type: 'uint256',
    }, {
      indexed: false, internalType: 'uint256', name: '_latestClaim', type: 'uint256',
    }],
    name: 'UserDeposited',
    type: 'event',
  }, {
    anonymous: false,
    inputs: [{
      indexed: false, internalType: 'uint256', name: '_withdrawnAmount', type: 'uint256',
    }, {
      indexed: false, internalType: 'uint256', name: '_newBalance', type: 'uint256',
    }, {
      indexed: false, internalType: 'uint256', name: '_latestClaim', type: 'uint256',
    }],
    name: 'UserWithdrawn',
    type: 'event',
  }, {
    inputs: [{ internalType: 'bool', name: '_abandonClaims', type: 'bool' }], name: 'claimQHolderReward', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'nonpayable', type: 'function',
  }, {
    inputs: [{ internalType: 'bool', name: '_abandonClaims', type: 'bool' }], name: 'claimStakeDelegatorReward', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'nonpayable', type: 'function',
  }, {
    inputs: [{ internalType: 'address[]', name: '_delegatedTo', type: 'address[]' }, { internalType: 'uint256[]', name: '_stakes', type: 'uint256[]' }], name: 'delegateStake', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function',
  }, {
    inputs: [{ internalType: 'bool', name: '_abandonClaims', type: 'bool' }], name: 'deposit', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'payable', type: 'function',
  }, {
    inputs: [{ internalType: 'uint256', name: '_newExpiration', type: 'uint256' }], name: 'extendExpiration', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function',
  }, {
    inputs: [{ internalType: 'address', name: '_who', type: 'address' }], name: 'getLockedAssets', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }, { internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function',
  }, {
    inputs: [{ internalType: 'address', name: '_userAddress', type: 'address' }], name: 'getUserBalance', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function',
  }, {
    inputs: [{ internalType: 'address', name: '_registry', type: 'address' }], name: 'initialize', outputs: [], stateMutability: 'nonpayable', type: 'function',
  }, {
    inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }, { internalType: 'uint256', name: '_expiration', type: 'uint256' }], name: 'lock', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function',
  }, {
    inputs: [{ internalType: 'address', name: '', type: 'address' }], name: 'lockedAssets', outputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }, { internalType: 'uint256', name: 'expiration', type: 'uint256' }], stateMutability: 'view', type: 'function',
  }, {
    inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }], name: 'unlock', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function',
  }, {
    inputs: [{ internalType: 'address', name: '', type: 'address' }], name: 'usersData', outputs: [{ internalType: 'uint256', name: 'balance', type: 'uint256' }, { internalType: 'uint256', name: 'latestClaim', type: 'uint256' }], stateMutability: 'view', type: 'function',
  }, {
    inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }, { internalType: 'bool', name: '_abandonClaims', type: 'bool' }], name: 'withdraw', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function',
  }, { stateMutability: 'payable', type: 'receive' }],
};
