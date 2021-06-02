import * as actionTypes from 'store/actions/action-types/auctions/auctions';
import { AUCTIONS_TYPES } from 'constants/statuses';

const initialState = {
  auctionsArr: [],
  liquidationAuctions: [],
  systemDebtAuctions: [],
  systemSurplusAuctions: [],
  loadingAuctions: true,
  errorM: null,
  endedAuctionsArr: [],
  endedLoadingAuctions: true,
  endedErrorM: null,
  approveModalBtn: false,
  lastAuctionModification: 0,
};

export default function auctions(state = initialState, action) {

  switch (action.type) {
    case actionTypes.GET_AUCTIONS_LIST:
      return {
        ...state,
        loadingAuctions: true,
      };
    case actionTypes.GET_AUCTIONS_LIST_SUCCESS:
      let newState = {
        loadingAuctions: false,
        errorM: null,
      };
      switch (action.result.activeTab) {
        case AUCTIONS_TYPES.liquidation:
          newState.liquidationAuctions = action.result.result;
          break;
        case AUCTIONS_TYPES.systemDebt:
          newState.systemDebtAuctions = action.result.result;
          break;
        case AUCTIONS_TYPES.systemSurplus:
          newState.systemSurplusAuctions = action.result.result;
          break;
      }
      return {
        ...state,
        ...newState
      };
    case actionTypes.GET_AUCTIONS_LIST_ERROR:
      return {
        ...state,
        liquidationAuctions: [],
        systemDebtAuctions: [],
        systemSurplusAuctions: [],
        loadingAuctions: false,
        errorM: action.result,
      };

    case actionTypes.GET_ENDED_AUCTIONS_LIST:
      return {
        ...state,
        endedLoadingAuctions: true,
      };
    case actionTypes.GET_ENDED_AUCTIONS_LIST_SUCCESS:
      return {
        ...state,
        endedAuctionsArr: action.result,
        endedLoadingAuctions: false,
        endedErrorM: null,
      };
    case actionTypes.GET_ENDED_AUCTIONS_LIST_ERROR:
      return {
        ...state,
        endedAuctionsArr: [],
        endedLoadingAuctions: false,
        endedErrorM: action.result,
      };

    case actionTypes.GET_AUCTION_SUCCESS:
      return {
        ...state,
        auctionsArr: (() => {
          const findElem = state.auctionsArr?.find((element => {
            if (action.result[0].contract === 'LiquidationAuction') {
              return element.userVaultId === action.result[0].userVaultId && element.user === action.result[0].user;
            } else if (action.result[0].contract === 'SystemSurplusAuction' || action.result[0].contract === 'SystemDebtAuction') {
              return element.id === action.result[0].id;
            }
          }));
          if (findElem) {
            return state.auctionsArr?.map((element) => {
              if (element.userVaultId === action.result[0].userVaultId && element.user === action.result[0].user && element.contract === 'LiquidationAuction') {
                return { ...action.result[0] };
              } else if (element.id === action.result[0].id && action.result[0].contract === 'SystemSurplusAuction' ||
                element.id === action.result[0].id && action.result[0].contract === 'SystemDebtAuction'
              ) {
                return { ...action.result[0] };
              } else {
                return { ...element };
              }
            });
          } else {
            return [...state.auctionsArr, ...action.result];
          }
        })(),
        loadingAuctions: false,
        errorM: null,
      };
    case actionTypes.GET_AUCTION_ERROR:
      return {
        ...state,
        auctionsArr: [...state.auctionsArr],
        loadingAuctions: false,
      };

    case actionTypes.SET_APPROVE_MODAL_BTN:
      return {
        ...state,
        approveModalBtn: action.result,
      };
    case actionTypes.CREATE_AUCTION_SUCCESS:
      return {
        ...state,
        lastAuctionModification: +new Date()
      };
    case actionTypes.BID_FOR_AUCTION_SUCCESS:
      return {
        ...state,
        lastAuctionModification: +new Date()
      };
    case actionTypes.EXECUTE_AUCTION_SUCCESS:
      return {
        ...state,
        lastAuctionModification: +new Date()
      };
    default:
      return state;
  }
}
