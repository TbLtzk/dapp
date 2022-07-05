type TABLE_TYPES = {
  qFees: 'qfees',
  qDefi: 'defi',
  timeLocks: 'timeLocks',

  rootNodesShort: 'rootNodesShort',
  rootNodesWidened: 'rootNodesWidened',
  rootNodesMonitoring: 'rootNodesMonitoring',

  validatorsShort: 'validators-short',
  validatorsWidened: 'validators-widened',
  validatorsMonitoring: 'validators-monitoring',

  delegations: 'delegations',

  savingCryptoAssets: 'saving-crypto-assets',
  borrowCryptoAssets: 'borrow-crypto-assets'
};
type valueof<T> = T[keyof T]

export type TableType = valueof<TABLE_TYPES>
