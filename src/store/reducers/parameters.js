import * as actionTypes from '../actions/action-types/parameters';

const initialState = {
  addressParameter: null,
  booleanParameter: null,
  stringParameter: null,
  bytesParameter: null,
  uintParameter: null,

  parameterValueByKey: '',
  parameterValueByKeyError: '',
  arrayParameterKeysByType: [],
};

export default function parameters(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ADDRESS_PARAMETER_SUCCESS:
      return {
        ...state,
        addressParameter: action.result,
      };
    case actionTypes.GET_BOOLEAN_PARAMETER_SUCCESS:
      return {
        ...state,
        booleanParameter: action.result,
      };
    case actionTypes.GET_STRING_PARAMETER_SUCCESS:
      return {
        ...state,
        stringParameter: action.result,
      };
    case actionTypes.GET_BYTES_PARAMETER_SUCCESS:
      return {
        ...state,
        bytesParameter: action.result,
      };
    case actionTypes.GET_UINT_PARAMETER_SUCCESS:
      return {
        ...state,
        uintParameter: action.result,
      };
    case actionTypes.GET_PARAMETER_VALUE_BY_KEY_SUCCESS:
      return {
        ...state,
        parameterValueByKey: action.result,
      };
    case actionTypes.GET_PARAMETER_VALUE_BY_KEY_ERROR:
      return {
        ...state,
        parameterValueByKeyError: action.result,
      };
    case actionTypes.GET_PARAMETER_KEYS_BY_TYPE_SUCCESS:
      return {
        ...state,
        arrayParameterKeysByType: action.result,
      };
    default:
      return state;
  }
}
