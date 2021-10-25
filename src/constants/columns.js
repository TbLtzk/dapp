export const columnsDeFiRisk = [
  {
    dataField: 'member',
    text: 'Member Address'
  }
]

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
]

export const columnsQFees = [
  {
    dataField: 'member',
    text: 'Member Address'
  }
]

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
]

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
]

export const columnsRootNode = [
  {
    dataField: 'rank',
    text: 'Rank',
    sort: true
  },
  {
    dataField: 'address',
    text: 'Root Node Address',
    sort: true
  },
  {
    dataField: 'amount',
    text: 'Staked Amount',
    sort: true
  },
  {
    dataField: 'share',
    text: 'Share',
    sort: true
  }
]

export const columnsValidatorsWidened = [
  {
    headerStyle: () => ({ minWidth: '20px' }),
    dataField: 'rank',
    text: 'Rank',
    sort: true
  },
  {
    headerStyle: () => ({ minWidth: '350px' }),
    dataField: 'validator',
    text: 'Validator Address',
    sort: true
  },
  {
    headerStyle: () => ({ minWidth: '150px' }),
    dataField: 'amount',
    text: 'Total Accountable Stake',
    sort: true
  },
  {
    headerStyle: () => ({ minWidth: '150px' }),
    dataField: 'selfStake',
    text: 'Self Stake',
    sort: true
  },
  {
    headerStyle: () => ({ minWidth: '150px' }),
    dataField: 'delegatedStake',
    text: 'Total Delegated Stake',
    sort: true
  },
  {
    headerStyle: () => ({ minWidth: '100px' }),
    dataField: 'validatorShare',
    text: 'Validator Share',
    sort: true
  },
  {
    headerStyle: () => ({ minWidth: '100px' }),
    dataField: 'delegatorShare',
    text: 'Delegator Share',
    sort: true
  },
  {
    headerStyle: () => ({ minWidth: '100px' }),
    dataField: 'delegationEfficiency',
    text: 'Delegation Efficiency',
    sort: true
  },
  {
    headerStyle: () => ({ minWidth: '165px' }),
    dataField: 'delegationSaturation',
    text: 'Delegation Saturation',
    sort: true
  }
]
