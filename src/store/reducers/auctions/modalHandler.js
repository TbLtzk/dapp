import * as actionTypes from 'store/actions/action-types/auctions/modalHandler'

const initialState = {
  formObjectCreate: {},
  createdStepsLimit: 4,
  stepCounter: 1,
  disabledContinueBtn: true
}

export default function modalHandler (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CREATED_OBJECT:
      return {
        ...state,
        formObjectCreate: action.result
      }
    case actionTypes.SET_CREATED_STEPS_LIMIT:
      return {
        ...state,
        createdStepsLimit: action.result
      }
    case actionTypes.SET_STEP_COUNTER:
      return {
        ...state,
        stepCounter: action.result
      }
    case actionTypes.SET_DISABLED_CREATED_OBJ_BTN:
      return {
        ...state,
        disabledContinueBtn: action.result
      }
    default:
      return state
  }
}
