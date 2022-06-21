import { toNumber } from 'func/useful';

export const getColumnsRootNode = (t) => [
  {
    headerStyle: () => ({ minWidth: '170px' }),
    dataField: 'address',
    text: t('ROOT_NODE_ADDRESS'),
  },
  {
    headerStyle: () => ({ minWidth: '90px' }),
    dataField: 'amount',
    text: t('STAKED_AMOUNT'),
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b)),
  },
  {
    headerStyle: () => ({ minWidth: '90px' }),
    dataField: 'share',
    text: t('SHARE'),
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b)),
  },
];

export const getColumnsRootNodeMonitoring = (t) => [
  {
    headerStyle: () => ({ minWidth: '180px' }),
    dataField: 'address',
    text: t('ROOT_NODE_ADDRESS'),
  },
  {
    headerStyle: () => ({ minWidth: '140px' }),
    dataField: 'amount',
    text: t('STAKED_AMOUNT'),
    sort: true,
    sortFunc: (a, b, order) => (order === 'asc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b)),
  },
  {
    headerStyle: () => ({ minWidth: '140px' }),
    dataField: 'offChain',
    text: t('LAST_OFF-CHAIN_ACTIVITY'),
  },
  {
    headerStyle: () => ({ minWidth: '140px' }),
    dataField: 'onChain',
    text: t('LAST_ON-CHAIN_ACTIVITY'),
  },
];
