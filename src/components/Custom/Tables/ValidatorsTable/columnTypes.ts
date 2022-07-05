import { useTranslation } from 'react-i18next';

import { toNumber } from 'func/useful';

export const getColumnsValidatorsWidened = (t: typeof useTranslation) => [
  {
    headerStyle: () => ({ minWidth: '95px' }),
    dataField: 'rank',
    text: t('RANK'),
    sort: true,
  },
  {
    headerStyle: () => ({ minWidth: '173px' }),
    dataField: 'validator',
    text: 'Address',
    filterValue: (cell: any) => cell.props.children[0].props.address,
  },
  {
    headerStyle: () => ({ minWidth: '220px' }),
    dataField: 'amount',
    text: t('TOTAL_ACCOUNTABLE_STAKE'),
    sort: true,
    sortFunc: (a:string, b:string, order:string) => (order === 'desc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b)),
  },
  {
    headerStyle: () => ({ minWidth: '120px' }),
    dataField: 'selfStake',
    text: t('SELF_STAKE'),
    sort: true,
    sortFunc: (a:string, b:string, order:string) => (order === 'desc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b)),
  },
  {
    headerStyle: () => ({ minWidth: '170px' }),
    dataField: 'delegatedStake',
    text: t('DELEGATED_STAKE'),
    sort: true,
    sortFunc: (a:string, b:string, order:string) => (order === 'desc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b)),
  },
  {
    headerStyle: () => ({ minWidth: '220px' }),
    dataField: 'delegationSaturation',
    text: t('DELEGATION_SATURATION'),
    sort: true,
    sortFunc: (a:any, b:any, order:string) =>
      order === 'desc'
        ? toNumber(b.props.value) - toNumber(a.props.value)
        : toNumber(a.props.value) - toNumber(b.props.value),
  },
];

export const getColumnsValidatorsMonitoring = (t: typeof useTranslation) => [
  {
    headerStyle: () => ({ minWidth: '95px' }),
    dataField: 'rank',
    text: t('RANK'),
    sort: true,
  },
  {
    headerStyle: () => ({ minWidth: '173px' }),
    dataField: 'validator',
    text: t('VALIDATOR_ADDRESS'),
    filterValue: (cell: any) => cell.props.children[0].props.address,
  },
  {
    headerStyle: () => ({ minWidth: '220px' }),
    dataField: 'amount',
    text: t('TOTAL_ACCOUNTABLE_STAKE'),
    sort: true,
    sortFunc: (a:string, b:string, order:string) => (order === 'desc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b)),
  },
  {
    headerStyle: () => ({ minWidth: '190px' }),
    dataField: 'lastBlock',
    text: t('LAST_BLOCK_VALIDATED'),
    sort: true,
    sortFunc: (a:string, b:string, order:string) => (order === 'desc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b)),
  },

  {
    headerStyle: () => ({ minWidth: '220px' }),
    dataField: 'timestamp',
    text: t('TIMESTAMP_OF_LAST_BLOCK_VALIDATED'),
  },

  {
    headerStyle: () => ({ minWidth: '180px' }),
    dataField: 'average',
    text: t('AVERAGE_AVAILABILITY_LAST_1000_BLOCKS_CYCLES'),
    sort: true,
    sortFunc: (a:string, b:string, order:string) => (order === 'desc' ? toNumber(b) - toNumber(a) : toNumber(a) - toNumber(b)),
  },
];
