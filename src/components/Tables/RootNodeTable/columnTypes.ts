import { TFunction } from 'react-i18next';

import { CSSProperties } from 'styled-components';

import { toNumber } from 'utils/useful';

type GetColumnFn = (t: TFunction) => {
  headerStyle: () => CSSProperties,
  dataField: string
  text: string
  sort?: boolean
  sortFunc?: (a: any, b: any, order: 'asc' | 'desc') => number
  filterValue?: (cell: any) => string,
}[]

export const getColumnsRootNode: GetColumnFn = (t) => [
  {
    headerStyle: () => ({ minWidth: '300px', }),
    dataField: 'address',
    text: t('ROOT_NODE_ADDRESS'),
    filterValue: (cell) => cell.props.address,
  },
  {
    headerStyle: () => ({ minWidth: '180px', cursor: 'pointer' }),
    dataField: 'amount',
    text: t('STAKED_AMOUNT'),
    sort: true,
    sortFunc: (a, b, order) => (order === 'desc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b)),
  },
  {
    headerStyle: () => ({ minWidth: '90px', cursor: 'pointer' }),
    dataField: 'share',
    text: t('SHARE'),
    sort: true,
    sortFunc: (a, b, order) => (order === 'desc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b)),
  },
];

export const getColumnsRootNodeMonitoring: GetColumnFn = (t) => [
  {
    headerStyle: () => ({ minWidth: '180px' }),
    dataField: 'address',
    text: t('ROOT_NODE_ADDRESS'),
    filterValue: (cell) => cell.props.address,
  },
  {
    headerStyle: () => ({ minWidth: '160px', cursor: 'pointer' }),
    dataField: 'amount',
    text: t('STAKED_AMOUNT'),
    sort: true,
    sortFunc: (a, b, order) => (order === 'desc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b)),
  },
  {
    headerStyle: () => ({ minWidth: '190px' }),
    dataField: 'offChain',
    text: t('LAST_OFF-CHAIN_ACTIVITY'),
  },
  {
    headerStyle: () => ({ minWidth: '190px' }),
    dataField: 'onChain',
    text: t('LAST_ON-CHAIN_ACTIVITY'),
  },
];
