import { combineReducers } from 'redux';

import accountAliases from './account-aliases/reducer';
import auctions from './auctions/reducer';
import borrowAssets from './borrow-assets/reducer';
import borrowingCore from './borrowing-core/reducer';
import membership from './membership/reducer';
import parametersAddresses from './parameters-addresses/reducer';
import qVault from './q-vault/reducer';
import rootContract from './root-node/reducer';
import savingAssets from './saving-assets/reducer';
import systemBalance from './system-balance/reducer';
import tokenomics from './tokenomics/reducer';
import transactionHandler from './transaction-handler/reducer';
import userInf from './user-inf/reducer';
import validationRewardPools from './validation-reward-pools/reducer';
import validators from './validators/reducer';
import vesting from './vesting/reducer';
import proposals from './voting/proposals/reducer';

const RootReducer = combineReducers({
  userInf,
  rootContract,
  qVault,
  vesting,
  borrowingCore,
  borrowAssets,
  savingAssets,
  accountAliases,
  tokenomics,
  proposals,
  auctions,
  transactionHandler,
  membership,
  validators,
  validationRewardPools,
  systemBalance,
  parametersAddresses,

});

export default RootReducer;
