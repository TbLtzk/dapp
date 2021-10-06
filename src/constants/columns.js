export const columnsDeFiRisk = [
  {
    dataField: 'member',
    text: 'Member address'
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
    text: 'Start date'
  },
  {
    dataField: 'releaseEnd',
    text: 'End date'
  }
]

export const columnsQFees = [
  {
    dataField: 'member',
    text: 'Member address'
  }
]

export const columnsDelegations = [
  {
    dataField: 'address',
    text: 'Member address'
  },
  {
    dataField: 'amount',
    text: 'Current stake'
  },
  {
    dataField: 'reward',
    text: 'Claimable reward'
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
    text: 'Start date'
  },
  {
    dataField: 'releaseEnd',
    text: 'End date'
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
    text: 'Root node address',
    sort: true
  },
  {
    dataField: 'amount',
    text: 'Staked amount',
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
    text: 'Validator address',
    sort: true
  },
  {
    headerStyle: () => ({ minWidth: '150px' }),
    dataField: 'amount',
    text: 'Total accountable stake',
    sort: true
  },
  {
    headerStyle: () => ({ minWidth: '150px' }),
    dataField: 'selfStake',
    text: 'Self stake',
    sort: true
  },
  {
    headerStyle: () => ({ minWidth: '150px' }),
    dataField: 'delegatedStake',
    text: 'Total delegated stake',
    sort: true
  },
  {
    headerStyle: () => ({ minWidth: '100px' }),
    dataField: 'validatorShare',
    text: 'Validator share',
    sort: true
  },
  {
    headerStyle: () => ({ minWidth: '100px' }),
    dataField: 'delegatorShare',
    text: 'Delegator share',
    sort: true
  },
  {
    headerStyle: () => ({ minWidth: '100px' }),
    dataField: 'delegationEfficiency',
    text: 'Delegation efficiency',
    sort: true
  },
  {
    headerStyle: () => ({ minWidth: '150px' }),
    dataField: 'delegationSaturation',
    text: 'Delegation saturation',
    sort: true
  }
]
