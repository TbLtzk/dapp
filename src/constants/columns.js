import { toNumber } from 'func/useful';

export const columnsDeFiRisk = [
  {
    dataField: 'member',
    text: 'Member Address'
  }
];

export const columnsEprs = [
  {
    dataField: 'member',
    text: 'Member Address'
  }
];

export const columnnsLockAmount = [
  {
    dataField: 'id',
    text: '#'
  },
  {
    dataField: 'amount',
    text: 'Amount'
  },
  {
    dataField: 'releaseStart',
    text: 'Start Date'
  },
  {
    dataField: 'releaseEnd',
    text: 'End Date'
  }
];

export const columnsQFees = [
  {
    dataField: 'member',
    text: 'Member Address'
  }
];

export const columnsDelegations = [
  {
    dataField: 'address',
    text: 'Member Address'
  },
  {
    dataField: 'amount',
    text: 'Current Stake'
  },
  {
    dataField: 'reward',
    text: 'Claimable Reward'
  }
];

export const timeLocksColumnns = [
  {
    dataField: 'id',
    text: '#'
  },
  {
    dataField: 'amount',
    text: 'Amount'
  },
  {
    dataField: 'releaseStart',
    text: 'Start Date'
  },
  {
    dataField: 'releaseEnd',
    text: 'End Date'
  }
];

export const savingCryptoAssetsColumnns = [
  {
    dataField: 'depositAsset',
    text: 'Deposit asset'
  },
  {
    dataField: 'interestAsset',
    text: 'Interest asset'
  },
  {
    dataField: 'rate',
    text: 'Interest rate (p.a.)'
  },
  {
    dataField: 'button',
    text: ''
  }
];

export const borrowCryptoAssetsColumnns = [
  {
    dataField: 'id',
    text: 'Vault ID'
  },
  {
    dataField: 'depositAsset',
    text: 'Collateral Asset'
  },
  {
    dataField: 'asset',
    text: 'Borrowing Asset'
  },
  {
    dataField: 'interestAsset',
    text: 'Borrowing Fee (p.a.)'
  },
  {
    dataField: 'button',
    text: ''
  }
];

export const columnsRootNode = [
  {
    headerStyle: () => ({ minWidth: '170px' }),
    dataField: 'address',
    text: 'Root Node Address'
  },
  {
    headerStyle: () => ({ minWidth: '90px' }),
    dataField: 'amount',
    text: 'Staked Amount',
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b))
  },
  {
    headerStyle: () => ({ minWidth: '90px' }),
    dataField: 'share',
    text: 'Share',
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b))
  }
];

export const columnsRootNodeMonitoring = [
  {
    headerStyle: () => ({ minWidth: '180px' }),
    dataField: 'address',
    text: 'Root Node Address'
  },
  {
    headerStyle: () => ({ minWidth: '140px' }),
    dataField: 'amount',
    text: 'Staked Amount',
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b))
  },
  {
    headerStyle: () => ({ minWidth: '140px' }),
    dataField: 'offChain',
    text: 'Last off-chain activity'
  },
  {
    headerStyle: () => ({ minWidth: '140px' }),
    dataField: 'onChain',
    text: 'Last on-chain activity'
  }
];

export const columnsValidatorsWidened = [
  {
    headerStyle: () => ({ minWidth: '50px', width: '50px' }),
    dataField: 'rank',
    text: 'Rank',
    sort: true
  },
  {
    headerStyle: () => ({ minWidth: '170px' }),
    dataField: 'validator',
    text: 'Validator Address',
    sort: true
  },
  {
    headerStyle: () => ({ minWidth: '180px' }),
    dataField: 'amount',
    text: 'Total Accountable Stake',
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b))
  },
  {
    headerStyle: () => ({ minWidth: '120px' }),
    dataField: 'selfStake',
    text: 'Self Stake',
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b))
  },
  {
    headerStyle: () => ({ minWidth: '140px' }),
    dataField: 'delegatedStake',
    text: 'Delegated Stake',
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b))
  },
  {
    headerStyle: () => ({ minWidth: '120px' }),
    dataField: 'validatorShare',
    text: 'Validator Share',
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b))
  },
  {
    headerStyle: () => ({ minWidth: '120px' }),
    dataField: 'delegatorShare',
    text: 'Delegator Share',
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b))
  },
  {
    headerStyle: () => ({ minWidth: '150px' }),
    dataField: 'delegationEfficiency',
    text: 'Delegation Efficiency',
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b))
  },
  {
    headerStyle: () => ({ minWidth: '155px' }),
    dataField: 'delegationSaturation',
    text: 'Delegation Saturation',
    sort: true,
    sortFunc: (a, b, order) =>
      order === 'asc'
        ? toNumber(b.props.value) - toNumber(a.props.value)
        : toNumber(a.props.value) - toNumber(b.props.value)
  }
];

export const columnsValidatorsMonitoring = [
  {
    headerStyle: () => ({ minWidth: '50px', width: '50px' }),
    dataField: 'rank',
    text: 'Rank',
    sort: true
  },
  {
    headerStyle: () => ({ minWidth: '200px' }),
    dataField: 'validator',
    text: 'Validator Address',
    sort: true
  },
  {
    headerStyle: () => ({ minWidth: '200px' }),
    dataField: 'amount',
    text: 'Total Accountable Stake',
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b))
  },
  {
    headerStyle: () => ({ minWidth: '180px' }),
    dataField: 'lastBlock',
    text: 'Last Block validated',
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b))
  },

  {
    headerStyle: () => ({ minWidth: '200px' }),
    dataField: 'timestamp',
    text: 'Timestamp of last block validated',
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b))
  },

  {
    headerStyle: () => ({ minWidth: '150px' }),
    dataField: 'average',
    text: 'Average Availability last 1000 blocks cycles',
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b))
  }
];
