import { combineReducers } from 'redux'

import validators from 'store/reducers/validators'
import UserAuth from './userAuth'
import userInf from './userInf'
import rootContract from './rootContract'
import qVault from './qVault'
import vesting from './vesting'
import proposals from './voting/proposals'
import qProposals from './voting/qProposals'
import rootNodeProposals from './voting/rootNodeProposals'
import expertProposals from './voting/expertProposals'
import slashingProposals from './voting/slashingProposals'

import validationRewardPools from './validationRewardPools'
import auctions from './auctions/auctions'
import modalHandler from './auctions/modalHandler'
import stableCoin from './stableCoin'
import membership from './membership'
import parametersAddresses from './parameters-addresses'
import parameters from './parameters'
import systemBalance from './systemBalance'
import systemReserve from './systemReserve'
import theme from './theme'
import dashboardMode from './dashboardMode'
import borrowingCore from './borrowingCore'

import transactionHandler from 'store/reducers/transactionHandler'

const RootReducer = combineReducers({
  userAuth: UserAuth,
  userInf,
  rootContract,
  qVault,
  vesting,
  borrowingCore,

  proposals,
  qProposals,
  rootNodeProposals,
  expertProposals,
  slashingProposals,

  auctions,
  modalHandler,

  transactionHandler,

  membership,
  parameters,
  validators,
  validationRewardPools,
  stableCoin,
  systemBalance,
  systemReserve,

  parametersAddresses,

  theme,

  dashboardMode
})

export default RootReducer
