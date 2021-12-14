import { toNumber } from 'func/useful'

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
    headerStyle: () => ({ minWidth: '350px' }),
    dataField: 'address',
    text: 'Root Node Address',
    sort: true
  },
  {
    headerStyle: () => ({ minWidth: '110px' }),
    dataField: 'amount',
    text: 'Staked Amount',
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b))
  },
  {
    headerStyle: () => ({ minWidth: '70px' }),
    dataField: 'share',
    text: 'Share',
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b))
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
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b))
  },
  {
    headerStyle: () => ({ minWidth: '150px' }),
    dataField: 'selfStake',
    text: 'Self Stake',
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b))
  },
  {
    headerStyle: () => ({ minWidth: '150px' }),
    dataField: 'delegatedStake',
    text: 'Total Delegated Stake',
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b))
  },
  {
    headerStyle: () => ({ minWidth: '100px' }),
    dataField: 'validatorShare',
    text: 'Validator Share',
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b))
  },
  {
    headerStyle: () => ({ minWidth: '100px' }),
    dataField: 'delegatorShare',
    text: 'Delegator Share',
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b))
  },
  {
    headerStyle: () => ({ minWidth: '100px' }),
    dataField: 'delegationEfficiency',
    text: 'Delegation Efficiency',
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b))
  },
  {
    headerStyle: () => ({ minWidth: '165px' }),
    dataField: 'delegationSaturation',
    text: 'Delegation Saturation',
    sort: true,
    sortFunc: (a, b, order) =>
      order === 'asc'
        ? toNumber(b.props.value) - toNumber(a.props.value)
        : toNumber(a.props.value) - toNumber(b.props.value)
  }
]
