import { combineReducers } from 'redux';

import accountAliases from './account-aliases/reducer';
import auctions from './auctions/reducer';
import borrowAssets from './borrow-assets/reducer';
import borrowingCore from './borrowing-core/reducer';
import dashboardMode from './dashboard-mode/reducer';
import membership from './membership/reducer';
import modalHandler from './modal-handler/reducer';
import parametersAddresses from './parameters-addresses/reducer';
import qVault from './q-vault/reducer';
import rootContract from './root-node/reducer';
import savingAssets from './saving-assets/reducer';
import stableCoin from './stable-coin/reducer';
import systemBalance from './system-balance/reducer';
import systemReserve from './system-reserve/reducer';
import theme from './theme/reducer';
import tokenomics from './tokenomics/reducer';
import transactionHandler from './transaction-handler/reducer';
import userInf from './user-inf/reducer';
import validationRewardPools from './validation-reward-pools/reducer';
import validators from './validators/reducer';
import vesting from './vesting/reducer';
import contractUpdatesProposals from './voting/contract-updates/reducer';
import expertProposals from './voting/expert-proposals/reducer';
import proposals from './voting/proposals/reducer';
import qProposals from './voting/q-proposals/reducer';
import rootNodeProposals from './voting/root-node-proposals/reducer';
import slashingProposals from './voting/slashing-proposals/reducer';

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
  qProposals,
  rootNodeProposals,
  expertProposals,
  slashingProposals,
  contractUpdatesProposals,

  auctions,
  modalHandler,

  transactionHandler,

  membership,
  validators,
  validationRewardPools,
  stableCoin,
  systemBalance,
  systemReserve,

  parametersAddresses,

  theme,

  dashboardMode
});

export default RootReducer;
