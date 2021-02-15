const contractsToAddressesBase = {
  ContractRegistry: '0xc3E589056Ece16BCB88c6f9318e9a7343b663522',
};

const contractsToAddressesDynamic = {
  // BorrowingCoreQUSD: '0x45025b6e7207cc280fa8343995aEa10760de488C',  //testnet
  BorrowingCoreQUSD: '0x3C7343037645530a65f4FeC5a6A596f9C91eAf3e',   //devnet
  // ConstitutionParameters: '0x6c6649D34EB3101f75B543D38b3a2E825D1DDE71', //testnet
  ConstitutionParameters: '0xB62F62634a918e1B8d53915d0C7ADD6CcBA95945', //devnet
  // ConstitutionVoting: '0x5F5C8942056BcfCDdC711397b7cC60f745219d28', //testnet
  ConstitutionVoting: '0x6609E0E17F4be0e5aE0AcA68169d239b5414374e',  //devnet
  DefaultAllocationProxy: '0xc4D32b94f039991703b869AA8AcB1A354c32AFd1',
  // EPDR_Membership: '0x370831a05A19c3ea7cCB0414a62D7b286E39f8b2', //testnet
  EPDR_Membership: '0xB4b60A3f6Bb712D474B8a5677121B4dCc021C7E4',    //devnet
  // EPDR_MembershipVoting: '0x7070E3EBBB5f65EBDEB61D3bC19E281965808A04', //testnet
  EPDR_MembershipVoting: '0x1fBa268ab8CcDA2cdF80cBf77CF1E1C9ec700aF0',    //devnet
  // EPDR_Parameters: '0x9935591e4670A9dE2a10e69c3C2E922c226996F8',  //testnet
  EPDR_Parameters: '0x721EF5a59ee5c1DF89Ab6AAaEF698d14930d05e4',     //devnet
  // EPDR_ParametersVoting: '0xbAB16874949FCFb15e83FfA7FCebE546F36bcbDA', //testnet
  EPDR_ParametersVoting: '0x88899150b8BdFFE2A4D2a9A598e1Bf8fe9CA4611', //devnet
  // EPQFI_Membership: '0xE7E8828c0d7241a38c83b938a9Af59762a3C837d', /testnet
  EPQFI_Membership: '0x26FB4f212684F467A56637447bc677734814631B',   //devnet
  // EPQFI_MembershipVoting: '0xEe93d4D2684b6aF86385D466D316Ce8ea594123F',  /testnet
  EPQFI_MembershipVoting: '0xD486E3065aB05561346a0cB254B49783d1CD0a42',   //devnet
  // EPQFI_Parameters: '0xE1b04fd6238A54533938b79CfD6a0f388E4d6869', //testnet
  EPQFI_Parameters: '0xB8c7Fdc24Dd912810AC284B116FbB182e736D0BF',  //devnet
  // EPQFI_ParametersVoting: '0xFff45a02D10C703088263a24850B2cbcFCD55cfE', //testnet
  EPQFI_ParametersVoting: '0x3B8ac0643872B1E521f12c98C10E49158d1362c0',   //devnet
  // EmergencyUpdateVoting: '0x0976D446Ee5E95E81E1aD51891bc952676350209', //testnet
  EmergencyUpdateVoting: '0xDe1be0cdE7257955123da10BC1ea37Ee54875DdF', //devnet
  FxPriceFeed: '0x0000000000000000000000000000000000000000',
  // GeneralUpdateVoting: '0x3B8ac0643872B1E521f12c98C10E49158d1362c0', //testnet
  GeneralUpdateVoting: '0x3ef1A5a2aCA66e0E8Bf1ceAf085BAF1ea714f2b7', //devnet
  // LiquidationAuction: '0xFef40e2286F2240843E55fE66F06c34e7d6Ae317',  //testnet
  LiquidationAuction: '0xe018B004EA77dD71B57Df796BbD4E1705D0b9BC3',  //devnet
  QHolderRewardPool: '0xac7682a9459Fc100B2dD4efC31dF07F12EfBF2EB',
  QHolderRewardProxy: '0xb633De0400Fed3eE6ec2bc2AFd8f2A2270Eaa451',
  QPiggyBank: '0x538b6aD964C56dAEa3699a2Eee5B24AD62B912E0',
  RootNodeRewardProxy: '0x0D06cC70B4CaC70419D0068Fa93E87933408B274',
  // Root: '0xAd026d3F489368dAC09A5F9Dad506615b4Cb81c0', //testnet
  Root: '0xf1e8359C8CE05af33D53F87E07C621B110cE8FbE',    //devnet
  // RootsVoting: '0x4e6741F59ca564614D1De3f22Bb9E3E358C5990E', //testnet
  RootsVoting: '0x912885FB7c72c5a0024Aa6dBC5425F0517878732',    //devnet
  // RootNodesSlashingVoting: '0x03628E42caf21E6d437f2805D97BA48665a90524', //testnet
  RootNodesSlashingVoting: '0x4C392dFb8c44Dc813Be778eB78B58492d05af84b',    //devnet
  RootNodesSlashingEscrow: '0x536061A4A6633d5A1AF99DE29B7cE82439e1e5c0',    //devnet
  // SavingQUSD: '0x44CB5A8eE30E0Bc5b19BCf3Fa7470766f6bc6Ae8',//testnet
  SavingQUSD: '0x47923de3a07654058bf53d3F510D99f185392dF1',  //devnet
  // StableCoinQUSD: '0xd53e0F0ea25FEC308D1616e156a6fBd4af2875d4',//testnet //QUSD address wallet
  StableCoinQUSD: '0xd9EAC83C202303c32c4c8A5d468AC3Ff335b65E3', //devnet //QUSD address wallet
  // SystemBalance: '0xdC98b08363f3BfC73195dc6b532e39C51EC3c3bC', //testnet
  SystemBalance: '0x0000000000000000000000000000000000000000',    //devnet
  // SystemDebtAuction: '0xBb06FC6EA77187F8ac5E98393b74428105F706f3', //testnet
  SystemDebtAuction: '0x961CfC41F170136cBF2657517012d55Df6e9Dd45',  //devnet
  // SystemReserve: '0xDe1be0cdE7257955123da10BC1ea37Ee54875DdF', //testnet
  SystemReserve: '0x61d1CA8586E06F760AE4BB6FF0Ecd7a71D7f71bf',  //devnet
  // SystemSurplusAuction: '0x26f9D9E619f70329e4990E7Cd926c0E2AE81833d', //testnet
  SystemSurplusAuction: '0x0FD2af8cFC3E6023a7bF7b656B411d679ff2C726', //devnet
  ValidationRewardPools: '0x79f972B7e8d75733bB5C24BE57DdE47942dB7f94',
  ValidationRewardProxy: '0x9B3419124468A9cb90330Fc0585d112049Ea49DC',
  // Validators: '0x9A2e189D3c2a9Fd9a3fB99Ff9d8f52fee9FA9e37', //testnet
  Validators: '0x543760F6a2F4e0eB2e52473150736c4f197d564b',    //devnet
  WrappedQ: '0x1a6c61b097124fd1FD11745D72356a69d78A614E',
  // ValidatorsSlashingVoting: '0x4C5043A5Cd20516b86C3AA9867515B32c11c7fA8',  //testnet
  ValidatorsSlashingVoting: '0x7D6F635B66DaF406725654c71c9B29fFF74fb092',     //devnet
  ValidatorsSlashingEscrow: '0x2Bf1bFAc66B97E3611CE46E01Cc24835eE79619e',     //devnet
};

const contractsToAddressesCustom = {
  GovernedEpdrQethQusdOracle: '0x62BD936432C97cD2A2908Bf1973e3ec3a68F81B5',
  // GovernedEpdrQbtcQusdOracle: '0x3C7343037645530a65f4FeC5a6A596f9C91eAf3e', //governed.EPDR.QBTC_QUSD_oracle" //testnet
  GovernedEpdrQbtcQusdOracle: '0x62BD936432C97cD2A2908Bf1973e3ec3a68F81B5', //governed.EPDR.QBTC_QUSD_oracle" //devnet
  GovernedEpdrQethAddress: '0x62BD936432C97cD2A2908Bf1973e3ec3a68F81B5',
  // GovernedEpdrQbtcAddress: '0x6d5B4AC93A6afc3725FA16345BD9730D95E2176A', //QBTC address wallet //governed.EPDR.QBTC_address //testnet
  GovernedEpdrQbtcAddress: '0x000d90A52c884b6456Fe645F7F88FA5c20F975fC', //QBTC address wallet //governed.EPDR.QBTC_address   //devnet
  //GovernedEpdrQbtcAddress: 0x10A2298bc68e41700520F1dCb9E9E2B14E15d2E5
};

export const contractsToAddresses = {
  ...contractsToAddressesBase,
  ...contractsToAddressesDynamic,
  ...contractsToAddressesCustom,
};
