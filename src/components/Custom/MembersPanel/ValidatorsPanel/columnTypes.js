import { toNumber } from 'func/useful';

export const getColumnsValidatorsWidened = (t) => [
  {
    headerStyle: () => ({ minWidth: '70px', width: '70px' }),
    dataField: 'rank',
    text: t('RANK'),
    sort: true,
  },
  {
    headerStyle: () => ({ minWidth: '170px' }),
    dataField: 'validator',
    text: t('VALIDATOR_ADDRESS'),
  },
  {
    headerStyle: () => ({ minWidth: '190px' }),
    dataField: 'amount',
    text: t('TOTAL_ACCOUNTABLE_STAKE'),
    sort: true,
    sortFunc: (a, b, order) => (order === 'desc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b)),
  },
  {
    headerStyle: () => ({ minWidth: '120px' }),
    dataField: 'selfStake',
    text: t('SELF_STAKE'),
    sort: true,
    sortFunc: (a, b, order) => (order === 'desc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b)),
  },
  {
    headerStyle: () => ({ minWidth: '140px' }),
    dataField: 'delegatedStake',
    text: t('DELEGATED_STAKE'),
    sort: true,
    sortFunc: (a, b, order) => (order === 'desc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b)),
  },
  {
    headerStyle: () => ({ minWidth: '130px' }),
    dataField: 'validatorShare',
    text: t('VALIDATOR_SHARE'),
    sort: true,
    sortFunc: (a, b, order) => (order === 'desc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b)),
  },
  {
    headerStyle: () => ({ minWidth: '140px' }),
    dataField: 'delegatorShare',
    text: t('DELEGATOR_SHARE'),
    sort: true,
    sortFunc: (a, b, order) => (order === 'desc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b)),
  },
  {
    headerStyle: () => ({ minWidth: '170px' }),
    dataField: 'delegationEfficiency',
    text: t('DELEGATION_EFFICIENCY'),
    sort: true,
    sortFunc: (a, b, order) => (order === 'desc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b)),
  },
  {
    headerStyle: () => ({ minWidth: '170px' }),
    dataField: 'delegationSaturation',
    text: t('DELEGATION_SATURATION'),
    sort: true,
    sortFunc: (a, b, order) =>
      order === 'desc'
        ? toNumber(b.props.value) - toNumber(a.props.value)
        : toNumber(a.props.value) - toNumber(b.props.value),
  },
];

export const getColumnsValidatorsMonitoring = (t) => [
  {
    headerStyle: () => ({ minWidth: '70px', width: '70px' }),
    dataField: 'rank',
    text: t('RANK'),
    sort: true,
  },
  {
    headerStyle: () => ({ minWidth: '200px' }),
    dataField: 'validator',
    text: t('VALIDATOR_ADDRESS'),
  },
  {
    headerStyle: () => ({ minWidth: '200px' }),
    dataField: 'amount',
    text: t('TOTAL_ACCOUNTABLE_STAKE'),
    sort: true,
    sortFunc: (a, b, order) => (order === 'desc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b)),
  },
  {
    headerStyle: () => ({ minWidth: '180px' }),
    dataField: 'lastBlock',
    text: t('LAST_BLOCK_VALIDATED'),
    sort: true,
    sortFunc: (a, b, order) => (order === 'desc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b)),
  },

  {
    headerStyle: () => ({ minWidth: '200px' }),
    dataField: 'timestamp',
    text: t('TIMESTAMP_OF_LAST_BLOCK_VALIDATED'),
  },

  {
    headerStyle: () => ({ minWidth: '150px' }),
    dataField: 'average',
    text: t('AVERAGE_AVAILABILITY_LAST_1000_BLOCKS_CYCLES'),
    sort: true,
    sortFunc: (a, b, order) => (order === 'desc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b)),
  },
];
