import * as actionTypes from './action-types'

const initialState = {
  liquidationAuctions: { activeAuctions: [], endedAuctions: [] },
  systemDebtAuctions: { activeAuctions: [], endedAuctions: [] },
  systemSurplusAuctions: { activeAuctions: [], endedAuctions: [] },
  approveModalBtn: false,
  oneAuction: {}
}

export default function auctions (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_APPROVE_MODAL_BTN: {
      return {
        ...state,
        approveModalBtn: action.result
      }
    }
    case actionTypes.SET_LIQUIDATION_AUCTIONS: {
      return {
        ...state,
        liquidationAuctions: action.result
      }
    }
    case actionTypes.SET_SYSTEM_DEBT_AUCTIONS: {
      return {
        ...state,
        systemDebtAuctions: action.result
      }
    }
    case actionTypes.SET_SYSTEM_SURPLUS_AUCTIONS: {
      return {
        ...state,
        systemSurplusAuctions: action.result
      }
    }
    case actionTypes.SET_ONE_AUCTION: {
      return {
        ...state,
        oneAuction: action.auction
      }
    }
    default:
      return state
  }
}
