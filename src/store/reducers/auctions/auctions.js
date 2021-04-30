import * as actionTypes from 'store/actions/action-types/auctions/auctions';

const initialState = {
  auctionsArr: [],
  loadingAuctions: true,
  errorM: null,
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
      return {
        ...state,
        auctionsArr: action.result,
        loadingAuctions: false,
        errorM: null,
      };
    case actionTypes.GET_AUCTIONS_LIST_ERROR:
      return {
        ...state,
        auctionsArr: [],
        loadingAuctions: false,
        errorM: action.result,
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
            // return element.userVaultId === action.result[0].userVaultId && element.user === action.result[0].user || element.id === action.result[0].id;
            // return element.userVaultId === action.result[0].userVaultId && element.user === action.result[0].user;
          }));
          if (findElem) {
            return state.auctionsArr?.map((element) => {
              if (element.userVaultId === action.result[0].userVaultId && element.user === action.result[0].user && element.contract === 'LiquidationAuction') {
                // if (element.userVaultId === action.result[0].userVaultId && element.user === action.result[0].user) {
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
      return{
        ...state,
        lastAuctionModification: +new Date()
      };
    default:
      return state;
  }
}
